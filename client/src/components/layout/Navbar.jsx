import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          InternMatch
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/internships"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Browse
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/internships"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Browse
              </Link>
              {user.role === "company" && (
                <Link
                  to="/post-internship"
                  className="text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Post Internship
                </Link>
              )}
              <Link
                to="/profile"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 flex flex-col gap-3">
          {!user ? (
            <>
              <Link
                to="/internships"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 font-medium py-2"
              >
                Browse
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 font-medium py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center font-medium"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 font-medium py-2"
              >
                Dashboard
              </Link>
              <Link
                to="/internships"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 font-medium py-2"
              >
                Browse
              </Link>
              {user.role === "company" && (
                <Link
                  to="/post-internship"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600 font-medium py-2"
                >
                  Post Internship
                </Link>
              )}
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 font-medium py-2"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
