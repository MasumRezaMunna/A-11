export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">e</div>
          <span className="text-2xl font-black tracking-tight">eTuitionBd</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
          The most trusted platform for finding quality home and online tutors in Bangladesh. 
          Connecting bright minds since 2024.
        </p>
        
<div className="flex gap-4">
  <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>

  <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z"/>
    </svg>
  </a>

  <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 hover:text-white hover:border-transparent transition-all duration-300">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
    </svg>
  </a>
</div>
      </div>

      <div>
        <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-[0.2em]">Quick Access</h4>
        <ul className="space-y-4 text-slate-400 text-sm font-medium">
          <li><a href="/tuitions" className="hover:text-blue-500 transition-colors">Find a Tuition</a></li>
          <li><a href="/tutors" className="hover:text-blue-500 transition-colors">Our Tutors</a></li>
          <li><a href="/about" className="hover:text-blue-500 transition-colors">How it Works</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-[0.2em]">Resources</h4>
        <ul className="space-y-4 text-slate-400 text-sm font-medium">
          <li><a href="/faq" className="hover:text-blue-500 transition-colors">Safety Center</a></li>
          <li><a href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
          <li><a href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-[0.2em]">Get in Touch</h4>
        <div className="space-y-4 text-slate-400 text-sm">
          <p className="flex items-center gap-3">
            <span className="text-blue-500">📧</span> hello@etuitionbd.com
          </p>
          <p className="flex items-center gap-3">
            <span className="text-blue-500">📱</span> +880 1763 474359
          </p>
          <p className="flex items-start gap-3">
            <span className="text-blue-500 font-bold leading-none mt-1">📍</span> 
            <span>House-12, Road-5, Block-A<br/>Mirpur DOHS, Dhaka</span>
          </p>
        </div>
      </div>
    </div>

    <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
        © 2026 eTuitionBd. Crafted with precision in Bangladesh.
      </p>
      
      <div className="flex gap-6 text-[10px] font-black text-slate-600 uppercase tracking-tighter">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          All Systems Nominal
        </span>
        <span className="hover:text-slate-400 cursor-default">SSL SECURED</span>
      </div>
    </div>
  </div>
</footer>
  );
}