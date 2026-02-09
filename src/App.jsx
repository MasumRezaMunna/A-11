import Hero from "./components/Hero";
import TutorCard from "./components/TutorCard";
import InfoSection from "./components/InfoSection";
import { useEffect, useState } from "react";
import api from "./api/axios";
import SubjectFilter from "./components/SubjectFilter";
import WhyChose from "./pages/WhyChose";
import TuitionsPage from "./pages/TuitionsPage";

export default function App() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState("All");

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const tutorRes = await api.get("/users?role=tutor");
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

    const matchesSearch =
      tutor.name?.toLowerCase().includes(query) ||
      tutor.subjects?.some((s) => s.toLowerCase().includes(query));

    const matchesSubject =
      activeSubject === "All" || tutor.subjects?.includes(activeSubject);

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen selection:bg-brand-primary/20">
      <Hero onSearch={setSearchQuery} />

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black mb-2">Featured Tutors</h2>
              <p className="text-slate-500">
                {loading
                  ? "Finding experts..."
                  : `Showing ${filteredTutors.length} verified experts`}
              </p>
            </div>
          </div>
          <SubjectFilter
            activeSubject={activeSubject}
            setActiveSubject={setActiveSubject}
          />
          {loading ? (
            <div className="text-center py-20 font-bold text-slate-400 animate-pulse">
              Loading Tutors...
            </div>
          ) : filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {filteredTutors.map((t) => (
                <TutorCard key={t._id} tutor={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">
                No tutors found for "{searchQuery}"
              </p>
            </div>
          )}
          <TuitionsPage></TuitionsPage>
        </div>
      </section>

      <InfoSection />
      <WhyChose></WhyChose>
    </div>
  );
}
