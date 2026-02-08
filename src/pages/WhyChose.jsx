import React from 'react';

const WhyChose = () => {
    return (
        <div>
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
        Why Choose <span className="text-brand-primary">eTuitionBd</span>?
      </h2>
      <p className="text-slate-500 font-medium max-w-2xl mx-auto">
        We bridge the gap between brilliant tutors and ambitious students across Bangladesh 
        with a platform built on trust and efficiency.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
          <svg className="w-8 h-8 text-brand-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3">Verified Tutors</h3>
        <p className="text-slate-600 leading-relaxed">
          Every tutor profile is manually screened. We verify educational backgrounds from top 
          universities like DIU, BUET, and DU to ensure quality education.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
          <svg className="w-8 h-8 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3">Fast Matching</h3>
        <p className="text-slate-600 leading-relaxed">
          Post a job and get applications within minutes. Our smart algorithm connects 
          students with tutors who live nearby, saving time and transport costs.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
          <svg className="w-8 h-8 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3">Zero Hidden Fees</h3>
        <p className="text-slate-600 leading-relaxed">
          Transparency is our core value. Students post jobs for free, and tutors only pay 
          a small commission after successfully securing a tuition.
        </p>
      </div>
    </div>
  </div>
</section>
        </div>
    );
};

export default WhyChose;