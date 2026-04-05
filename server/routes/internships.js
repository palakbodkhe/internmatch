const express = require("express");
const router = express.Router();
const {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  getMyInternships,
} = require("../controllers/internshipController");
const { protect, companyOnly } = require("../middleware/auth");

router.get("/", getInternships);
router.get("/mine", protect, companyOnly, getMyInternships);
router.get("/:id", getInternship);
router.post("/", protect, companyOnly, createInternship);
router.put("/:id", protect, companyOnly, updateInternship);
router.delete("/:id", protect, companyOnly, deleteInternship);

module.exports = router;
