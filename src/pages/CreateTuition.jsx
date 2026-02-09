import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function CreateTuition() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tuitions", formData);
      toast("Tuition posted successfully!");
      navigate("/");
    } catch (err) {
      toast(
        err.response?.data?.message ||
          "Failed to post tuition. Are you logged in as a student?",
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-3xl font-black mb-6">Post a New Tuition</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Need Math Tutor for Class 10"
            className="w-full p-3 rounded-xl border border-slate-200"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Class"
            className="p-3 rounded-xl border border-slate-200"
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-3 rounded-xl border border-slate-200"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Location"
            className="p-3 rounded-xl border border-slate-200"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Salary (BDT)"
            className="p-3 rounded-xl border border-slate-200"
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            required
          />
        </div>
        <textarea
          placeholder="Tell us more about your requirements..."
          className="w-full p-3 rounded-xl border border-slate-200 h-32"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>

        <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">
          Post Job Now
        </button>
      </form>
    </div>
  );
}
