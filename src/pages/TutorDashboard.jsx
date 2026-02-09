import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import api from "../api/axios";

export default function TutorDashboard() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [requests, setRequests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "tutor") {
      navigate("/");
      return;
    }

    const fetchAllData = async () => {
      try {
        const resRequests = await api.get("/hire/my-requests");
        setRequests(resRequests.data.data.requests || []);

        const resApps = await api.get("/tuitions/my-sent-applications");
        setApplications(resApps.data.data || []);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        toast.error("Failed to sync dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("Please upload a valid image file");
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return toast.info("Please select an image first");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", image);

      Swal.fire({
        title: "Updating Profile...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await api.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = { ...user, profileImage: res.data.url };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Swal.fire({
        icon: 'success',
        title: 'Uploaded!',
        timer: 1500,
        showConfirmButton: false
      });
      
    } catch (err) {
      toast.error("Cloud upload failed. Try a smaller file.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-12 px-6 space-y-12"
    >
      {/* Profile Card */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-50">
        <h2 className="text-3xl font-black mb-8 tracking-tight">Tutor Dashboard</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          {/* Image Container */}
          <div className="relative group">
            <div className="size-40 rounded-3xl bg-white overflow-hidden border-4 border-white shadow-xl">
              {preview || user.profileImage ? (
                <img src={preview || user.profileImage} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-black text-xs p-4 text-center">
                  NO PHOTO
                </div>
              )}
            </div>
            <label htmlFor="fileInput" className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-2xl cursor-pointer shadow-lg hover:bg-blue-700 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2"/>
                <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/>
              </svg>
            </label>
          </div>

          {/* Action Container - FIXED DIV CLOSING HERE */}
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-black text-slate-900">Profile Identity</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ensure your photo is professional to increase hire rate by up to 40%.
            </p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
            <button
              onClick={handleUpload}
              disabled={uploading || !image}
              className="w-full bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 disabled:opacity-30 transition-all shadow-lg shadow-slate-200"
            >
              {uploading ? "Processing..." : "Sync Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <section>
        <h1 className="text-2xl font-black mb-6 flex items-center gap-3">
          <span className="p-2 bg-amber-100 rounded-lg text-lg">📋</span> Job Applications
        </h1>
        {applications.length > 0 ? (
           <div className="grid gap-4">
             {applications.map(app => (
               <div key={app._id} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
                 <div>
                   <h3 className="font-bold text-slate-900">{app.tuition?.title || "Untitled Tuition"}</h3>
                   <p className="text-xs text-slate-500">{app.tuition?.subject} • {app.status}</p>
                 </div>
               </div>
             ))}
           </div>
        ) : (
          <div className="bg-white p-10 rounded-[2rem] border border-dashed text-center text-slate-400">No applications yet.</div>
        )}
      </section>

      {/* Requests Section */}
      <section>
        <h1 className="text-2xl font-black mb-6 flex items-center gap-3">
          <span className="p-2 bg-blue-100 rounded-lg text-lg">📩</span> Direct Requests
        </h1>
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req._id} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-900">{req.student?.name}</h3>
                  <p className="text-xs text-slate-500 italic">"{req.message}"</p>
                </div>
                <button 
                  onClick={() => Swal.fire({title: `Contact ${req.student?.name}`, text: `Email: ${req.student?.email}`, icon: 'info'})}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-[2rem] border border-dashed text-center text-slate-400">No direct requests yet.</div>
        )}
      </section>
    </motion.div>
  );
}