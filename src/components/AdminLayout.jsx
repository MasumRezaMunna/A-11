import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, LogOut } from "lucide-react"; 

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/admin/overview", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Tuitions", path: "/admin/tuitions", icon: <BookOpen size={20} /> },
    { name: "Manage Users", path: "/admin/users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter text-brand-primary">
            Admin<span className="text-white">Panel</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                location.pathname === item.path
                  ? "bg-brand-primary text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 font-bold text-sm hover:text-white">
            <LogOut size={20} />
            Back to Site
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <Outlet /> 
      </main>
    </div>
  );
}