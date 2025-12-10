const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// 🔹 Signup (Register Employee)
router.post("/signup", async (req, res) => {
    try {
        const { employeeId, number, password } = req.body;

        if (!employeeId || !number || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await Employee.findOne({ employeeId });  // ✅ yaha Admin ki jagah Employee use karo
        if (exists) {
            return res.status(400).json({ message: "Employee already registered" });
        }

        const newEmployee = new Employee({ employeeId, number, password }); // ✅ yaha bhi Employee
        await newEmployee.save();

        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        console.error("❌ Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const user = await Employee.findOne({ employeeId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

