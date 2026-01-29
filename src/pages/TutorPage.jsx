import { useEffect, useState } from 'react';
import api from '../api/axios';
import TutorCard from '../components/TutorCard';

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTutors = async () => {
      try {
        const { data } = await api.get('/users?role=tutor');
        setTutors(data.data.users);
      } catch (err) {
        console.error("Error fetching tutors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTutors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900">All Tutors</h1>
        <p className="text-slate-500">Browse our complete list of verified educators.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {tutors.map(t => <TutorCard key={t._id} tutor={t} />)}
        </div>
      )}
    </div>
  );
}