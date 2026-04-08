import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa"; 

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
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/admin/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Loading Users...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-8 text-slate-800">User Management</h1>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-6 text-xs font-bold uppercase text-slate-400">User</th>
              <th className="p-6 text-xs font-bold uppercase text-slate-400">Current Role</th>
              <th className="p-6 text-xs font-bold uppercase text-slate-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b last:border-0 hover:bg-slate-50 transition">
                <td className="p-6">
                  <p className="font-bold text-slate-700">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                    user.role === 'tutor' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-6 flex items-center justify-center gap-4">
                  {/* Role Change Dropdown */}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-slate-100 border-none rounded-lg text-sm font-bold p-2 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                    title="Delete User"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}