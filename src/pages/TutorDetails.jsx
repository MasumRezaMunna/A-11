import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function TutorDetails() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTutor = async () => {
    if (!id || id === ":id") return;

    try {
      setLoading(true);
      const res = await api.get(`/users/${id}`);
      
      console.log("API Response:", res.data);

      const tutorData = res.data.data?.user || res.data.user || res.data.data;
      
      if (tutorData) {
        setTutor(tutorData);
      } else {
        console.error("User object not found in response");
      }
    } catch (err) {
      console.error("Error fetching tutor:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchTutor();
}, [id]);

  if (loading) return <div className="text-center py-20 font-bold">Loading Profile...</div>;
  if (!tutor) return <div className="text-center py-20">Tutor not found.</div>;

  const handleHire = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) return alert("Please login to hire a tutor");
  if (user.role !== 'student') return alert("Only students can hire tutors");

  try {
    const message = prompt("Enter a short message for the tutor:");
    if (!message) return;

    await api.post('/hire/request', {
      tutorId: id, 
      message: message
    });

    alert("Request sent successfully! The tutor will contact you.");
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="bg-white rounded-4xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        
        <div className="md:w-1/3 bg-slate-900 p-10 text-center text-white">
          <img 
            src={tutor.profileImage || 'https://via.placeholder.com/300'} 
            className="size-48 rounded-3xl object-cover mx-auto mb-6 border-4 border-slate-800 shadow-2xl"
            alt={tutor.name}
          />
          <h2 className="text-2xl font-black mb-2">{tutor.name}</h2>
          <div className="inline-block bg-brand-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Verified Tutor
          </div>
          
          <div className="space-y-4 text-left border-t border-slate-800 pt-6">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase">Experience</p>
              <p className="font-medium">{tutor.experience || '2+ Years'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase">Education</p>
              <p className="font-medium">{tutor.education || 'BSc in Computer Science'}</p>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-12">
          <div className="mb-10">
            <h3 className="text-xl font-black text-slate-900 mb-4">About Me</h3>
            <p className="text-slate-600 leading-relaxed italic">
              "{tutor.bio || 'Experienced tutor dedicated to helping students achieve their academic goals through personalized learning strategies.'}"
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-black text-slate-900 mb-4">Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {tutor.subjects?.map(sub => (
                <span key={sub} className="bg-blue-50 text-brand-primary px-4 py-2 rounded-xl font-bold text-sm">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-sm">Expected Salary</p>
              <p className="text-2xl font-black text-slate-900">{tutor.salary || 'Negotiable'}</p>
            </div>
            <button 
  onClick={handleHire}
  className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
>
  Hire Now
</button>
          </div>
        </div>
      </div>
    </div>
  );
}