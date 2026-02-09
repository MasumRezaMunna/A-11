import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function TuitionsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const { data } = await api.get("/tuitions");

        const tuitionArray = Array.isArray(data.data)
          ? data.data
          : data.data.tuitions;

        setPosts(tuitionArray || []);
      } catch (err) {
        console.error("Error loading tuitions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-slate-400">
        Loading tuitions...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-2">Available Tuitions</h1>
      <p className="text-slate-500 mb-10">
        Find the right teaching job for you.
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {post.title}
                </h2>
                <span className="text-brand-primary font-semibold text-sm">
                  {post.subject} • Class {post.class}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900">
                  ৳{post.salary}
                </p>
                <p className="text-xs text-slate-400 font-bold uppercase">
                  {post.daysPerWeek} Days/Week
                </p>
              </div>
            </div>
            <p className="text-slate-600 mb-6 line-clamp-2">
              {post.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 flex items-center gap-1">
                {post.location}
              </span>
              <Link
                to={`/tuitions/${post._id}`}
                className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
