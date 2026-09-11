import React from 'react';

function JobDetailsPage({ job, onBack }) {
  if (!job) {
    return (
      <section className="page-view">
        <div className="page-view-card">
          <span className="blog-kicker">CareerConnect</span>
          <h1>Opportunity Details</h1>
          <p>No job details are available.</p>
          <button className="primary-button" onClick={onBack}>Back to jobs</button>
        </div>
      </section>
    );
  }

  return (
    <section className="job-details-page">
      <div className="job-details-card">
        <div className="job-details-head">
          <div>
            <span className="blog-kicker">{job.job_category || 'Opportunity'}</span>
            <h1>{job.title}</h1>
            <div className="company-line">
              <span className="company-tag">{job.company}</span>
              <span className="detail-location">{job.location}</span>
            </div>
          </div>
          <button className="primary-button" onClick={onBack}>← Back</button>
        </div>

        <div className="details-grid">
          <div className="details-main">
            <div className="detail-summary">
              <div className="detail-row">
                <span className="detail-label">Employment type</span>
                <span className="detail-value">{job.employment_type || 'Full Time'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Remote work</span>
                <span className="detail-value">{job.is_remote_work ? 'Remote friendly' : 'On-site / hybrid'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Salary range</span>
                <span className="detail-value">{formatSalary(job.salary_from, job.salary_to)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Openings</span>
                <span className="detail-value">{job.number_of_opening || 1}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Posted</span>
                <span className="detail-value">{job.created_at || 'Recently'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Application deadline</span>
                <span className="detail-value">{job.application_deadline || 'Open until filled'}</span>
              </div>
            </div>

            <section className="job-description-block">
              <h3>Job Description</h3>
              <p>{job.description}</p>
            </section>

            <section className="job-description-block">
              <h3>Qualifications</h3>
              <div className="qualification-list">
                {parseQualifications(job.qualifications).map((item, index) => (
                  <span className="qualification-item" key={index}>{item}</span>
                ))}
              </div>
            </section>
          </div>

          <aside className="details-aside">
            <div className="apply-panel">
              <span className="apply-label">Apply Information</span>
              <div className="apply-contact">
                <span>Contact</span>
                <strong>{job.contact || 'No contact provided'}</strong>
              </div>
              <div className="apply-buttons">
                <a className="primary-button" href={job.application_url || '#'} target="_blank" rel="noreferrer">
                  Apply Now
                </a>
                <button className="secondary-button small-button" onClick={onBack}>Save Job</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function parseQualifications(raw) {
  if (!raw) return [];

  try {
    const array = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(array) ? array : String(raw).split(',').map((item) => item.trim()).filter(Boolean);
  } catch (e) {
    return String(raw).replace(/\[|\]|"/g, '').split(',').map((item) => item.trim()).filter(Boolean);
  }
}

function formatSalary(from, to) {
  if (!from && !to) return 'Salary available on request';
  if (from && to) return `$${Math.round(from)} - $${Math.round(to)}`;
  if (from) return `From $${Math.round(from)}`;
  if (to) return `Up to $${Math.round(to)}`;
  return 'Salary available on request';
}

export default JobDetailsPage;
