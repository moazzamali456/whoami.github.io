import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { sequelize } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { rbacMiddleware } from './middleware/rbac';
import routes from './routes';
import pino from 'pino';
import { requestLogger } from './utils/logger';

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", config.CORS_ORIGINS],
      imgSrc: ["'self'", 'data:'],
    },
  },
}));
app.use(cors({
  origin: config.CORS_ORIGINS,
  credentials: true,
}));
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(rateLimit({
  windowMs: parseInt(config.RATE_LIMIT_WINDOW) * 60 * 1000, // Convert minutes to milliseconds
  max: config.RATE_LIMIT_MAX,
  message: 'Too many requests, please try again later.',
}));

app.use('/api', routes);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('✅ MySQL Database connected successfully');
  } catch (error: any) {
    console.log('❌ Database connection failed, running without database:', error.message);
    console.log('🔧 Please ensure MySQL/phpMyAdmin is running and database credentials are correct');
  }
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      database: "MySQL with phpMyAdmin integration",
      admin: {
        name: process.env.ADMIN_NAME || "Syed Moazzam Ali",
        email: process.env.ADMIN_EMAIL || "whoami00380@gmail.com",
        phone: process.env.ADMIN_PHONE || "03296228003"
      }
    });
  });
  
  app.listen(config.PORT, () => {
    console.log(`
🚀 Student Management System Server Started!
📍 Server: http://localhost:${config.PORT}
🔗 API: http://localhost:${config.PORT}/api
💾 Database: MySQL (phpMyAdmin integration)
🎯 Admin: ${process.env.ADMIN_EMAIL || 'whoami00380@gmail.com'} | ${process.env.ADMIN_PHONE || '03296228003'}

📊 Available endpoints:
   GET  /api/students         - Get all students
   POST /api/students         - Add new student
   GET  /api/students/:id     - Get student by ID
   PUT  /api/students/:id     - Update student
   DELETE /api/students/:id   - Delete student
   GET  /api/students/analytics    - System analytics
   GET  /api/students/status       - Database status
   GET  /api/students/export/csv   - Export CSV
   GET  /api/health           - Health check

🗄️  phpMyAdmin: ${process.env.PHPMYADMIN_URL || 'http://localhost/phpmyadmin'}
   Database: ${process.env.DB_NAME || 'student_management'}
   Tables: students
    `);
    pino().info(`🚀 Matrix Student Management Server running on port ${config.PORT}`);
  });
};

start();
