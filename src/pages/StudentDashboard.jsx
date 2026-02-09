import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { auth } from "../api/firebase";

export default function StudentDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const res = await api.get("/tuitions/my-applications", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setApps(res.data.data || []);
        } catch (err) {
          console.error("Dashboard error:", err);
          toast.error("Failed to fetch applications");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      await api.patch(
        `/tuitions/applications/${appId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApps((prevApps) =>
        prevApps.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );

      toast.success(`Application ${newStatus}!`);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-bold text-slate-400">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Student Dashboard
        </h1>
        <span className="bg-slate-100 text-slate-600 px-4 py-1 rounded-full text-sm font-bold">
          {apps.length} Total Applications
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 font-bold text-slate-400 uppercase text-xs tracking-widest">
                  Tutor Information
                </th>
                <th className="p-6 font-bold text-slate-400 uppercase text-xs tracking-widest">
                  Tuition Details
                </th>
                <th className="p-6 font-bold text-slate-400 uppercase text-xs tracking-widest">
                  Applied Date
                </th>
                <th className="p-6 font-bold text-slate-400 uppercase text-xs tracking-widest text-center">
                  Decision
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {apps.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-slate-900">
                      {app.tutor?.name || "Anonymous Tutor"}
                    </p>
                    <p className="text-sm text-slate-500">{app.tutor?.email}</p>
                  </td>
                  <td className="p-6">
                    <p className="font-semibold text-slate-700">
                      {app.tuition?.title || "Untitled Job"}
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      {app.tuition?.subject}
                    </p>
                  </td>
                  <td className="p-6 text-sm text-slate-500">
                    {app.appliedAt || app.createdAt
                      ? new Date(app.appliedAt || app.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : "Recently"}
                  </td>
                  <td className="p-6 text-center">
                    {app.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleStatusUpdate(app._id, "accepted")}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-100"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, "rejected")}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-100"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          app.status === "accepted"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {apps.length === 0 && (
          <div className="p-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-xl font-bold text-slate-900">No applications yet</p>
            <p className="text-slate-400 mt-2 max-w-xs mx-auto">
              When tutors apply to your tuition posts, they will appear here for your review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}