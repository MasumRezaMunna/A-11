export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-8 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-white italic">e</div>
            <span className="text-xl font-bold text-white tracking-tight">eTuitionBd</span>
          </div>
          <p className="text-sm leading-relaxed">
            The largest platform for finding qualified home tutors in Bangladesh.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">For Students</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-brand-primary transition">Find a Tutor</a></li>
            <li><a href="#" className="hover:text-brand-primary transition">Post a Tuition</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">For Tutors</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-brand-primary transition">Browse Jobs</a></li>
            <li><a href="#" className="hover:text-brand-primary transition">Tutor Registration</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <p className="text-sm">Email: support@etuitionbd.com</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-800 text-center text-xs">
        © 2026 eTuitionBd. All rights reserved.
      </div>
    </footer>
  );
}