const Internship = require("../models/Internship");

// @desc    Get all internships (with optional skill matching)
// @route   GET /api/internships
const getInternships = async (req, res) => {
  try {
    const { skills, location, type, field, search } = req.query;
    let query = { isActive: true };

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = type;
    if (field) query.field = { $regex: field, $options: "i" };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { requiredSkills: { $in: [new RegExp(search, "i")] } },
      ];
    }

    let internships = await Internship.find(query).sort({ createdAt: -1 });

    if (skills) {
      const userSkills = skills
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      internships = internships.map((internship) => {
        const reqSkills = internship.requiredSkills.map((s) => s.toLowerCase());

        // Count how many user skills match required skills
        const matchedSkills = userSkills.filter((s) => reqSkills.includes(s));
        const matchCount = matchedSkills.length;

        // Score: based on percentage of required skills the user has
        const score =
          reqSkills.length > 0
            ? Math.round((matchCount / reqSkills.length) * 100)
            : 0;

        return {
          ...internship.toObject(),
          matchScore: score,
          matchedSkills,
        };
      });

      // Sort: matched internships first, then by score descending
      internships.sort((a, b) => b.matchScore - a.matchScore);
    }

    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single internship
// @route   GET /api/internships/:id
const getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship)
      return res.status(404).json({ message: "Internship not found" });
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create internship (company only)
// @route   POST /api/internships
const createInternship = async (req, res) => {
  try {
    const internship = await Internship.create({
      ...req.body,
      company: req.user._id,
      companyName: req.user.companyName || req.user.name,
    });
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update internship
// @route   PUT /api/internships/:id
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });
    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });
    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await internship.deleteOne();
    res.json({ message: "Internship removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get internships posted by logged in company
// @route   GET /api/internships/mine
const getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ company: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  getMyInternships,
};
