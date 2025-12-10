require('dotenv').config(); // Load .env at the very top

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http'); // <-- for Vercel

const app = express();

// ============================
// Middleware
// ============================
app.use(cors());
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
// Catch Invalid Routes (404)
// ============================
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// ============================
// Local Server
// ============================
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// ============================
// Serverless Export (for Vercel)
// ============================
module.exports.handler = serverless(app);
