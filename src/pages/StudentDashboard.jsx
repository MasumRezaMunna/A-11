import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function StudentDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyApps = async () => {
      try {
        const { data } = await api.get("/tuitions/my-applications");
        setApps(data.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyApps();
  }, []);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await api.patch(`/tuitions/applications/${appId}/status`, {
        status: newStatus,
      });

      setApps(
        apps.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app,
        ),
      );

      alert(`Application ${newStatus}!`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-8 text-slate-900">
        Student Dashboard
      </h1>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs">
                Tutor Name
              </th>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs">
                Tuition Job
              </th>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs">
                Date
              </th>
              <th className="p-6 font-bold text-slate-400 uppercase text-xs text-center">
                Status / Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr
                key={app._id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-6">
                  <p className="font-bold text-slate-900">{app.tutor?.name}</p>
                  <p className="text-sm text-slate-500">{app.tutor?.email}</p>
                </td>
                <td className="p-6 font-medium text-slate-700">
                  {app.tuition?.title}
                  <span className="block text-xs text-slate-400">
                    {app.tuition?.subject}
                  </span>
                </td>
                <td className="p-6 text-sm text-slate-500">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>

                {/* STATUS & ACTION COLUMN */}
                <td className="p-6">
                  {app.status === "pending" ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleStatusUpdate(app._id, "accepted")}
                        className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {apps.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            <p className="text-lg">No applications received yet.</p>
            <p className="text-sm">
              Your tuition posts will appear here once tutors start applying.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}