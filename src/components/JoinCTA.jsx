import React from 'react';

const JoinCTA = () => {
    return (
  <section className="py-20 bg-slate-900 text-white rounded-t-[3rem] mt-20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-black mb-6">Are you a Teacher?</h2>
        <p className="text-slate-400 text-lg mb-8">
          Join eTuitionBd to reach thousands of students and manage your tuition requests easily.
        </p>
        <button className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl">
          Become a Tutor
        </button>
      </div>
      <div className="md:w-1/3 bg-slate-800 p-8 rounded-3xl border border-slate-700">
         <p className="font-bold mb-4 italic">"I found 3 new students in my first week!"</p>
         <p className="text-sm text-slate-400">- Rahat, ICT Tutor</p>
      </div>
    </div>
  </section>
    );
};

export default JoinCTA;