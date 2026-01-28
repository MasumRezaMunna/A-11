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
        const tutorRes = await api.get('/users?role=tutor'); 
    
    setTutors(tutorRes.data.data.users || []);
      } catch (err) {
        console.error("Critical Load Error", err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  const filteredTutors = (tutors || []).filter((tutor) => {
  if (!tutor) return false; 
  const query = searchQuery.toLowerCase();
  return (
    tutor.name?.toLowerCase().includes(query) ||
    tutor.subjects?.some(sub => sub.toLowerCase().includes(query))
  );
});

useEffect(() => {
  const fetchTutors = async () => {
    try {
      const { data } = await api.get('/users?role=tutor');
      setTutors(data.data.users);
    } catch (err) {
      console.error("Could not load tutors:", err);
    }
  };
  fetchTutors();
}, []);

console.log("Total tutors in state:", tutors.length);
console.log("Filtered tutors showing:", filteredTutors.length);

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
          
          {loading ? (
           <div className="text-center py-20">Loading Tutors...</div>
        ) : filteredTutors.length > 0 ? (
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

      
    </div>
  );
}