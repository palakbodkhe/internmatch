import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const stats = [
  { label: "Internships listed", value: "10+" },
  { label: "Tech fields covered", value: "9" },
  { label: "Free to use", value: "100%" },
];

const features = [
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
  {
    icon: "📊",
    title: "Track applications",
    desc: "See the status of every application in your dashboard in real time.",
  },
  {
    icon: "🔒",
    title: "Secure & private",
    desc: "Your data is protected with JWT authentication and encrypted passwords.",
  },
  {
    icon: "📱",
    title: "Works everywhere",
    desc: "Use InternMatch on your phone, tablet, or laptop — fully responsive.",
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🎓 Built for tech students in India
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="text-indigo-600">Internship</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            InternMatch connects students with tech internships that actually
            match their skills. No more scrolling through irrelevant listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/internships"
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Browse Internships
            </Link>
            {!user && (
              <Link
                to="/register"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3.5 rounded-xl text-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Create Free Account
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-indigo-600">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to land your internship
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            InternMatch is built specifically for tech students — with features
            that make finding and applying to internships simple.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-2xl p-6 hover:bg-indigo-50 transition-colors"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div className="bg-indigo-600 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to find your perfect internship?
            </h2>
            <p className="text-indigo-200 mb-8 text-lg">
              Join students already using InternMatch to kickstart their
              careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
              >
                Sign Up as Student
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Post as Company
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold text-xl">InternMatch</p>
          <p className="text-sm">Built with React, Node.js, MongoDB & ❤️</p>
          <div className="flex gap-6 text-sm">
            <Link to="/internships" className="hover:text-white">
              Browse
            </Link>
            <Link to="/register" className="hover:text-white">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
