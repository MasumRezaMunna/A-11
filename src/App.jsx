import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TuitionCard from './components/TuitionCard';
import TutorCard from './components/TutorCard';
import InfoSection from './components/InfoSection';
import { useEffect, useState } from 'react';
import api from './api/axios';

function App() {
  const [tuitions, setTuitions] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen selection:bg-brand-primary/20">
      <Navbar />
      <Hero />
      
      {/* Tuitions Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-10">Latest Tuition Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tuitions.map(t => <TuitionCard key={t._id} tuition={t} />)}
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