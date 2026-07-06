function Navbar({ searchTerm, onSearchChange, currentView, onViewChange }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
      <div
        onClick={() => onViewChange("home")}
        className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer"
      >
        CareerConnect
      </div>

      <div className="w-full max-w-md relative">
        <input
          type="text"
          placeholder="Search jobs, companies..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <span className="absolute right-4 top-2.5 text-slate-400 pointer-events-none"></span>
      </div>

      <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
        <li>
          <button
            onClick={() => onViewChange("home")}
            className={`font-semibold ${currentView === "home" ? "text-blue-600" : "hover:text-blue-600"}`}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => onViewChange("about")}
            className={`font-semibold ${currentView === "about" ? "text-blue-600" : "hover:text-blue-600"}`}
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
