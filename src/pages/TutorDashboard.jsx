import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../api/firebase';
import api from '../api/axios';

export default function TutorDashboard() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first");
    
    setUploading(true);
    try {
      
      const storageRef = ref(storage, `tutors/${user.id}/${image.name}`);

      const snapshot = await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(snapshot.ref);

      await api.patch('/users/update-me', { profileImage: downloadURL });

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black mb-6">Tutor Dashboard</h2>
        
        <div className="flex flex-col items-center gap-6 p-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="size-32 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">No Image</div>
            )}
          </div>

          <div className="text-center">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              id="fileInput" 
            />
            <label 
              htmlFor="fileInput" 
              className="cursor-pointer bg-white px-6 py-2 rounded-xl border border-slate-300 font-bold hover:bg-slate-100 transition shadow-sm inline-block"
            >
              Choose Photo
            </label>
            <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max 2MB.</p>
          </div>

          <button 
            onClick={handleUpload}
            disabled={uploading || !image}
            className="bg-brand-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {uploading ? "Uploading..." : "Save Profile Image"}
          </button>
        </div>
      </div>
    </div>
  );
}