import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ImageUpload = ({ setUser, user }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "language"); // Replace with your preset name

    const res = await fetch("https://api.cloudinary.com/v1_1/duyggs6hr/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setImageUrl(result.secure_url);
    setUploading(true);

    // Update photoURL in Firebase Auth profile
    const auth = getAuth();
    await updateProfile(auth.currentUser, { photoURL: result.secure_url });

    // Save photoURL to Firestore (under "users" collection)
    await setDoc(
      doc(db, "users", user.uid),
      { photoURL: result.secure_url },
      { merge: true }
    );

    // Force reload to update local photoURL
    await auth.currentUser.reload();
    setUser(auth.currentUser);
    setUploading(false);
    alert("✅ Image uploaded successfully!");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <input type="file" onChange={handleImageChange} />
      {preview && (
        <>
          <img src={preview} alt="preview" width="200" style={{ marginTop: 10 }} />
          <br />
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
      {imageUrl && (
        <div>
          <p>✅ Uploaded Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
