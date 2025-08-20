import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface StudentAttributes {
  id: number;
  // Personal Information
  fullName: string;
  email?: string;
  phone: string;
  address: string;
  dateOfBirth?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  nationality?: string;
  religion?: string;
  
  // Academic Information
  rollNumber: string;
  studentId?: string;
  department?: string;
  course?: string;
  semester?: string;
  admissionDate?: Date;
  
  // Guardian Information
  guardianName?: string;
  guardianPhone?: string;
  guardianRelation?: string;
  
  // Security & Fee Information
  securityStatus?: 'Verified' | 'Pending' | 'Suspended';
  feeStatus?: 'Paid' | 'Pending' | 'Overdue';
  scholarshipInfo?: string;
  criminalActivity?: string;
  
  // Profile & Status
  profileImage?: string;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Graduated' | 'Dropped';
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface StudentCreationAttributes extends Optional<StudentAttributes, 'id' | 'deletedAt'> {}

export class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  // Personal Information
  public fullName!: string;
  public email?: string;
  public phone!: string;
  public address!: string;
  public dateOfBirth?: Date;
  public gender?: 'Male' | 'Female' | 'Other';
  public bloodGroup?: string;
  public nationality?: string;
  public religion?: string;
  
  // Academic Information
  public rollNumber!: string;
  public studentId?: string;
  public department?: string;
  public course?: string;
  public semester?: string;
  public admissionDate?: Date;
  
  // Guardian Information
  public guardianName?: string;
  public guardianPhone?: string;
  public guardianRelation?: string;
  
  // Security & Fee Information
  public securityStatus?: 'Verified' | 'Pending' | 'Suspended';
  public feeStatus?: 'Paid' | 'Pending' | 'Overdue';
  public scholarshipInfo?: string;
  public criminalActivity?: string;
  
  // Profile & Status
  public profileImage?: string;
  public status!: 'Active' | 'Inactive' | 'Suspended' | 'Graduated' | 'Dropped';
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    // Personal Information
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true,
    },
    bloodGroup: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(50),
      defaultValue: 'Pakistani',
    },
    religion: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    
    // Academic Information
    rollNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    studentId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    semester: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    admissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    
    // Guardian Information
    guardianName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    guardianPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    guardianRelation: {
      type: DataTypes.STRING(30),
      defaultValue: 'Father',
    },
    
    // Security & Fee Information
    securityStatus: {
      type: DataTypes.ENUM('Verified', 'Pending', 'Suspended'),
      defaultValue: 'Pending',
    },
    feeStatus: {
      type: DataTypes.ENUM('Paid', 'Pending', 'Overdue'),
      defaultValue: 'Pending',
    },
    scholarshipInfo: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    criminalActivity: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
    // Profile & Status
    profileImage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Suspended', 'Graduated', 'Dropped'),
      allowNull: false,
      defaultValue: 'Active',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'students',
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['rollNumber'], unique: true },
      { fields: ['studentId'], unique: true },
      { fields: ['fullName'] },
      { fields: ['department'] },
      { fields: ['status'] },
      { fields: ['securityStatus'] },
      { fields: ['feeStatus'] },
    ],
  },
);
