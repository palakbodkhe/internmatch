import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const statusColors = {
  pending: "bg-yellow-50 text-yellow-700",
  reviewed: "bg-blue-50 text-blue-700",
  accepted: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-600",
};

const StudentDashboard = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/applications/my");
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-500">Student dashboard</p>
        </div>
        <Link
          to="/profile"
          className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg hover:border-indigo-300 font-medium"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total applications",
            value: applications.length,
            color: "text-gray-900",
          },
          {
            label: "Accepted",
            value: applications.filter((a) => a.status === "accepted").length,
            color: "text-green-600",
          },
          {
            label: "Pending",
            value: applications.filter((a) => a.status === "pending").length,
            color: "text-yellow-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {user?.skills?.length === 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="font-medium text-indigo-900">
              Add your skills to get matched!
            </p>
            <p className="text-sm text-indigo-600 mt-1">
              Internships will be ranked by how well they match your skills.
            </p>
          </div>
          <Link
            to="/profile"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
          >
            Add Skills
          </Link>
        </div>
      )}

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
                    {app.internship?.companyName} · {app.internship?.location} ·{" "}
                    {app.internship?.stipend}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Applied{" "}
                    {new Date(app.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
    </div>
  );
};

const CompanyDashboard = ({ user }) => {
  const [internships, setInternships] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intRes, appRes] = await Promise.all([
          api.get("/internships/mine"),
          api.get("/applications/company-all"),
        ]);
        setInternships(intRes.data);
        setAllApplications(appRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCount = (internshipId) =>
    allApplications.filter(
      (a) =>
        a.internship?._id === internshipId || a.internship === internshipId,
    ).length;

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.companyName || user?.name}
          </h1>
          <p className="text-gray-500">Company dashboard</p>
        </div>
        <Link
          to="/post-internship"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700"
        >
          + Post Internship
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Posted internships",
            value: internships.length,
            color: "text-gray-900",
          },
          {
            label: "Total applicants",
            value: allApplications.length,
            color: "text-indigo-600",
          },
          {
            label: "Accepted",
            value: allApplications.filter((a) => a.status === "accepted")
              .length,
            color: "text-green-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Internships
          </h2>
          <Link
            to="/post-internship"
            className="text-indigo-600 text-sm font-medium"
          >
            + Post new
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
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{i.title}</p>
                  <p className="text-sm text-gray-500">
                    {i.location} · {i.type} · {i.duration}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {getCount(i._id)} applicant
                    {getCount(i._id) !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${i.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {i.isActive ? "Active" : "Closed"}
                  </span>
                  <button
                    onClick={() => navigate(`/applicants/${i._id}`)}
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700"
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      {user?.role === "student" ? (
        <StudentDashboard user={user} />
      ) : (
        <CompanyDashboard user={user} />
      )}
    </div>
  );
};

export default Dashboard;
