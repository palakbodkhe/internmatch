import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const InternshipDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/internships/${id}`);
        setInternship(data);
      } catch {
        navigate("/internships");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleApply = async () => {
    if (!user) return navigate("/login");
    setApplying(true);
    try {
      await api.post(`/applications/${id}`, { coverLetter });
      setApplied(true);
      setMessage("Application submitted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!internship) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 mb-6 flex items-center gap-1 hover:underline"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {internship.title}
            </h1>
            <p className="text-xl text-indigo-600 font-medium">
              {internship.companyName}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Location", value: internship.location },
              { label: "Type", value: internship.type },
              { label: "Duration", value: internship.duration },
              { label: "Stipend", value: internship.stipend },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="font-medium text-gray-900 capitalize">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              About this internship
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {internship.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Required skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {internship.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {message && (
            <div
              className={`px-4 py-3 rounded-lg mb-4 text-sm ${
                applied
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {user?.role === "student" && !applied && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Cover letter (optional)
              </h2>
              <textarea
                rows={4}
                placeholder="Tell the company why you're a great fit..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {applying ? "Submitting..." : "Apply Now"}
              </button>
            </div>
          )}

          {!user && (
            <div className="text-center bg-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Log in to apply for this internship
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
              >
                Log In to Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
