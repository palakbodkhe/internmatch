import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          InternMatch
        </Link>

        <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
