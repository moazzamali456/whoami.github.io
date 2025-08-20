const { Sequelize } = require('sequelize');
require('dotenv').config();

// MySQL Database Configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'student_management',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: true,
      timestamps: true
    }
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connected successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    console.log('🔧 Please ensure MySQL/phpMyAdmin is running and database credentials are correct');
  }
};

testConnection();

module.exports = sequelize;
