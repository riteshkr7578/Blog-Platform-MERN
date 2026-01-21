import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900"
          onClick={() => setOpen(false)}
        >
          BlogApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-base font-semibold tracking-wide">
          <NavLink to="/" className="nav-link">Home</NavLink>
          {user && <NavLink to="/create" className="nav-link">Create</NavLink>}
          {user && <NavLink to={`/profile/${user.id}`} className="nav-link">Profile</NavLink>}

          {!user && (
            <NavLink to="/login" className="btn-outline-blue">Login</NavLink>
          )}
          {!user && (
            <NavLink to="/register" className="btn-blue">Register</NavLink>
          )}
          {user && (
            <button onClick={logout} className="btn-outline-red">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-6">
          <div className="flex flex-col space-y-4 text-base font-semibold">
            
            <NavLink
              to="/"
              className="mobile-link"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            {user && (
              <NavLink
                to="/create"
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                Create
              </NavLink>
            )}

            {user && (
              <NavLink
                to={`/profile/${user.id}`}
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                Profile
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/login"
                className="mobile-link text-blue-600"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/register"
                className="mobile-link text-blue-600"
                onClick={() => setOpen(false)}
              >
                Register
              </NavLink>
            )}

            {user && (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left text-red-500 font-semibold"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
