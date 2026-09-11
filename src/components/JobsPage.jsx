import React from 'react';

function JobsPage({ jobs, categories, searchTerm, onSearchChange, activeCategory, setActiveCategory, loading, error, retryFetch, currentPage, totalPages, onPageChange, onOpenJob }) {
  const uniqueLocations = Array.from(new Set((jobs || []).map((job) => job.location).filter(Boolean))).slice(0, 8);
  const uniqueTypes = Array.from(new Set((jobs || []).map((job) => job.employment_type).filter(Boolean))).slice(0, 6);

  return (
    <section className="jobs-discovery">
      <div className="jobs-discovery-top">
        <div>
          <span className="blog-kicker">Opportunity Finder</span>
          <h1>Latest Job Opportunities</h1>
        </div>
        <div className="jobs-discovery-search">
          <input value={searchTerm} onChange={onSearchChange} placeholder="Search jobs, companies, location..." />
        </div>
      </div>

      <div className="jobs-discovery-layout">
        <aside className="filter-sidebar">
          <div className="filter-header">
            <span>Filters</span>
            <button onClick={() => setActiveCategory('All')}>Reset</button>
          </div>

          <div className="filter-block">
            <label className="filter-title">Category</label>
            <div className="filter-options">
              <button className={activeCategory === 'All' ? 'active' : ''} onClick={() => setActiveCategory('All')}>All</button>
              {(categories || []).map((category) => (
                <button key={category.name} className={activeCategory === category.name ? 'active' : ''} onClick={() => setActiveCategory(category.name)}>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <label className="filter-title">Location</label>
            <div className="filter-options compact">
              {(uniqueLocations || []).map((location) => (
                <button key={location} className="pill-button">{location}</button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <label className="filter-title">Work Type</label>
            <div className="filter-options compact">
              {(uniqueTypes || []).map((type) => (
                <button key={type} className="pill-button">{type}</button>
              ))}
            </div>
          </div>
        </aside>

        <section className="results-panel">
          {loading && <div className="state-panel"><div className="loading-spinner"></div><span>Loading opportunities...</span></div>}
          {error && <div className="state-panel error-panel"><span>Unable to load jobs. Please try again.</span><button className="primary-button" onClick={retryFetch}>Retry</button></div>}

          {!loading && !error && (jobs.length === 0 ? (
            <div className="state-panel empty-panel"><span>No jobs found matching your search.</span></div>
          ) : (
            <>
              <div className="results-grid">
                {(jobs || []).map((job) => <JobResultCard key={job.id} job={job} onOpenJob={onOpenJob} />)}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                  <span className="page-number">Page {currentPage} of {totalPages}</span>
                  <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
                </div>
              )}
            </>
          ))}
        </section>
      </div>
    </section>
  );
}

function JobResultCard({ job, onOpenJob }) {
  return (
    <article className="result-card">
      <div className="result-card-head">
        <div>
          <span className="company-tag">{job.company}</span>
          <h3>{job.title}</h3>
        </div>
        <span className="job-category">{job.job_category || 'General'}</span>
      </div>

      <div className="result-location">
        <span>{job.location}</span>
        <span>{job.employment_type || 'Full Time'}</span>
      </div>

      <p>{job.description}</p>

      <div className="result-meta">
        <span className="salary">{formatSalary(job.salary_from, job.salary_to)}</span>
        <button className="secondary-button small-button" onClick={() => onOpenJob(job)}>View Job</button>
      </div>
    </article>
  );
}

function formatSalary(from, to) {
  if (!from && !to) return 'Salary available on request';
  if (from && to) return `$${Math.round(from)} - $${Math.round(to)}`;
  if (from) return `From $${Math.round(from)}`;
  if (to) return `Up to $${Math.round(to)}`;
  return 'Salary available on request';
}

export default JobsPage;
