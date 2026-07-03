import React from "react";
import { FaBullseye, FaShieldAlt, FaBolt } from "react-icons/fa";

function About() {
  const stats = [
    { label: "Active Job Seekers", value: "120k+" },
    { label: "Verified Companies", value: "8,500+" },
    { label: "Successful Placements", value: "45k+" },
    { label: "Global Opportunities", value: "18k+" },
  ];

  const values = [
    {
      icon: <FaBullseye />,
      title: "Targeted Growth",
      description:
        "We align modern engineering talents with industry leaders who match their specific career trajectories.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Transparency",
      description:
        "Every job post on our platform undergoes background screening to keep your data safe and applications secure.",
    },
    {
      icon: <FaBolt />,
      title: "Instant Execution",
      description:
        "Say goodbye to application blackholes. Our direct-to-recruiter pipeline delivers resume handoffs instantly.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Our Mission
          </span>

          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mt-3 mb-6">
            Bridging the Gap Between Talent & Opportunity
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            CareerConnect was founded with a singular, unified vision: to
            streamline the recruitment architecture. We strip away the
            unnecessary noise of modern hiring pipelines to give builders a
            direct path to their next challenge.
          </p>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center border-r last:border-r-0 border-slate-100 px-2"
            >
              <div className="text-3xl font-black text-blue-600 mb-1">
                {stat.value}
              </div>

              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
            
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 text-3xl mb-5">
                {value.icon}
              </div>

              
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {value.title}
              </h3>

             
              <p className="text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;