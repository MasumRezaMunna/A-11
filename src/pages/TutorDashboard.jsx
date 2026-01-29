import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../api/firebase';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function TutorDashboard() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'tutor') {
      navigate('/');
    }
    const fetchRequests = async () => {
      try {
        const { data } = await api.get('/hire/my-requests');
        setRequests(data.data.requests);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user, navigate]);

  if (loading) return <div className="p-20 text-center font-bold">Loading requests...</div>;

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
      <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-black mb-8">Hire Requests</h1>
      
      {requests.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-dashed text-center text-slate-400">
          No students have reached out yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{req.student?.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{req.student?.email}</p>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg italic">"{req.message}"</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block mb-2">
                  {new Date(req.createdAt).toLocaleDateString()}
                </span>
                <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold">
                  Contact Student
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}