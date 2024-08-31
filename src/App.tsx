import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
const Socket = io("http://localhost:9000");
Socket.on("connection", () => {
  console.log("Connected");
});
function App() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    console.log({ file });
    if (file instanceof File) {
      formData.append("file", file);
      Socket.on("uploadProgress", (data) => {
        console.log("Upload progress", { data });
        setProgress(data.percent);
      });

      try {
        const response = await fetch("http://localhost:9000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };
  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>Upload Progress: {progress}%</p>
    </div>
  );
}

export default App;
