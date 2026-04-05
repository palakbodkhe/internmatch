import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const statusColors = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  reviewed: "bg-blue-50 text-blue-700 border-blue-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

const Applicants = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [internshipTitle, setInternshipTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, intRes] = await Promise.all([
          api.get(`/applications/internship/${internshipId}`),
          api.get(`/internships/${internshipId}`),
        ]);
        setApplicants(appRes.data);
        setInternshipTitle(intRes.data.title);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [internshipId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    setUpdating(applicationId);
    try {
      const { data } = await api.put(`/applications/${applicationId}`, {
        status: newStatus,
      });
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: data.status } : app,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 mb-6 flex items-center gap-1 hover:underline"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-500 mt-1">{internshipTitle}</p>
        </div>

        {applicants.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
            No applications yet for this internship
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                        {app.student?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {app.student?.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {app.student?.email}
                        </p>
                      </div>
                    </div>

                    {app.student?.location && (
                      <p className="text-sm text-gray-500 mt-2">
                        📍 {app.student.location}
                      </p>
                    )}

                    {app.student?.bio && (
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {app.student.bio}
                      </p>
                    )}

                    {app.student?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {app.student.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {app.coverLetter && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <p className="text-xs font-medium text-gray-400 mb-1">
                          Cover Letter
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {app.coverLetter}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-3">
                      Applied{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3 min-w-fit">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full border capitalize ${statusColors[app.status]}`}
                    >
                      {app.status}
                    </span>

                    <select
                      value={app.status}
                      disabled={updating === app._id}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
