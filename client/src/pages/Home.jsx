import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect{" "}
            <span className="text-indigo-600">Internship</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            InternMatch connects students with tech internships that match their
            skills and interests. No more scrolling through irrelevant listings.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/internships"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700"
            >
              Browse Internships
            </Link>
            {!user && (
              <Link
                to="/register"
                className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: "🎯",
              title: "Skill-based matching",
              desc: "We rank internships by how well they match your skills — the best fits come first.",
            },
            {
              icon: "🏢",
              title: "Top tech companies",
              desc: "Connect with startups and established companies looking for fresh talent.",
            },
            {
              icon: "🚀",
              title: "Apply in one click",
              desc: "Your profile is your application. Apply instantly with a cover letter.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
