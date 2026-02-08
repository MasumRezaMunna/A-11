import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function TutorCard({ tutor }) {
  const firstName = tutor?.name ? tutor.name.split(' ')[0] : 'Tutor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center group relative overflow-hidden">
      
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-50 rounded-full transition-transform group-hover:scale-[3] duration-700 -z-10 opacity-50" />

      <div className="size-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
        {tutor?.profileImage && tutor.profileImage !== "default-avatar.png" ? (
          <img 
            src={tutor.profileImage} 
            alt={tutor.name} 
            className="size-full rounded-full object-cover border-2 border-white"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        )}
      </div>

      <h3 className="text-xl font-black text-slate-900 mb-1 capitalize">{tutor?.name || 'Academic Tutor'}</h3>
      <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-4">
        {tutor?.education?.split(' ').slice(0, 3).join(' ') || 'Verified Educator'}
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[32px]">
        {tutor?.subjects && tutor.subjects.length > 0 ? (
          tutor.subjects.slice(0, 2).map((sub) => (
            <span key={sub} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">
              {sub}
            </span>
          ))
        ) : (
          <span className="text-slate-400 text-[10px] font-medium italic">General Subjects</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-8 bg-slate-50 px-4 py-1.5 rounded-full">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
          ))}
        </div>
        <span className="text-slate-900 text-xs font-black">{tutor?.rating || '5.0'}</span>
      </div>

      <Link to={`/tutor/${tutor?._id}`} className="w-full">
        <button className="w-full py-4 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-blue-200 active:scale-95">
          View {firstName}'s Profile
        </button>
      </Link>
    </motion.div>
  );
}