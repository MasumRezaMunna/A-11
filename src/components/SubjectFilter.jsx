import React from 'react';

const subjects = ["All", "Mathematics", "Physics", "English", "ICT", "Chemistry", "Biology"];

export default function SubjectFilter({ activeSubject, setActiveSubject }) {
  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center">
      {subjects.map((sub) => (
        <button
          key={sub}
          onClick={() => setActiveSubject(sub)}
          className={`px-6 py-2 rounded-full font-semibold transition-all border ${
            activeSubject === sub
              ? "bg-slate-900 text-white border-slate-900 shadow-lg"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}