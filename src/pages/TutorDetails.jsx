import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function TutorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      if (!id || id === ":id") return;
      try {
        setLoading(true);
        const res = await api.get(`/users/${id}`);

        const tutorData = res.data.data?.tutor;

        if (tutorData) {
          setTutor(tutorData);
        } else {
          console.error("Tutor object not found in response data");
          setTutor(null);
        }
      } catch (err) {
        console.error("Error fetching tutor:", err);
        setTutor(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!tutor)
    return (
      <div className="text-center py-20 text-slate-500 font-bold">
        Tutor profile not found.
      </div>
    );

  const handleHire = async () => {
    if (!tutor || !tutor._id) {
      return toast.error("Tutor details not loaded yet.");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.token) return toast.error("Please login first");
      if (user.role !== "student")
        return toast.warning("Only students can hire tutors!");

      
    } catch (err) {
      Swal.close();
      toast.error(err.response?.data?.message || "Internal System Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-900 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Board
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:w-1/3 bg-slate-950 p-10 text-center text-white flex flex-col items-center"
          >
            <img
              src={
                tutor?.profileImage === "default-avatar.png"
                  ? "https://via.placeholder.com/300"
                  : tutor?.profileImage
              }
              className="w-48 h-48 rounded-[2.5rem] object-cover mb-6 border-4 border-slate-900 shadow-2xl"
              alt={tutor?.name || "Tutor"}
            />
            <h2 className="text-3xl font-black mb-2 capitalize">
              {tutor?.name || "Academic Tutor"}
            </h2>
            <p className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-6">
              {tutor?.isVerified ? "Verified Expert" : "Pending Verification"}
            </p>

            <div className="w-full space-y-5 text-left border-t border-slate-900 pt-8"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-2/3 p-12"
          >
            <div className="mb-12">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Expertise & Subjects
              </h3>
              <div className="flex flex-wrap gap-3">
                {tutor?.subjects && tutor.subjects.length > 0 ? (
                  tutor.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="bg-slate-100 text-slate-900 px-5 py-2 rounded-2xl font-bold text-sm"
                    >
                      {sub}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic text-sm">
                    No specific subjects listed yet.
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                  Monthly Salary
                </p>
                <p className="text-3xl font-black text-slate-950">
                  ৳ {tutor?.salary || "Negotiable"}
                </p>
              </div>
              <button
                onClick={handleHire}
                className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                Hire {tutor?.name?.split(" ")[0] || "Tutor"} Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
