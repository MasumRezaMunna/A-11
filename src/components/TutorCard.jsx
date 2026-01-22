export default function TutorCard({ tutor }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center group">
      <div className="size-20 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-1">{tutor.name}</h3>
      <p className="text-sm text-slate-500 font-medium mb-3">{tutor.education || 'Expert Educator'}</p>
      
      <div className="flex items-center gap-1 text-yellow-500 mb-6">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        ))}
        <span className="text-slate-700 text-xs font-bold ml-1">{tutor.rating || '5.0'}</span>
      </div>

      <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
        View Profile
      </button>
    </div>
  );
}