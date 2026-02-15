import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "./AuthProvider";
import { auth } from "../api/firebase";

export default function Navbar() {
  const navigate = useNavigate();
  const [notifCount, setNotifCount] = useState(0);

  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();

      localStorage.removeItem("token");

      navigate("/login");

      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-white italic">
            e
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            eTuitionBd
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {[
            { name: "Home", path: "/" },
            { name: "Tuitions", path: "/tuitions" },
            { name: "Tutors", path: "/tutors" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-brand-primary border-b-2 border-brand-primary pb-1"
                  : "text-slate-600 hover:text-brand-primary"
              }
            >
              {item.name}
            </NavLink>
          ))}

          {user?.role === "student" && (
            <NavLink
              to="/post-tuition"
              className="bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-600"
            >
              Post a Tuition
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <Link
              to={
                user.role === "admin"
                  ? "/admin/tuitions"
                  : user.role === "student"
                    ? "/student-dashboard"
                    : "/tutor-dashboard"
              }
              className="relative font-bold text-slate-700 hover:text-brand-primary transition-colors text-sm"
            >
              Dashboard
              
            </Link>
          )}

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm font-bold text-slate-700">
                  Hi, {user?.name?.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-brand-primary text-white px-6 py-2 rounded-xl text-sm font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
