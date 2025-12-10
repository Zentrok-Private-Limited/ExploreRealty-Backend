const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
