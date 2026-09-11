function Navbar({ searchTerm, onSearchChange, currentView, onViewChange }) {
  return (
    <nav className="site-navbar">
      <div className="nav-inner">
        <div className="brand" onClick={() => onViewChange("home")}>CareerConnect</div>

        <div className="nav-menu">
          <button className={currentView === "home" ? "active" : ""} onClick={() => onViewChange("home")}>Home</button>
          <button className={currentView === "about" ? "active" : ""} onClick={() => onViewChange("about")}>About</button>
          <button className={currentView === "jobs" ? "active" : ""} onClick={() => onViewChange("jobs")}>Jobs</button>
          <button className={currentView === "categories" ? "active" : ""} onClick={() => onViewChange("categories")}>Categories</button>
          <button className={currentView === "pages" ? "active" : ""} onClick={() => onViewChange("pages")}>Pages</button>
          <button className={currentView === "blog" ? "active" : ""} onClick={() => onViewChange("blog")}>Blog</button>
        </div>

        <div className="nav-actions">
          <button className="signin-button" onClick={() => onViewChange("login")}>Sign In</button>
          <button className="signup-button">Post A Job</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
