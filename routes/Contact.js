const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // ✅ model import

// ============================
// CORS Headers Middleware
// ============================
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ✅ Preflight OPTIONS
router.options("/", (req, res) => {
  res.sendStatus(200);
});

router.options("/:id", (req, res) => {
  res.sendStatus(200);
});

// ============================
// POST (save new contact)
// ============================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// ============================
// GET (fetch all contacts)
// ============================
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts); // JSON response
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// ============================
// DELETE Contact by ID
// ============================
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
