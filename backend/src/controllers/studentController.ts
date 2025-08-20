import { Request, Response, NextFunction } from 'express';
import { Student } from '../models/Student';
import { Op } from 'sequelize';

// Sample data for initial setup
const sampleStudents = [
  {
    fullName: "Ahmed Ali",
    email: "ahmed.ali@email.com",
    phone: "03001234567",
    address: "123 Main Street, Karachi",
    dateOfBirth: "2002-05-15",
    gender: "Male",
    bloodGroup: "O+",
    nationality: "Pakistani",
    religion: "Islam",
    rollNumber: "STU001",
    studentId: "STU001",
    department: "Computer Science",
    course: "Software Engineering",
    semester: "3",
    admissionDate: "2023-09-01",
    guardianName: "Muhammad Ali",
    guardianPhone: "03009876543",
    guardianRelation: "Father",
    securityStatus: "Verified",
    feeStatus: "Paid",
    scholarshipInfo: "Merit Scholarship - 50%",
    status: "Active"
  },
  {
    fullName: "Fatima Khan",
    email: "fatima.khan@email.com",
    phone: "03101234567",
    address: "456 Park Avenue, Lahore",
    dateOfBirth: "2003-08-22",
    gender: "Female",
    bloodGroup: "A+",
    nationality: "Pakistani",
    religion: "Islam",
    rollNumber: "STU002",
    studentId: "STU002",
    department: "Business Administration",
    course: "Marketing",
    semester: "2",
    admissionDate: "2024-02-15",
    guardianName: "Imran Khan",
    guardianPhone: "03108765432",
    guardianRelation: "Father",
    securityStatus: "Pending",
    feeStatus: "Pending",
    scholarshipInfo: "Need-based Scholarship - 25%",
    status: "Active"
  }
];

// Initialize sample data
const initializeSampleData = async () => {
  try {
    const count = await Student.count();
    if (count === 0) {
      await Student.bulkCreate(sampleStudents);
      console.log('✅ Sample student data initialized');
    }
  } catch (error) {
    console.error('❌ Error initializing sample data:', error);
  }
};

// Initialize on module load
initializeSampleData();

