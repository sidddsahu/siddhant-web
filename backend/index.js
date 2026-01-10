const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/appError');

// Routes
const projectRoutes = require('./routes/ProjectRoute');
const authRoutes = require('./routes/authRoute');
const uploadRoutes = require('./routes/uploadRoute');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require("./routes/service.routes");

connectDB();

const app = express();

// Security headers
app.use(helmet());

// Rate limiter
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove mongoSanitize + xss-clean completely!
// Express 5 breaks when touching req.query

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['page', 'limit', 'sort', 'fields', 'status']
}));

// CORS (only ONE clean configuration)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/services", serviceRoutes);
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Shutdown handlers
process.on('unhandledRejection', (err) => {
  console.error(err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});
