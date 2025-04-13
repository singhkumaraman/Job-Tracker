import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiAnalogue } from "react-icons/si";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../store/AuthContext";

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className="bg-light py-3">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link
          className="navbar-brand d-flex align-items-center text-dark text-decoration-none"
          to="/"
        >
          <SiAnalogue className="me-2 text-info fs-4" />
          <span className="fw-bold fs-4">Job Application Tracker</span>
        </Link>

        {/* Navbar Toggle Button (for Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Items (Links & Button) */}
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <Link to="/" className="nav-link text-dark fw-medium nav-hover">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                to="/applications"
                className="nav-link text-dark fw-medium nav-hover"
              >
                Applications
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                to="/jobs"
                className="nav-link text-dark fw-medium nav-hover"
              >
                Jobs
              </Link>
            </li>
          </ul>

          <div className="mt-2 mt-lg-0 ms-lg-3">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="btn btn-outline-secondary px-4 py-2 rounded-pill auth-hover"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="btn btn-info px-4 py-2 rounded-pill auth-hover"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <style>
        {`
          .navbar-brand:hover {
            color: #17a2b8;
            transition: color 0.3s ease;
          }
          .nav-hover {
            transition: color 0.3s ease-in-out;
          }
          .nav-hover:hover {
            color: #17a2b8 !important;
          }
          .auth-hover {
            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
          }
          .auth-hover:hover {
            background-color: #17a2b8 !important;
            color: white !important;
          }
          .btn-outline-secondary.auth-hover:hover {
            background-color: #6c757d !important;
            color: white !important;
          }
          .navbar-toggler-icon {
            background-color: #17a2b8;
          }
          .navbar-nav .nav-item .nav-link {
            font-size: 1.2rem;
            font-weight: 500;
          }
          .navbar-nav .nav-item .nav-link:hover {
            color: #17a2b8;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
