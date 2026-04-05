import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const PostInternship = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "remote",
    duration: "",
    stipend: "",
    requiredSkills: "",
    field: "Software Engineering",
    openings: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        requiredSkills: form.requiredSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        openings: Number(form.openings),
      };
      await api.post("/internships", payload);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post internship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Post an Internship
        </h1>
        <p className="text-gray-500 mb-8">
          Fill in the details to find the best matching students
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              placeholder="Frontend Developer Intern"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the role, responsibilities, and what the intern will learn..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                placeholder="Mumbai / Remote"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                required
                placeholder="3 months"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stipend
              </label>
              <input
                type="text"
                placeholder="₹10,000/month or Unpaid"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.stipend}
                onChange={(e) => setForm({ ...form, stipend: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Skills{" "}
              <span className="text-gray-400 font-normal">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              required
              placeholder="React, Node.js, MongoDB"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.requiredSkills}
              onChange={(e) =>
                setForm({ ...form, requiredSkills: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field
              </label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.field}
                onChange={(e) => setForm({ ...form, field: e.target.value })}
              >
                <option>Software Engineering</option>
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>Full Stack Development</option>
                <option>Data Science</option>
                <option>Machine Learning</option>
                <option>DevOps</option>
                <option>Cybersecurity</option>
                <option>Mobile Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Openings
              </label>
              <input
                type="number"
                min={1}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.openings}
                onChange={(e) => setForm({ ...form, openings: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Internship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInternship;
