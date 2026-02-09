import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostTuition() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    location: "",
    salary: "",
    daysPerWeek: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        salary: Number(formData.salary),
        daysPerWeek: Number(formData.daysPerWeek),
      };
      await api.post("/tuitions", formattedData);
      toast("Tuition posted successfully!");
      navigate("/tuitions");
    } catch (err) {
      toast("Failed to post tuition");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-black mb-8">Post a Tuition Requirement</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
      >
        <input
          type="text"
          placeholder="Title (e.g. Need Physics Tutor for HSC)"
          className="w-full p-4 bg-slate-50 rounded-xl border-none outline-brand-primary"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Subject"
            className="p-4 bg-slate-50 rounded-xl border-none"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Class"
            className="p-4 bg-slate-50 rounded-xl border-none"
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Salary (TK)"
            className="p-4 bg-slate-50 rounded-xl border-none"
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Days/Week"
            className="p-4 bg-slate-50 rounded-xl border-none"
            onChange={(e) =>
              setFormData({ ...formData, daysPerWeek: e.target.value })
            }
            required
          />
        </div>
        <input
          type="text"
          placeholder="Location (Area, City)"
          className="w-full p-4 bg-slate-50 rounded-xl border-none"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Detailed Requirements..."
          className="w-full p-4 bg-slate-50 rounded-xl border-none h-32"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all"
        >
          Post Tuition
        </button>
      </form>
    </div>
  );
}
