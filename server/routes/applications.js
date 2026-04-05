const express = require("express");
const router = express.Router();
const {
  applyToInternship,
  getMyApplications,
  getApplicants,
  getAllCompanyApplications,
  updateStatus,
} = require("../controllers/applicationController");
const { protect, companyOnly, studentOnly } = require("../middleware/auth");

router.get("/my", protect, studentOnly, getMyApplications);
router.get("/company-all", protect, companyOnly, getAllCompanyApplications);
router.get("/internship/:internshipId", protect, companyOnly, getApplicants);
router.post("/:internshipId", protect, studentOnly, applyToInternship);
router.put("/:id", protect, companyOnly, updateStatus);

module.exports = router;
