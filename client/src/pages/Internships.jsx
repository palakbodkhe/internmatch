import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Internships = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterField, setFilterField] = useState("");

  const fetchInternships = async (searchVal = search) => {
    setLoading(true);
    try {
      const params = {};
      if (searchVal) params.search = searchVal;
      if (filterType) params.type = filterType;
      if (filterField) params.field = filterField;
      if (user?.skills?.length) params.skills = user.skills.join(",");
      const { data } = await api.get("/internships", { params });
      setInternships(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [filterType, filterField]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInternships(search);
  };

  const matchColor = (score) => {
    if (score >= 75) return "bg-green-50 text-green-700";
    if (score >= 40) return "bg-yellow-50 text-yellow-700";
    return "bg-gray-100 text-gray-500";
  };

  const fields = [
    "",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Mobile Development",
    "Cybersecurity",
    "Software Engineering",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Browse Internships
        </h1>
        <p className="text-gray-500 mb-8">
          {user?.skills?.length
            ? `Showing matches based on your skills: ${user.skills.join(", ")}`
            : "Log in and add your skills to see personalized match scores"}
        </p>

        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by title, company, or skill..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-4">
          {["", "remote", "onsite", "hybrid"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                filterType === type
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {type === ""
                ? "All types"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => setFilterField(field)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                filterField === field
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {field === "" ? "All fields" : field}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading internships...
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No internships found
          </div>
        ) : (
          <div className="grid gap-4">
            {internships.map((internship) => (
              <div
                key={internship._id}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {internship.title}
                      </h3>
                      {internship.matchScore !== undefined &&
                        internship.matchScore > 0 && (
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${matchColor(internship.matchScore)}`}
                          >
                            {internship.matchScore}% match
                          </span>
                        )}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                          internship.type === "remote"
                            ? "bg-blue-50 text-blue-700"
                            : internship.type === "hybrid"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {internship.type}
                      </span>
                    </div>
                    <p className="text-indigo-600 font-medium mb-2">
                      {internship.companyName}
                    </p>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {internship.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {internship.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className={`text-xs px-2 py-1 rounded-md font-medium ${
                            internship.matchedSkills?.includes(
                              skill.toLowerCase(),
                            )
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-indigo-50 text-indigo-700"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>📍 {internship.location}</span>
                      <span>⏱ {internship.duration}</span>
                      <span>💰 {internship.stipend}</span>
                      <span>
                        👥 {internship.openings} opening
                        {internship.openings > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/internships/${internship._id}`}
                    className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
