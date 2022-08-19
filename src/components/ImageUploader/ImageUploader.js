import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import "./ImageUploader.css";

function ImageUploader() {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {};

  return (
    <div className="imageUpload">
      <progress className="imageUpload_Progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="enter a caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type="file" />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUploader;
