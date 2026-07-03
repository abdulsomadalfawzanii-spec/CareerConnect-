import React from 'react';

function JobCard({ job }) {
  const handleApply = () => {
    alert(`Application request for "${job.title}" has been simulated successfully.`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide">
            {job.type || 'Full Time'}
          </span>
          <span className="text-sm font-semibold text-slate-900">
            {job.salary || 'Competitive'}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">{job.title}</h3>
        <h4 className="text-sm font-medium text-blue-600 mb-3">{job.company || 'TechCorp Global'}</h4>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {job.description || 'No description provided.'}
        </p>
      </div>
      
      <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-auto">
        <span className="text-xs text-slate-500 flex items-center gap-1">
           {job.location || 'Remote'}
        </span>
        <button 
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;