export default function Hero({ onSearch }) {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          Find the Best <span className="text-brand-primary">Tutors</span>{" "}
          <br />
          in Your Area
        </h1>

        <div className="max-w-3xl mx-auto mt-12 bg-white p-3 rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-2">
          <div className="flex-grow flex items-center px-4 gap-3">
            <span className="text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search by subject or name..."
              className="w-full py-4 outline-none font-medium text-slate-700"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-200">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
