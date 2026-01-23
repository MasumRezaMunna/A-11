import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-white italic">e</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">eTuitionBd</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {['Home', 'Tuitions', 'Tutors', 'About', 'Contact'].map((item) => (
            <a key={item} href="#" className="hover:text-brand-primary transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-bold text-slate-700">Hi, {user.name.split(' ')[0]}</span>
              <button 
                onClick={handleLogout}
                className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-brand-primary transition">Login</Link>
              <Link to="/register" className="bg-brand-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}