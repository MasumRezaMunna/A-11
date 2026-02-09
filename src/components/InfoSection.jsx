export default function InfoSection() {
  const steps = [
    {
      id: 1,
      title: "Post Your Requirement",
      desc: "Students post their tuition requirements with class, subject, and budget.",
      icon: "📝",
    },
    {
      id: 2,
      title: "Tutors Apply",
      desc: "Qualified tutors browse and apply to suitable tuition posts with their credentials.",
      icon: "🤝",
    },
    {
      id: 3,
      title: "Start Learning",
      desc: "Select the best tutor and begin your learning journey.",
      icon: "🎓",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-black text-center text-slate-900 mb-16">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {steps.map((step) => (
          <div key={step.id} className="relative">
            <div className="size-16 bg-brand-primary/10 text-brand-primary text-3xl rounded-2xl flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">
              {step.id}. {step.title}
            </h3>
            <p className="text-slate-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
