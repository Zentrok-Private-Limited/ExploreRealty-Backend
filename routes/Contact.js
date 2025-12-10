const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");  // ✅ model import

// 👉 POST (new contact save)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});


// ✅ GET (fetch all contacts)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// ✅ DELETE Contact by ID
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
