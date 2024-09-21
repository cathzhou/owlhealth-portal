import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';


export function RecordsPage(): JSX.Element {
  const PdfPortal = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadLink, setDownloadLink] = useState('');

    const handleFileChange = (event: { target: { files: React.SetStateAction<null>[]; }; }) => {
      setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
      if (!file) {
        alert('Please select a PDF file.');
        return;
      }

      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`pdfs/${file.name}`);

      const uploadTask = fileRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot: { bytesTransferred: number; totalBytes: number; }) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error: any) => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url: React.SetStateAction<string>) => {
            setDownloadLink(url);
          });
        }
      );
    };

    const handleDownload = () => {
      if (!downloadLink) {
        alert('Please upload a PDF first.');
        return;
      }


      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = 'downloaded_pdf.pdf';
      link.click();
    };

    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload PDF</button>
        <button onClick={handleDownload}>Download PDF</button>
        <p>Upload progress: {progress}%</p>
        {downloadLink && <p>Download link: <a href={downloadLink}>Download</a></p>}
      </div>
    );
  };

}

