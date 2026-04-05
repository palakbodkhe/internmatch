import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === "student") {
          const { data } = await api.get("/applications/my");
          setApplications(data);
        } else if (user?.role === "company") {
          const { data } = await api.get("/internships");
          const mine = data.filter((i) => i.company === user._id);
          setInternships(mine);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const statusColors = {
    pending: "bg-yellow-50 text-yellow-700",
    reviewed: "bg-blue-50 text-blue-700",
    accepted: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-600",
  };

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <p className="text-gray-500 capitalize">{user?.role} account</p>
          </div>
          <Link
            to="/profile"
            className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg hover:border-indigo-300 font-medium"
          >
            Edit Profile
          </Link>
        </div>

        {user?.role === "student" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-400 mb-1">Applications</p>
                <p className="text-3xl font-bold text-gray-900">
                  {applications.length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-400 mb-1">Accepted</p>
                <p className="text-3xl font-bold text-green-600">
                  {applications.filter((a) => a.status === "accepted").length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="text-sm text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {applications.filter((a) => a.status === "pending").length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  My Applications
                </h2>
                <Link
                  to="/internships"
                  className="text-indigo-600 text-sm font-medium"
                >
                  Browse more →
                </Link>
              </div>
              {applications.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <p className="mb-4">No applications yet</p>
                  <Link
                    to="/internships"
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
                  >
                    Browse Internships
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {app.internship?.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.internship?.companyName} ·{" "}
                          {app.internship?.location}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {user?.role === "company" && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Posted Internships
              </h2>
              <Link
                to="/post-internship"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
              >
                + Post New
              </Link>
            </div>
            {internships.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p className="mb-4">No internships posted yet</p>
                <Link
                  to="/post-internship"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
                >
                  Post Your First Internship
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {internships.map((i) => (
                  <div
                    key={i._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{i.title}</p>
                      <p className="text-sm text-gray-500">
                        {i.location} · {i.type}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${i.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {i.isActive ? "Active" : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
