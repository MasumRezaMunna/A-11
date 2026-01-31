import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function TuitionDetails() {
  const { id } = useParams();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/tuitions/${id}`);
        setTuition(data.data.tuition);
      } catch (err) {
        console.error("Error fetching tuition details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post(`/tuitions/${id}/apply`);
      alert("Application sent successfully! The student will contact you if interested.");
      navigate('/tuitions');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply. Are you logged in as a tutor?");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading details...</div>;
  if (!tuition) return <div className="p-20 text-center">Tuition post not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="mb-6 text-slate-500 hover:text-brand-primary flex items-center gap-2">
        ← Back to Board
      </button>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-10 text-white">
          <span className="bg-brand-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            Class {tuition.class}
          </span>
          <h1 className="text-4xl font-black mt-4 mb-2">{tuition.title}</h1>
          <p className="text-slate-400">Posted by {tuition.student?.name || "a Student"}</p>
        </div>

        <div className="p-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Description</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{tuition.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Subject</p>
                <p className="font-bold text-slate-900">{tuition.subject}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                <p className="font-bold text-slate-900">{tuition.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-slate-100 rounded-3xl p-6 text-center">
              <p className="text-sm text-slate-400 font-bold uppercase">Monthly Salary</p>
              <p className="text-4xl font-black text-slate-900">৳{tuition.salary}</p>
              <p className="text-slate-500 text-sm mt-1">{tuition.daysPerWeek} days per week</p>
              
              <button 
                onClick={handleApply}
                className="w-full mt-6 bg-brand-primary text-white py-4 rounded-2xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-200 transition-all"
              >
                Apply for this Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}