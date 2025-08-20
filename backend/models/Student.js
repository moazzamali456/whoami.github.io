const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Personal Information
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  bloodGroup: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  nationality: {
    type: DataTypes.STRING(50),
    defaultValue: 'Pakistani'
  },
  religion: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
  // Academic Information
  studentId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  course: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12
    }
  },
  admissionDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  
  // Guardian Information
  guardianName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  guardianPhone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  guardianRelation: {
    type: DataTypes.STRING(30),
    defaultValue: 'Father'
  },
  
  // Security & Fee Information
  securityStatus: {
    type: DataTypes.ENUM('Verified', 'Pending', 'Suspended'),
    defaultValue: 'Pending'
  },
  feeStatus: {
    type: DataTypes.ENUM('Paid', 'Pending', 'Overdue'),
    defaultValue: 'Pending'
  },
  scholarshipInfo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  
  // Profile Image
  profileImage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Status
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Graduated', 'Dropped'),
    defaultValue: 'Active'
  }
}, {
  tableName: 'students',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['studentId']
    },
    {
      fields: ['department']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Student;
