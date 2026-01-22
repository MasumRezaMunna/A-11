export default function TuitionCard({ tuition }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-brand-primary transition-colors">
        {tuition.title || "Tutor Wanted"}
      </h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Class:</span>
          <span className="font-semibold text-slate-700">{tuition.class}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Subject:</span>
          <span className="font-semibold text-slate-700">{tuition.subject}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Location:</span>
          <span className="font-semibold text-slate-700">{tuition.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <span className="text-xl font-bold text-brand-primary">৳{tuition.salary}</span>
        <button className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-primary hover:text-white transition-all">
          View Details
        </button>
      </div>
    </div>
  );
}