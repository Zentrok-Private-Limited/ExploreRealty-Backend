require('dotenv').config(); // Load .env at the very top

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env, fallback 5000

// ============================
// CORS Configuration
// ============================

// ✅ Allow only your frontend origin (replace with actual URL)
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:4200", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// ✅ Preflight OPTIONS handling
app.options("*", cors(corsOptions));

// ============================
// Middleware
// ============================
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// ============================
// MongoDB Connection
// ============================
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// ============================
// Routes
// ============================
const subscribeRoute = require('./routes/subscribe');
app.use("/subscriber", subscribeRoute);

const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

// ============================
// Start Server
// ============================
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
