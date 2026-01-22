export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
             <span className="text-white font-bold text-xl italic">e</span>
          </div>
          <span className="text-xl font-bold text-brand-secondary tracking-tight">eTuitionBd</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {['Home', 'Tuitions', 'Tutors', 'About', 'Contact'].map((item) => (
            <a key={item} href="#" className="hover:text-brand-primary transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-bold text-slate-700 hover:text-brand-primary transition">Login</button>
          <button className="bg-brand-secondary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}