import React, { useEffect, useState } from "react";
import api from "../api/axios"; 
import { toast } from "react-toastify";

export default function AdminTuitionManagement() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTuitions = async () => {
      try {
        const { data } = await api.get("/tuitions");
        setTuitions(data.data || []);
      } catch (err) {
        toast.error("Error fetching tuitions");
      } finally {
        setLoading(false);
      }
    };
    fetchAllTuitions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/admin/update-status/${id}`, { status: newStatus });
      if (res.data.status === "success") {
        setTuitions(tuitions.map((t) => (t._id === id ? { ...t, status: newStatus } : t)));
        toast.success(`Post ${newStatus} successfully!`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Posts...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-8">Manage Tuitions</h1>
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-5 text-sm font-bold text-slate-400 uppercase">Title & Subject</th>
              <th className="p-5 text-sm font-bold text-slate-400 uppercase">Status</th>
              <th className="p-5 text-sm font-bold text-slate-400 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((post) => (
              <tr key={post._id} className="border-b hover:bg-slate-50 transition">
                <td className="p-5">
                  <p className="font-bold text-slate-800">{post.title}</p>
                  <p className="text-xs text-slate-500">{post.subject}</p>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    post.status === "approved" ? "bg-green-100 text-green-600" :
                    post.status === "rejected" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {post.status || "pending"}
                  </span>
                </td>
                <td className="p-5 flex justify-center gap-2">
                  {post.status !== "approved" && (
                    <button
                      onClick={() => handleStatusChange(post._id, "approved")}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition"
                    >
                      Approve
                    </button>
                  )}
                  {post.status !== "rejected" && (
                    <button
                      onClick={() => handleStatusChange(post._id, "rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition"
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