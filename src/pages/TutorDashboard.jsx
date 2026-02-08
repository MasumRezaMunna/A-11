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
  const [applications, setApplications] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'tutor') {
      navigate('/');
      return;
    }

    const fetchAllData = async () => {
      try {
        const resRequests = await api.get('/hire/my-requests');
        setRequests(resRequests.data.data.requests);

        const resApps = await api.get('/tuitions/my-sent-applications');
        setApplications(resApps.data.data || []);

      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post("/users/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Profile picture updated!");
  } catch (err) {
    console.error(err);
    alert("Upload failed. Check if the file is too large.");
  }
};

  if (loading) return <div className="p-20 text-center font-bold">Loading dashboard...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black mb-6">Tutor Dashboard</h2>
        <div className="flex flex-col items-center gap-6 p-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="size-32 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs text-center p-2">No Profile Image</div>
            )}
          </div>
          <div className="text-center">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="cursor-pointer bg-white px-6 py-2 rounded-xl border border-slate-300 font-bold hover:bg-slate-100 transition shadow-sm inline-block">
              Choose Photo
            </label>
          </div>
          <button onClick={handleUpload} disabled={uploading || !image} className="bg-brand-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-all">
            {uploading ? "Uploading..." : "Save Profile Image"}
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-black mb-6 flex items-center gap-2">
          📋 Job Board Status
        </h1>
        {applications.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-dashed text-center text-slate-400">
            You haven't applied to any tuitions from the board.
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-900">{app.tuition?.title}</h3>
                  <p className="text-sm text-slate-500">{app.tuition?.subject} • ৳{app.tuition?.salary}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-black mb-6 flex items-center gap-2">
          📩 Direct Hire Requests
        </h1>
        {requests.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-dashed text-center text-slate-400">
            No students have reached out directly yet.
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-900">{req.student?.name}</h3>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg italic text-sm mt-2">"{req.message}"</p>
                </div>
                <div className="text-right ml-4">
                  <span className="text-[10px] font-bold text-slate-400 block mb-2 uppercase">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap">
                    Reply
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