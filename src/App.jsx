import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import About from "./components/About"; 

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [view, setView] = useState("home");

  useEffect(() => {
    if (view !== "home") return;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonfakery.com/jobs/paginated?page=${currentPage}`,
        );
        if (!response.ok) throw new Error("Data sync failure.");
        const result = await response.json();

        setJobs(result.data || []);
        setTotalPages(result.last_page || 1);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, view]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    if (view !== "home") setView("home"); 
  };

  const filteredJobs = jobs.filter((job) => {
    const query = searchTerm.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.company?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased">
     
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        currentView={view}
        onViewChange={setView}
      />

      {view === "home" ? (
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-10">
          {loading && (
            <div className="text-center text-slate-500 font-medium py-20 text-lg">
              opportunities is Loading ...
            </div>
          )}

          {error && (
            <div className="text-center bg-red-50 border border-red-200 text-red-600 font-medium rounded-xl p-4 max-w-md mx-auto my-12">
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                  <div className="col-span-full text-center text-slate-500 font-medium py-20">
                    No listings found matching "{searchTerm}" on this page
                    index.
                  </div>
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </>
          )}
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

export default App;
