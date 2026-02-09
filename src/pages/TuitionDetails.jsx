import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from 'react-toastify';

export default function TuitionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    qualifications: "",
    experience: "",
    expectedSalary: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/tuitions/${id}`);
        console.log("Tuition Data:", response.data);
        const actualTuition = response.data.data;

        setTuition(response.data.data.tuition);
      } catch (err) {
        console.error("Error fetching tuition details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/tuitions/${id}/apply`, formData);
      toast(
        "Application sent successfully! The student will contact you if interested.",
      );
      setShowModal(false);
      navigate("/tuitions");
    } catch (err) {
      toast(
        err.response?.data?.message ||
          "Failed to apply. Check if you are logged in as a Tutor.",
      );
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-bold animate-pulse">
        Loading tuition details...
      </div>
    );
  if (!tuition)
    return (
      <div className="p-20 text-center text-red-500 font-bold">
        Tuition post not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-slate-500 hover:text-brand-primary flex items-center gap-2 transition-colors font-semibold"
      >
        ← Back to Board
      </button>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-900 p-10 text-white">
          <span className="bg-brand-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Class {tuition.class}
          </span>
          <h1 className="text-4xl font-black mt-4 mb-2 tracking-tight">
            {tuition?.title}
          </h1>
          <p className="text-slate-400 font-medium">
            Posted by{" "}
            <span className="text-slate-200">
              {tuition.student?.name || "a Student"}
            </span>
          </p>
        </div>

        <div className="p-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-sm font-black mb-3 text-slate-400 uppercase tracking-widest">
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                {tuition?.description}
              </p>
            </section>

            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[2rem]">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Subject
                </p>
                <p className="font-bold text-slate-900 text-lg">
                  {tuition?.subject}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Location
                </p>
                <p className="font-bold text-slate-900 text-lg">
                  {tuition?.location}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-2 border-slate-50 rounded-[2rem] p-8 text-center shadow-sm">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">
                Monthly Salary
              </p>
              <p className="text-5xl font-black text-slate-900 mb-2">
                ৳{tuition.salary}
              </p>
              <p className="text-slate-500 text-sm font-medium mb-8">
                {tuition.daysPerWeek} days per week
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
              >
                Apply for this Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <h3 className="font-black text-2xl text-slate-900 mb-2">
              Apply to Teach
            </h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Share your details with the student.
            </p>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">
                  Your Qualifications
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BSc in Physics, Dhaka University"
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary"
                  value={formData.qualifications}
                  onChange={(e) =>
                    setFormData({ ...formData, qualifications: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">
                  Expected Salary (৳)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter amount"
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary"
                  value={formData.expectedSalary}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedSalary: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 text-slate-400 font-bold text-sm uppercase hover:text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
