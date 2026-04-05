const Application = require("../models/Application");
const Internship = require("../models/Internship");

// @desc    Apply to internship
// @route   POST /api/applications/:internshipId
const applyToInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship)
      return res.status(404).json({ message: "Internship not found" });

    const existing = await Application.findOne({
      internship: req.params.internshipId,
      student: req.user._id,
    });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const application = await Application.create({
      internship: req.params.internshipId,
      student: req.user._id,
      coverLetter: req.body.coverLetter || "",
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's applications
// @route   GET /api/applications/my
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user._id,
    }).populate("internship", "title companyName location type stipend");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applicants for a company's internship
// @route   GET /api/applications/internship/:internshipId
const getApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      internship: req.params.internshipId,
    }).populate("student", "name email skills bio location");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (company)
// @route   PUT /api/applications/:id
const updateStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyToInternship,
  getMyApplications,
  getApplicants,
  updateStatus,
};
