import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 px-6 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; 2026 CareerConnect are Connecting modern engineering talents seamlessly.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;