const express = require('express');
const router = express.Router();
const Subscribe = require('../models/subscribe');

// ✅ POST (save new email)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const newSub = new Subscribe({ email });
    await newSub.save();
    res.json({ message: "Subscription successful!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already subscribed!" });
    }
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// ✅ GET (fetch all emails)
router.get("/", async (req, res) => {
  try {
    const subs = await Subscribe.find();
    res.json(subs);   // 👉 यहाँ JSON return होगा
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// ✅ DELETE subscriber by ID
router.delete("/:id", async (req, res) => {
  try {
    await Subscribe.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

module.exports = router;
