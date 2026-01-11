const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");

// Routes
const projectRoutes = require("./routes/ProjectRoute");
const authRoutes = require("./routes/authRoute");
const uploadRoutes = require("./routes/uploadRoute");
const contactRoutes = require("./routes/contactRoutes");
const serviceRoutes = require("./routes/service.routes");

// ======================================================
// 🔌 DATABASE
// ======================================================
connectDB();

const app = express();

// ======================================================
// 🔐 SECURITY
// ======================================================
app.use(helmet());

// ======================================================
// 🌍 CORS (RENDER + LOCAL SAFE)
// ======================================================
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://siddhant-web.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ EXPRESS 5 – PREFLIGHT FIX
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// ======================================================
// 🛑 RATE LIMITING
// ======================================================
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// ======================================================
// 📦 BODY PARSERS
// ======================================================
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ======================================================
// 🧹 PREVENT PARAM POLLUTION
// ======================================================
app.use(
  hpp({
    whitelist: ["page", "limit", "sort", "fields", "status"]
  })
);

// ======================================================
// 📁 STATIC FILES
// ======================================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================================================
// 🚀 ROOT ROUTE (🔥 THIS FIXES YOUR ERROR)
// ======================================================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend API is running 🚀"
  });
});

// ======================================================
// 🚏 API ROUTES
// ======================================================
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);

// ======================================================
// ❤️ HEALTH CHECK
// ======================================================
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ======================================================
// ❌ 404 HANDLER (ALWAYS LAST ROUTE)
// ======================================================
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// ======================================================
// ⚠️ GLOBAL ERROR HANDLER
// ======================================================
app.use(errorHandler);

// ======================================================
// 🚀 SERVER
// ======================================================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ======================================================
// 🧯 PROCESS ERROR HANDLING
// ======================================================
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥", err);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
  process.exit(1);
});
