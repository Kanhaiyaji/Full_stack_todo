const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const { errorHandler } = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

const getOrigin = (value) => {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const allowedOrigins = new Set([
  getOrigin(process.env.FRONTEND_URL),
  'https://kanhaiyaji.github.io'
].filter(Boolean));

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin || '');
    const isAllowedOrigin = origin && allowedOrigins.has(origin);

    // Allow same-machine tools (no origin), localhost dev, and configured production origins.
    if (!origin || isLocalhost || isAllowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API base: http://localhost:${PORT}/api`);
});
