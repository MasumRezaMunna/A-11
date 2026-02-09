import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I hire a tutor?",
    a: "Browse our tutor board, click on a profile to see details, and click 'Hire Now' to proceed with a secure payment.",
  },
  {
    q: "Are the tutors verified?",
    a: "Yes! Every tutor must submit credentials for verification by our admin team before appearing on the platform.",
  },
  {
    q: "Is the payment secure?",
    a: "Absolutely. We use Stripe to process all transactions, ensuring your data is always encrypted and safe.",
  },
];

export default function About() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            About <span className="text-blue-600">eTuitionBd</span>
          </h1>
          <p className="text-xl text-slate-600">
            The most trusted bridge between students and expert mentors in
            Bangladesh.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
          <h2 className="text-3xl font-black text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-4">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left flex justify-between items-center py-4 font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-2xl">
                    {activeFaq === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-500 pb-4 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