export const listStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, department, status, limit = 10, offset = 0 } = req.query;
    
    let whereClause: any = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { fullName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { rollNumber: { [Op.like]: `%${search}%` } },
          { studentId: { [Op.like]: `%${search}%` } },
        ]
      };
    }
    
    if (department) {
      whereClause.department = department;
    }
    
    if (status) {
      whereClause.status = status;
    }
    
    const students = await Student.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      students: students.rows,
      total: students.count,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      dateOfBirth,
      gender,
      bloodGroup,
      nationality,
      religion,
      rollNumber,
      department,
      course,
      semester,
      admissionDate,
      guardianName,
      guardianPhone,
      guardianRelation,
      securityStatus,
      feeStatus,
      scholarshipInfo,
      criminalActivity,
      profileImage,
      status
    } = req.body;

    // Basic validation
    if (!fullName || !phone || !rollNumber) {
      return res.status(400).json({ 
        error: 'Full name, phone, and roll number are required' 
      });
    }

    // Check for duplicate roll number
    const existingStudent = await Student.findOne({ where: { rollNumber } });
    if (existingStudent) {
      return res.status(400).json({ error: 'Roll number already exists' });
    }

    // Generate studentId if not provided
    const studentCount = await Student.count();
    const studentId = req.body.studentId || `STU${String(studentCount + 1).padStart(3, '0')}`;

    const newStudent = await Student.create({
      fullName,
      email,
      phone,
      address,
      dateOfBirth,
      gender,
      bloodGroup,
      nationality: nationality || 'Pakistani',
      religion,
      rollNumber,
      studentId,
      department,
      course,
      semester,
      admissionDate,
      guardianName,
      guardianPhone,
      guardianRelation: guardianRelation || 'Father',
      securityStatus: securityStatus || 'Pending',
      feeStatus: feeStatus || 'Pending',
      scholarshipInfo,
      criminalActivity: criminalActivity || '',
      profileImage,
      status: status || 'Active',
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check for duplicate roll number (excluding current student)
    if (req.body.rollNumber) {
      const existingStudent = await Student.findOne({ 
        where: { 
          rollNumber: req.body.rollNumber,
          id: { [Op.ne]: id }
        } 
      });
      if (existingStudent) {
        return res.status(400).json({ error: 'Roll number already exists' });
      }
    }

    await student.update(req.body);
    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalStudents = await Student.count();
    const activeStudents = await Student.count({ where: { status: 'Active' } });
    
    // Department statistics
    const departmentStats = await Student.findAll({
      attributes: ['department', [Student.sequelize?.fn('COUNT', Student.sequelize?.col('id')), 'count']],
      group: ['department'],
      where: { department: { [Op.ne]: null } }
    });
    
    // Security status statistics
    const securityStats = {
      verified: await Student.count({ where: { securityStatus: 'Verified' } }),
      pending: await Student.count({ where: { securityStatus: 'Pending' } }),
      suspended: await Student.count({ where: { securityStatus: 'Suspended' } })
    };
    
    // Fee status statistics
    const feeStats = {
      paid: await Student.count({ where: { feeStatus: 'Paid' } }),
      pending: await Student.count({ where: { feeStatus: 'Pending' } }),
      overdue: await Student.count({ where: { feeStatus: 'Overdue' } })
    };
    
    // Gender statistics
    const genderStats = await Student.findAll({
      attributes: ['gender', [Student.sequelize?.fn('COUNT', Student.sequelize?.col('id')), 'count']],
      group: ['gender'],
      where: { gender: { [Op.ne]: null } }
    });
    
    // Recent admissions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentAdmissions = await Student.count({
      where: {
        admissionDate: { [Op.gte]: thirtyDaysAgo }
      }
    });
    
    // Unique departments count
    const departments = await Student.findAll({
      attributes: [[Student.sequelize?.fn('DISTINCT', Student.sequelize?.col('department')), 'department']],
      where: { department: { [Op.ne]: null } }
    });
    
    const analytics = {
      totalStudents,
      activeStudents,
      departments: departments.length,
      departmentStats: departmentStats.reduce((acc: any, dept: any) => {
        acc[dept.dataValues.department] = parseInt(dept.dataValues.count);
        return acc;
      }, {}),
      securityStats,
      feeStats,
      genderStats: genderStats.reduce((acc: any, gender: any) => {
        acc[gender.dataValues.gender] = parseInt(gender.dataValues.count);
        return acc;
      }, {}),
      recentAdmissions
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error generating analytics:', error);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
};

export const exportStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await Student.findAll();
    
    const csvHeader = 'ID,Student ID,Name,Email,Phone,Department,Course,Semester,Guardian,Security Status,Fee Status,Status\n';
    const csvData = students.map(student => 
      `"${student.id}","${student.studentId || ''}","${student.fullName}","${student.email || ''}","${student.phone}","${student.department || ''}","${student.course || ''}","${student.semester || ''}","${student.guardianName || ''}","${student.securityStatus || ''}","${student.feeStatus || ''}","${student.status}"`
    ).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="students.csv"');
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error('Error exporting students:', error);
    res.status(500).json({ error: 'Failed to export students' });
  }
};

export const getDatabaseStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentCount = await Student.count();
    
    res.json({
      database: 'Connected',
      type: 'MySQL',
      students: studentCount,
      phpMyAdmin: process.env.PHPMYADMIN_URL || 'http://localhost/phpmyadmin',
      admin: {
        name: process.env.ADMIN_NAME || 'Syed Moazzam Ali',
        email: process.env.ADMIN_EMAIL || 'whoami00380@gmail.com',
        phone: process.env.ADMIN_PHONE || '03296228003'
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      database: 'Disconnected',
      type: 'Memory',
      error: error instanceof Error ? error.message : 'Unknown error',
      phpMyAdmin: process.env.PHPMYADMIN_URL || 'http://localhost/phpmyadmin'
    });
  }
};
