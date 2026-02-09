import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' 
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      formData.email, 
      formData.password
    );
    const firebaseUser = userCredential.user;

    const { data } = await api.post('/auth/register', {
      ...formData,
      firebaseUid: firebaseUser.uid 
    });

    localStorage.setItem('token', data.token);
    toast("Firebase & MongoDB Sync Successful!");
    navigate('/');
  } catch (err) {
    toast(err.message);
  }
};

  return (
    <div className="min-h-[calc(100-64px)] flex items-center justify-center p-6 bg-slate-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-8">Join eTuitionBd as a student or tutor</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            {['student', 'tutor'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData({ ...formData, role: r })}
                className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-all ${
                  formData.role === r ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              placeholder="Enter your name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              placeholder="name@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}