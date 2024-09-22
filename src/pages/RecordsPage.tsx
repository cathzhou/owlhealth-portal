import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage } from '../firebase.config';

export function RecordsPage(): JSX.Element {

  const UploadPdf: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [downloadUrl, setDownloadUrl] = useState<string>("");

    // Handle file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setPdfFile(e.target.files[0]);
      }
    };

    // Handle PDF upload
    const handleUpload = () => {
      if (!pdfFile) {
        alert("Please select a file first!");
        return;
      }

      const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pdfFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          // Handle errors
          console.error("Upload failed:", error);
          alert("Upload failed!");
        },
        () => {
          // Get the download URL once upload completes
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadUrl(url);
            alert("Upload successful!");
          });
        }
      );
    };

    return (
      <div>
        <h2>Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload PDF</button>

        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}

        {downloadUrl && (
          <div>
            <p>PDF Uploaded successfully. Download it here:</p>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              {downloadUrl}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Health Records</h1>
      <UploadPdf />
    </div>
  );
}

export default RecordsPage;
