import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Profile = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    skills: user?.skills?.join(", ") || "",
    interests: user?.interests?.join(", ") || "",
    companyName: user?.companyName || "",
    companyWebsite: user?.companyWebsite || "",
    companyDescription: user?.companyDescription || "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        interests: form.interests
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const { data } = await api.put("/auth/profile", payload);
      login(data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500 mb-8">
          {user?.role === "student"
            ? "Keep your skills updated to get better matches"
            : "Update your company information"}
        </p>

        {message && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {user?.role === "student" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills{" "}
                  <span className="text-gray-400 font-normal">
                    (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, Python, MongoDB..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interests{" "}
                  <span className="text-gray-400 font-normal">
                    (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Web Development, AI, Cloud Computing..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.interests}
                  onChange={(e) =>
                    setForm({ ...form, interests: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell companies about yourself..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Mumbai, India"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {user?.role === "company" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  placeholder="https://yourcompany.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.companyWebsite}
                  onChange={(e) =>
                    setForm({ ...form, companyWebsite: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Description
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.companyDescription}
                  onChange={(e) =>
                    setForm({ ...form, companyDescription: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
