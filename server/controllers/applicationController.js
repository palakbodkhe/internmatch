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

// @desc    Get student's own applications
// @route   GET /api/applications/my
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate(
        "internship",
        "title companyName location type stipend duration",
      )
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applicants for a specific internship (company)
// @route   GET /api/applications/internship/:internshipId
const getApplicants = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship)
      return res.status(404).json({ message: "Internship not found" });
    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const applications = await Application.find({
      internship: req.params.internshipId,
    }).populate("student", "name email skills bio location resumeUrl");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications across all company internships
// @route   GET /api/applications/company-all
const getAllCompanyApplications = async (req, res) => {
  try {
    const myInternships = await Internship.find({ company: req.user._id });
    const internshipIds = myInternships.map((i) => i._id);
    const applications = await Application.find({
      internship: { $in: internshipIds },
    })
      .populate("student", "name email skills bio location")
      .populate("internship", "title")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (company)
// @route   PUT /api/applications/:id
const updateStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "internship",
    );
    if (!application) return res.status(404).json({ message: "Not found" });
    if (application.internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    application.status = req.body.status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyToInternship,
  getMyApplications,
  getApplicants,
  getAllCompanyApplications,
  updateStatus,
};
