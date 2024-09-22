import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage } from '../firebase.config';
import './RecordsPage.css';

interface FileItem {
  name: string;
  date: string;
  url: string;
  category: string;
}

export function RecordsPage(): JSX.Element {
  const [previousFiles, setPreviousFiles] = useState<FileItem[]>([
    { name: "Blood_Test_Results_2023.pdf", date: "2023-05-15", url: "https://sterlingaccuris.com/static-assets/pdfs/sterling-accuris-pathology-sample-report-unlocked.pdf", category: "Dr. Trotter" },
    { name: "Vaccination_Record.pdf", date: "2023-02-10", url: "https://www.health.ny.gov/prevention/immunization/schools/docs/recordable_vaccines.pdf", category: "Dr. Trotter" },
    { name: "Annual_Checkup_Report.pdf", date: "2023-01-22", url: "https://med.fsu.edu/sites/default/files/userFiles/file/MedInfo_SOAPnote_Jobaid.pdf", category: "Dr. Trotter" },
  ]);

  const UploadPdf: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [downloadUrl, setDownloadUrl] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setPdfFile(e.target.files[0]);
      }
    };

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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          alert("Upload failed!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadUrl(url);
            alert("Upload successful!");
            // Add the newly uploaded file to the list of previous files
            setPreviousFiles(prevFiles => [
              { name: pdfFile.name, date: new Date().toISOString().split('T')[0], url, category: "Self-uploaded" },
              ...prevFiles
            ]);
          });
        }
      );
    };

    return (
      <div className="access-pdfs">
        <h2>Access PDFs</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload PDF</button>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{width: `${uploadProgress}%`}}
            ></div>
          </div>
        )}

        {downloadUrl && (
          <div>
            <p>PDF Uploaded successfully. Download it here:</p>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="records-container">
      <h1>Health Records</h1>
      <UploadPdf />
      <h3>Previously Uploaded Files</h3>
      <ul className="file-list">
        {previousFiles.map((file, index) => (
          <li key={index} className="file-item">
            <span className="file-name">{file.name}</span>
            <span className="file-date">{file.date}</span>
            <span className="file-category">{file.category}</span>
            <div className="file-actions">
              <a href="#" onClick={(e) => e.preventDefault()}>View</a>
              <a href={file.url} target="_blank" rel="noopener noreferrer">Download</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecordsPage;