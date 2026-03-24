import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">IoT Dashboard</div>
      <nav className="navbar__nav">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to="/devices" className={({ isActive }) => (isActive ? 'active' : '')}>
          Devices
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>
          Add Device
        </NavLink>
      </nav>
    </header>
  );
}
