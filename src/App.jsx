import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TuitionCard from './components/TuitionCard';
import api from './api/axios';
import TutorCard from './components/TutorCard';

function App() {
  const [tuitions, setTuitions] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tuitionRes, tutorRes] = await Promise.all([
          api.get('/tuitions'),
          api.get('/users/tutors') 
        ]);
        
        setTuitions(tuitionRes.data.data.tuitions);
        setTutors(tutorRes.data.data.tutors);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Latest Tuition Posts</h2>
            <p className="text-slate-500 font-medium">Find the newest opportunities near you</p>
          </div>
          <button className="hidden md:block text-brand-primary font-bold hover:underline">
            View All Tuitions →
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tuitions.map((post) => (
              <TuitionCard key={post._id} tuition={post} />
            ))}
          </div>
        )}
      </section>
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Featured Tutors</h2>
          <p className="text-slate-500 mb-12">Learn from the best educators in the country</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
          
          <button className="mt-12 text-brand-primary font-bold hover:underline flex items-center gap-2 mx-auto">
            View All Tutors <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;