const express = require("express");
const router = express.Router();
const {
  applyToInternship,
  getMyApplications,
  getApplicants,
  updateStatus,
} = require("../controllers/applicationController");
const { protect, companyOnly, studentOnly } = require("../middleware/auth");

router.post("/:internshipId", protect, studentOnly, applyToInternship);
router.get("/my", protect, studentOnly, getMyApplications);
router.get("/internship/:internshipId", protect, companyOnly, getApplicants);
router.put("/:id", protect, companyOnly, updateStatus);

module.exports = router;
