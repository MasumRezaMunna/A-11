import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminTuitionManagement() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTuitions = async () => {
      try {
        const { data } = await api.get("/tuitions/admin/all-tuitions");
        setTuitions(data.data || []);
      } catch (err) {
        console.error("Error fetching admin tuitions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTuitions();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.patch(`/tuitions/${id}/status`, { status: newStatus });
      
      setTuitions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
      alert(`Tuition post ${newStatus}!`);
    } catch (err) {
      alert("Failed to update tuition status");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Admin Panel...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Tuition Management</h1>
          <p className="text-slate-500">Review, Approve, or Reject tuition requests.</p>
        </div>
        <div className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl font-bold text-sm">
          Total Posts: {tuitions.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs">Student</th>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs">Tuition Details</th>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs text-center">Current Status</th>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tuitions.map((t) => (
              <tr key={t._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-slate-900">{t.student?.name}</p>
                  <p className="text-sm text-slate-500">{t.student?.email}</p>
                </td>
                <td className="p-6">
                  <p className="font-bold text-slate-700">{t.title}</p>
                  <p className="text-xs text-slate-400">{t.subject} • ৳{t.salary}</p>
                </td>
                <td className="p-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    t.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    t.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-6 text-right space-x-2">
                  {t.status !== 'approved' && (
                    <button 
                      onClick={() => handleStatusUpdate(t._id, 'approved')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                  )}
                  {t.status !== 'rejected' && (
                    <button 
                      onClick={() => handleStatusUpdate(t._id, 'rejected')}
                      className="bg-white border border-red-200 text-red-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}