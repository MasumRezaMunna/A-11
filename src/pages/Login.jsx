import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const { data } = await api.post('/auth/login-sync', {}, {
      headers: { Authorization: `Bearer ${idToken}` }
    });

    const authData = {
      ...data.user,
      token: idToken
    };

    localStorage.setItem('user', JSON.stringify(authData));

    toast.success("Welcome back!");

    navigate('/');
    setTimeout(() => {
        window.location.reload();
    }, 100);

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-brand-secondary mb-2">Login</h2>
          <p className="text-slate-500 font-medium">Access your eTuitionBd account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-primary outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-primary outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-primary font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}