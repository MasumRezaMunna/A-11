// import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TuitionCard from './components/TuitionCard';
import TutorCard from './components/TutorCard';
import InfoSection from './components/InfoSection';
import { useEffect, useState } from 'react';
import api from './api/axios';

export default function App() {
  const [tuitions, setTuitions] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [tuitionRes, tutorRes] = await Promise.all([
          api.get('/tuitions'),
          api.get('/users/tutors')
        ]);
        setTuitions(tuitionRes.data.data.tuitions);
        setTutors(tutorRes.data.data.tutors);
      } catch (err) {
        console.error("Critical Load Error", err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  const filteredTutors = tutors.filter((tutor) => {
    const query = searchQuery.toLowerCase();
    return (
      tutor.name?.toLowerCase().includes(query) ||
      tutor.subjects?.some(sub => sub.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen selection:bg-brand-primary/20">
      {/* <Navbar /> */}
      <Hero onSearch={setSearchQuery} />
      
      {/* Tuitions Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black mb-2">Featured Tutors</h2>
              <p className="text-slate-500">Showing {filteredTutors.length} verified experts</p>
            </div>
          </div>
          
          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {filteredTutors.map(t => <TutorCard key={t._id} tutor={t} />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No tutors found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>

      <InfoSection />

      {/* Tutors Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12">Featured Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {tutors.map(t => <TutorCard key={t._id} tutor={t} />)}
          </div>
        </div>
      </section>
    </div>
  );
}