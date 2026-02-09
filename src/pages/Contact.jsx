import React from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const handleSend = (e) => {
    e.preventDefault();
    toast.success("Message received! We will reply to your email shortly.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="md:w-1/3 bg-slate-950 p-12 text-white">
          <h2 className="text-4xl font-black mb-8">Contact Us</h2>
          <p className="text-slate-400 mb-12">
            Need help? We are online to assist students and tutors.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2">
                Email Address
              </p>
              <p className="text-lg">hello@etuitionbd.com</p>
            </div>
            <div>
              <p className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2">
                Office
              </p>
              <p className="text-lg">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-12 lg:p-16">
          <form onSubmit={handleSend} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-50 border-none p-5 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-slate-50 border-none p-5 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700">
                Your Message
              </label>
              <textarea
                required
                rows="5"
                className="w-full bg-slate-50 border-none p-5 rounded-3xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-12 py-5 rounded-3xl font-black hover:bg-blue-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
