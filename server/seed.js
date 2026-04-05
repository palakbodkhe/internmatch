const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Internship = require("./models/Internship");
const User = require("./models/User");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing internships
    await Internship.deleteMany({});
    console.log("Cleared existing internships");

    // Create a dummy company user for seeded internships
    let company = await User.findOne({ email: "seed@company.com" });
    if (!company) {
      company = await User.create({
        name: "Seed Admin",
        email: "seed@company.com",
        password: "password123",
        role: "company",
        companyName: "Various Companies",
      });
    }

    const internships = [
      {
        title: "Frontend Developer Intern",
        company: company._id,
        companyName: "TechCorp India",
        description:
          "Work on building modern React applications for our SaaS platform. You will collaborate with senior developers, participate in code reviews, and ship features used by thousands of users.",
        location: "Bangalore",
        type: "hybrid",
        duration: "3 months",
        stipend: "₹15,000/month",
        requiredSkills: ["React", "JavaScript", "CSS", "HTML"],
        field: "Frontend Development",
        openings: 3,
      },
      {
        title: "Backend Engineer Intern",
        company: company._id,
        companyName: "StartupHub",
        description:
          "Join our backend team to build scalable APIs using Node.js and MongoDB. You will work on real production systems and learn best practices for building robust server-side applications.",
        location: "Remote",
        type: "remote",
        duration: "6 months",
        stipend: "₹20,000/month",
        requiredSkills: ["Node.js", "MongoDB", "Express", "JavaScript"],
        field: "Backend Development",
        openings: 2,
      },
      {
        title: "Full Stack Developer Intern",
        company: company._id,
        companyName: "InnovateTech",
        description:
          "Build end-to-end features across our React frontend and Node.js backend. Great opportunity to understand the full development lifecycle in a fast-moving startup environment.",
        location: "Mumbai",
        type: "onsite",
        duration: "4 months",
        stipend: "₹18,000/month",
        requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript", "CSS"],
        field: "Full Stack Development",
        openings: 2,
      },
      {
        title: "Data Science Intern",
        company: company._id,
        companyName: "DataWave Analytics",
        description:
          "Work with our data science team to build ML models and analyze large datasets. You will use Python and popular ML libraries to solve real business problems.",
        location: "Hyderabad",
        type: "hybrid",
        duration: "3 months",
        stipend: "₹12,000/month",
        requiredSkills: ["Python", "Machine Learning", "Pandas", "NumPy"],
        field: "Data Science",
        openings: 2,
      },
      {
        title: "Machine Learning Intern",
        company: company._id,
        companyName: "AI Ventures",
        description:
          "Join our AI team to work on NLP and computer vision projects. You will train models, evaluate performance, and help deploy ML solutions to production.",
        location: "Remote",
        type: "remote",
        duration: "6 months",
        stipend: "₹25,000/month",
        requiredSkills: [
          "Python",
          "TensorFlow",
          "Machine Learning",
          "Deep Learning",
        ],
        field: "Machine Learning",
        openings: 1,
      },
      {
        title: "DevOps Intern",
        company: company._id,
        companyName: "CloudBase Systems",
        description:
          "Learn and work with CI/CD pipelines, Docker, and cloud infrastructure. You will help automate deployments and improve our development workflow.",
        location: "Pune",
        type: "hybrid",
        duration: "3 months",
        stipend: "₹14,000/month",
        requiredSkills: ["Docker", "Linux", "Git", "AWS"],
        field: "DevOps",
        openings: 2,
      },
      {
        title: "React Native Mobile Intern",
        company: company._id,
        companyName: "MobileFirst Apps",
        description:
          "Build cross-platform mobile applications using React Native. Work on a real app with thousands of downloads and ship features to both iOS and Android.",
        location: "Remote",
        type: "remote",
        duration: "3 months",
        stipend: "₹16,000/month",
        requiredSkills: [
          "React Native",
          "JavaScript",
          "React",
          "Mobile Development",
        ],
        field: "Mobile Development",
        openings: 2,
      },
      {
        title: "Cybersecurity Intern",
        company: company._id,
        companyName: "SecureNet India",
        description:
          "Learn offensive and defensive security techniques. Work on vulnerability assessments, penetration testing, and help secure our clients infrastructure.",
        location: "Delhi",
        type: "onsite",
        duration: "4 months",
        stipend: "₹15,000/month",
        requiredSkills: ["Linux", "Networking", "Python", "Cybersecurity"],
        field: "Cybersecurity",
        openings: 1,
      },
      {
        title: "Python Developer Intern",
        company: company._id,
        companyName: "AutomateIt",
        description:
          "Build automation scripts and backend services using Python. Work on interesting problems around web scraping, data processing, and API integrations.",
        location: "Remote",
        type: "remote",
        duration: "2 months",
        stipend: "₹10,000/month",
        requiredSkills: ["Python", "Django", "REST API", "SQL"],
        field: "Backend Development",
        openings: 3,
      },
      {
        title: "Software Engineering Intern",
        company: company._id,
        companyName: "GlobalSoft Technologies",
        description:
          "A generalist software engineering internship where you will rotate across frontend, backend, and infrastructure teams. Perfect for someone who wants to explore all areas of software development.",
        location: "Bangalore",
        type: "hybrid",
        duration: "6 months",
        stipend: "₹22,000/month",
        requiredSkills: [
          "JavaScript",
          "Python",
          "Git",
          "SQL",
          "Problem Solving",
        ],
        field: "Software Engineering",
        openings: 5,
      },
    ];

    await Internship.insertMany(internships);
    console.log(`✅ Seeded ${internships.length} internships successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
