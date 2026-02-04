import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users/admin/all-users");
        setUsers(data.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`/users/admin/update-role/${userId}`, { role: newRole });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      alert("Role updated!");
    } catch (err) {
      alert("Failed to update role");
    }
  };

  if (loading) return <div className="p-20 text-center">Loading Users...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-8">User Management</h1>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-6 text-xs font-bold uppercase text-slate-400">User</th>
              <th className="p-6 text-xs font-bold uppercase text-slate-400">Current Role</th>
              <th className="p-6 text-xs font-bold uppercase text-slate-400">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-6">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>
                <td className="p-6">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-slate-100 border-none rounded-lg text-sm font-bold p-2 focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}