"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("https://devrecruit-ai.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Upload Resume</h1>

      <div className="mt-6 border border-white/10 rounded-xl p-6 bg-white/5">
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          className="block mb-4"
        />
        <button
          onClick={handleUpload}
          className="px-5 py-2 bg-white text-black rounded-lg font-medium"
        >
          Upload
        </button>
      </div>
    </div>
  );
}