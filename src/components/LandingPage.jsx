import React from 'react';

function LandingPage({ jobs, searchTerm, onSearchChange, onCategoryClick, activeCategory, categories, onPageChange, currentPage, totalPages, loading, error, retryFetch, onOpenJob}) {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-kicker">Find Jobs, Employment &amp; Career Opportunities</span>
          <h1>Find Your Next Opportunity</h1>
          <p>Discover jobs that match your skills, ambition, and career goals across modern teams and growing companies.</p>

          <div className="hero-search-panel">
            <div className="search-form">
              <div className="search-field">
                <label>Keyword</label>
                <input value={searchTerm} onChange={onSearchChange} placeholder="Job title, company, category..." />
              </div>
              <div className="search-field">
                <label>Location</label>
                <input value="Remote" readOnly />
              </div>
              <div className="search-field">
                <label>Category</label>
                <select value={activeCategory} onChange={(e) => onCategoryClick(e.target.value)}>
                  <option value="All">All categories</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              <button className="primary-button search-button">Find Jobs</button>
            </div>
          </div>

          <div className="trending-strip">
            <span>Trending:</span>
            {categories.slice(0, 5).map((category) => (
              <button key={category.name} onClick={() => onCategoryClick(category.name)}>{category.name}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="category-section">
        <div className="section-heading centered">
          <h2>Choose Your Category</h2>
          <p>Explore opportunity areas built from real roles coming through the API feed.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button className="category-card" key={category.name} onClick={() => onCategoryClick(category.name)}>
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-total">{category.count} open position{category.count===1?'':'s'}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="jobs-section">
        <div className="section-heading centered">
          <h2>Jobs You May Be Interested In</h2>
          <p>Latest opportunities pulled directly from the jobs API.</p>
        </div>

        {loading && (
          <div className="state-panel">
            <div className="loading-spinner"></div>
            <span>Loading opportunities...</span>
          </div>
        )}

        {error && (
          <div className="state-panel error-panel">
            <span>Unable to load jobs. Please try again.</span>
            <button className="primary-button" onClick={retryFetch}>Retry</button>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="state-panel empty-panel">
            <span>No jobs found matching your search.</span>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="job-grid">
            {jobs.map((job) => <JobCard key={job.id} job={job} onOpenJob={onOpenJob} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage===1} onClick={() => onPageChange(currentPage-1)}>Previous</button>
            <span className="page-number">Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage===totalPages} onClick={() => onPageChange(currentPage+1)}>Next</button>
          </div>
        )}
      </section>
    </>
  );
}

function JobCard({ job, onOpenJob }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div>
          <span className="company-tag">{job.company}</span>
          <h3>{job.title}</h3>
        </div>
        <span className="job-category">{job.job_category || 'Career'}</span>
      </div>

      <div className="job-meta">
        <span><i className="icon-location"></i>{job.location}</span>
        <span><i className="icon-type"></i>{job.employment_type || 'Full Time'}</span>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-card-bottom">
        <span className="salary">{formatSalary(job.salary_from, job.salary_to)}</span>
        <button className="secondary-button" onClick={() => onOpenJob(job)}>View Details</button>
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

export default LandingPage;
