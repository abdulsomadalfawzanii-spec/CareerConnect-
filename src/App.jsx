import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import LandingPage from "./components/LandingPage";
import Blog from "./components/Blog";
import JobsPage from "./components/JobsPage";
import JobDetailsPage from "./components/JobDetailsPage";
import LoginPage from "./components/LoginPage";

const API_URL = 'https://jsonfakery.com/jobs/paginated?page=';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  const [view, setView] = useState("home");

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${currentPage}`);
      if (!response.ok) throw new Error("Data sync failure.");

      const result = await response.json();
      setJobs(result.data || []);
      setTotalPages(result.last_page || 1);
    } catch (err) {
      setError(err.message || "Unable to load jobs. Please try again.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view !== 'home' && view !== 'jobs') return;
    fetchJobs();
  }, [currentPage, view]);

  const categories = useMemo(() => {
    const categoryMap = new Map();

    jobs.forEach((job) => {
      const key = job.job_category || 'General';
      categoryMap.set(key, (categoryMap.get(key) || 0) + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      icon: categoryIcons[name] || categoryIcons.General,
    }));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch = [
        job.title,
        job.company,
        job.description,
        job.location,
        job.job_category,
        job.employment_type,
      ].some((value) => String(value || '').toLowerCase().includes(query));

      const matchesCategory = activeCategory === 'All' || (job.job_category || 'General') === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, activeCategory]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    if (view !== 'home') setView('home');
  };

  const openJob = (job) => {
    setSelectedJob(job);
    setView('details');
  };

  return (
    <div className="app-shell">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        currentView={view}
        onViewChange={setView}
      />

      {view === 'home' ? (
        <main className="page-main">
          <LandingPage
            jobs={filteredJobs}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onCategoryClick={(category) => { setActiveCategory(category); setCurrentPage(1); }}
            activeCategory={activeCategory}
            categories={categories}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            error={error}
            retryFetch={fetchJobs}
            onOpenJob={openJob}
          />
        </main>
      ) : view === 'jobs' ? (
        <main className="page-main">
          <JobsPage
            jobs={filteredJobs}
            categories={categories}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            activeCategory={activeCategory}
            setActiveCategory={(category) => { setActiveCategory(category); setCurrentPage(1); }}
            loading={loading}
            error={error}
            retryFetch={fetchJobs}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            onOpenJob={openJob}
          />
        </main>
      ) : view === 'details' ? (
        <main className="page-main">
          <JobDetailsPage job={selectedJob} onBack={() => setView('jobs')} />
        </main>
      ) : view === 'blog' ? (
        <main className="page-main">
          <Blog categories={categories} />
        </main>
      ) : view === 'categories' ? (
        <main className="page-main">
          <section className="category-section category-view">
            <div className="section-heading centered">
              <h2>Career Categories</h2>
              <p>Explore the categories uncovered from the live job data.</p>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <button className="category-card" key={category.name} onClick={() => {
                  setActiveCategory(category.name);
                  setView('home');
                  setCurrentPage(1);
                }}>
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-total">{category.count} open position{category.count === 1 ? '' : 's'}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      ) : view === 'pages' ? (
        <main className="page-main">
          <section className="page-view">
            <div className="page-view-card">
              <span className="blog-kicker">CareerConnect</span>
              <h1>Career Resources</h1>
              <p>Use the jobs feed to discover opportunities, compare categories, and explore your next role.</p>
              <div className="page-links">
                <button className="primary-button" onClick={() => setView('home')}>Explore Jobs</button>
                <button className="secondary-button" onClick={() => setView('blog')}>Read Blog</button>
              </div>
            </div>
          </section>
        </main>
      ) : view === 'login' ? (
        <main className="page-main">
          <LoginPage />
        </main>
      ) : (
        <div className="flex-grow">
          <About />
        </div>
      )}

      <Footer />
    </div>
  );
}

const categoryIcons = {
  'Engineering': '⚙️',
  'General': '✦',
  'Product': '✎',
  'Design': '✐',
  'Data': '◌',
};

export default App;
