export default function Hero() {
  return (
    <section className="relative bg-brand-primary py-24 lg:py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
      
      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
          Find Your Perfect Tutor
        </h1>
        <p className="text-lg lg:text-xl text-blue-50 font-medium mb-10 max-w-2xl mx-auto opacity-90">
          Connect with qualified tutors across Bangladesh. Start your journey towards academic excellence today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group w-full sm:w-auto bg-white text-brand-primary px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-brand-accent transition-all flex items-center justify-center gap-2">
            Browse Tuitions
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button className="w-full sm:w-auto bg-white/10 border border-white/20 backdrop-blur-md text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
            Find Tutors
          </button>
        </div>
      </div>
    </section>
  );
}