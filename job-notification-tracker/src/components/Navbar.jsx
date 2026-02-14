import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="kn-app-nav">
      <Link to="/" className="kn-app-nav__brand">Job Notification Tracker</Link>

      <button className="kn-app-nav__burger" aria-label="Toggle navigation">
        <span className="kn-app-nav__burger-icon"></span>
      </button>

      <div className="kn-app-nav__links">
        <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
        <Link to="/saved" className={isActive('/saved')}>Saved</Link>
        <Link to="/digest" className={isActive('/digest')}>Digest</Link>
        <Link to="/settings" className={isActive('/settings')}>Settings</Link>
        <Link to="/proof" className={isActive('/proof')}>Proof</Link>
        <a href="http://localhost:5177" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:text-indigo-800 ml-4 border-l pl-4 border-gray-300 flex items-center gap-1">
          Placement Prep ↗
        </a>
      </div>
    </nav>
  );
}
