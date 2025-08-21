import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, FileText, Download, Users, BookOpen, Search, Filter, UserPlus, GraduationCap, Calendar, Phone, Mail, MapPin, Shield, AlertTriangle, Award, Clock, UserCheck, FileSpreadsheet, File, FileType, X, CheckCircle } from "lucide-react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import "./App.css";
import "./Matrix.css";

const API_URL = "http://localhost:3000/api";

const admin = {
  name: "WHOAMI",
  email: "****************",
  role: "Admin",
  phone: "00000000000",
  department: "Administration",
};

function App() {
  // Load data from localStorage or use empty arrays
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('matrix-students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  
  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem('matrix-teachers');
    return savedTeachers ? JSON.parse(savedTeachers) : [];
  });
  
  const [complaints, setComplaints] = useState(() => {
    const savedComplaints = localStorage.getItem('matrix-complaints');
    return savedComplaints ? JSON.parse(savedComplaints) : [];
  });
  
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherSearchTerm, setTeacherSearchTerm] = useState("");
  const [complaintSearchTerm, setComplaintSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterTeacherDepartment, setFilterTeacherDepartment] = useState("");
  const [filterComplaintCategory, setFilterComplaintCategory] = useState("");
  const [filterComplaintStatus, setFilterComplaintStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [noStudentsFound, setNoStudentsFound] = useState(false);
  const [noTeachersFound, setNoTeachersFound] = useState(false);
  const [noComplaintsFound, setNoComplaintsFound] = useState(false);
  const [showDocumentTemplate, setShowDocumentTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    rollNumber: "",
    department: "",
    semester: "1",
    uniYear: "1",
    criminalActivity: "",
    guardianName: "",
    guardianPhone: "",
    bloodGroup: "",
    nationality: "Pakistani",
    religion: "",
    feeStatus: "Pending",
    admissionDate: "",
    scholarshipInfo: "",
  });
  const [teacherFormData, setTeacherFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    employeeId: "",
    department: "",
    designation: "",
    qualification: "",
    experience: "",
    joiningDate: "",
    salary: "",
    subjects: "",
  });
  
  const [complaintFormData, setComplaintFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    gender: "",
    mobileNumber: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    occupation: "",
    postalAddress: "",
    city: "",
    complaintCategory: "",
    complaintDetails: "",
    againstPerson: "",
    againstDepartment: "",
    incidentDate: "",
    evidenceFiles: [],
    priority: "Medium",
    status: "Pending"
  });
  
  const [editId, setEditId] = useState(null);
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editComplaintId, setEditComplaintId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchComplaints();
    createMatrixRain();
  }, []);

  // Save students to localStorage whenever students array changes
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('matrix-students', JSON.stringify(students));
    }
  }, [students]);

  // Save teachers to localStorage whenever teachers array changes
  useEffect(() => {
    if (teachers.length > 0) {
      localStorage.setItem('matrix-teachers', JSON.stringify(teachers));
    }
  }, [teachers]);

  // Save complaints to localStorage whenever complaints array changes
  useEffect(() => {
    if (complaints.length > 0) {
      localStorage.setItem('matrix-complaints', JSON.stringify(complaints));
    }
  }, [complaints]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterDepartment]);

  useEffect(() => {
    filterTeachers();
  }, [teachers, teacherSearchTerm, filterTeacherDepartment]);

  useEffect(() => {
    filterComplaints();
  }, [complaints, complaintSearchTerm, filterComplaintCategory, filterComplaintStatus]);

  // Complaint categories based on FIA complaint system
  const complaintCategories = [
    "Academic Misconduct",
    "Financial Fraud", 
    "Harassment",
    "Discrimination",
    "Cyber Crime",
    "Corruption",
    "Abuse of Authority",
    "Unfair Treatment",
    "Safety Concerns",
    "Infrastructure Issues",
    "Administrative Issues",
    "Other"
  ];

  const complaintStatuses = [
    "Pending",
    "Under Investigation", 
    "In Progress",
    "Resolved",
    "Closed",
    "Rejected"
  ];

  const createMatrixRain = () => {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    document.body.appendChild(matrixBg);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.style.left = i * 20 + 'px';
      char.style.animationDuration = Math.random() * 3 + 2 + 's';
      char.style.animationDelay = Math.random() * 2 + 's';
      char.textContent = chars[Math.floor(Math.random() * chars.length)];
      matrixBg.appendChild(char);
    }
  };

  const filterStudents = () => {
    let filtered = students;
    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterDepartment) {
      filtered = filtered.filter(student => student.department === filterDepartment);
    }
    
    setFilteredStudents(filtered);
    setNoStudentsFound(filtered.length === 0 && (searchTerm || filterDepartment));
  };

  const filterTeachers = () => {
    let filtered = teachers;
    
    if (teacherSearchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.fullName?.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
        teacher.employeeId?.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
        teacher.department?.toLowerCase().includes(teacherSearchTerm.toLowerCase())
      );
    }
    
    if (filterTeacherDepartment) {
      filtered = filtered.filter(teacher => teacher.department === filterTeacherDepartment);
    }
    
    setFilteredTeachers(filtered);
    setNoTeachersFound(filtered.length === 0 && (teacherSearchTerm || filterTeacherDepartment));
  };

  const filterComplaints = () => {
    let filtered = complaints;
    
    if (complaintSearchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.fullName?.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
        complaint.email?.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
        complaint.complaintCategory?.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
        complaint.againstPerson?.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
        complaint.againstDepartment?.toLowerCase().includes(complaintSearchTerm.toLowerCase())
      );
    }
    
    if (filterComplaintCategory) {
      filtered = filtered.filter(complaint => complaint.complaintCategory === filterComplaintCategory);
    }
    
    if (filterComplaintStatus) {
      filtered = filtered.filter(complaint => complaint.status === filterComplaintStatus);
    }
    
    setFilteredComplaints(filtered);
    setNoComplaintsFound(filtered.length === 0 && (complaintSearchTerm || filterComplaintCategory || filterComplaintStatus));
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Since we're using localStorage for this demo, just set filtered students
      // The students are already loaded from localStorage in useState
      setFilteredStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      setLoadingTeachers(true);
      // If no teachers in localStorage, add sample data
      if (teachers.length === 0) {
        const sampleTeachers = [
          {
            id: 1,
            fullName: "Dr. Sarah Ahmed",
            email: "sarah.ahmed@university.edu",
            phone: "03001234567",
            employeeId: "EMP001",
            department: "Computer Science",
            designation: "Professor",
            qualification: "PhD Computer Science",
            experience: "15 years",
            joiningDate: "2010-08-15",
            salary: "150000",
            subjects: "Data Structures, Algorithms, Machine Learning"
          },
          {
            id: 2,
            fullName: "Prof. Muhammad Hassan",
            email: "hassan@university.edu",
            phone: "03009876543",
            employeeId: "EMP002",
            department: "Business Administration",
            designation: "Associate Professor",
            qualification: "MBA Finance",
            experience: "12 years",
            joiningDate: "2012-01-10",
            salary: "120000",
            subjects: "Finance, Marketing, Business Strategy"
          }
        ];
        setTeachers(sampleTeachers);
        setFilteredTeachers(sampleTeachers);
      } else {
        setFilteredTeachers(teachers);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      setLoadingComplaints(true);
      // If no complaints in localStorage, add sample data
      if (complaints.length === 0) {
        const sampleComplaints = [
          {
            id: 1,
            fullName: "Ali Khan",
            fatherName: "Muhammad Khan",
            cnic: "12345-6789012-3",
            gender: "Male",
            mobileNumber: "03001234567",
            email: "ali.khan@email.com",
            city: "Islamabad",
            complaintCategory: "Academic Misconduct",
            complaintDetails: "Unfair grading practices in Computer Science department",
            againstPerson: "Dr. Ahmed Ali",
            againstDepartment: "Computer Science",
            incidentDate: "2025-08-15",
            priority: "High",
            status: "Under Investigation",
            submissionDate: "2025-08-21",
            complaintId: "CMP001"
          },
          {
            id: 2,
            fullName: "Fatima Hassan",
            fatherName: "Hassan Ali",
            cnic: "54321-0987654-3",
            gender: "Female",
            mobileNumber: "03009876543",
            email: "fatima.hassan@email.com",
            city: "Karachi",
            complaintCategory: "Harassment",
            complaintDetails: "Inappropriate behavior by senior student",
            againstPerson: "John Doe",
            againstDepartment: "Business Administration",
            incidentDate: "2025-08-10",
            priority: "High",
            status: "In Progress",
            submissionDate: "2025-08-20",
            complaintId: "CMP002"
          }
        ];
        setComplaints(sampleComplaints);
        setFilteredComplaints(sampleComplaints);
      } else {
        setFilteredComplaints(complaints);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoadingComplaints(false);
    }
  };

  // Enhanced PDF Report Generation
  const generateStudentPDF = (student) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 255, 0);
    doc.text('MATRIX UNIVERSITY', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Student Report', 105, 30, { align: 'center' });
    
    // Student Info Table
    const studentData = [
      ['Field', 'Information'],
      ['Full Name', student.fullName || 'N/A'],
      ['Student ID', student.rollNumber || 'N/A'],
      ['Email', student.email || 'N/A'],
      ['Phone', student.phone || 'N/A'],
      ['Department', student.department || 'N/A'],
      ['Semester', student.semester || 'N/A'],
      ['University Year', student.uniYear || 'N/A'],
      ['Date of Birth', student.dateOfBirth || 'N/A'],
      ['Address', student.address || 'N/A'],
      ['Guardian Name', student.guardianName || 'N/A'],
      ['Guardian Phone', student.guardianPhone || 'N/A'],
      ['Blood Group', student.bloodGroup || 'N/A'],
      ['Nationality', student.nationality || 'N/A'],
      ['Religion', student.religion || 'N/A'],
      ['Fee Status', student.feeStatus || 'N/A'],
      ['Admission Date', student.admissionDate || 'N/A'],
      ['Scholarship Info', student.scholarshipInfo || 'N/A']
    ];

    doc.autoTable({
      head: [studentData[0]],
      body: studentData.slice(1),
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [240, 255, 240] }
    });

    doc.save(`Student_Report_${student.fullName}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Admin Report PDF
  const generateAdminPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 255, 0);
    doc.text('MATRIX UNIVERSITY', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Administrative Report', 105, 30, { align: 'center' });
    
    // Summary Statistics
    const stats = [
      ['Metric', 'Count'],
      ['Total Students', students.length.toString()],
      ['Total Teachers', teachers.length.toString()],
      ['Active Students', students.filter(s => s.status === 'Active').length.toString()],
      ['Departments', [...new Set(students.map(s => s.department))].length.toString()],
      ['Verified Students', students.filter(s => s.securityStatus === 'Verified').length.toString()],
      ['Pending Fees', students.filter(s => s.feeStatus === 'Pending').length.toString()]
    ];

    doc.autoTable({
      head: [stats[0]],
      body: stats.slice(1),
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] }
    });

    // Department-wise breakdown
    const deptStats = students.reduce((acc, student) => {
      acc[student.department] = (acc[student.department] || 0) + 1;
      return acc;
    }, {});

    const deptData = [
      ['Department', 'Student Count'],
      ...Object.entries(deptStats).map(([dept, count]) => [dept, count.toString()])
    ];

    doc.autoTable({
      head: [deptData[0]],
      body: deptData.slice(1),
      startY: doc.lastAutoTable.finalY + 20,
      theme: 'grid',
      headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] }
    });

    doc.save(`Admin_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Teacher Report PDF
  const generateTeacherPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 255, 0);
    doc.text('MATRIX UNIVERSITY', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Teacher Management Report', 105, 30, { align: 'center' });
    
    // Summary Statistics
    const stats = [
      ['Metric', 'Count'],
      ['Total Teachers', teachers.length.toString()],
      ['Departments', [...new Set(teachers.map(t => t.department))].length.toString()],
      ['Average Experience', (teachers.reduce((sum, t) => sum + parseInt(t.experience || 0), 0) / teachers.length || 0).toFixed(1) + ' years']
    ];
    
    doc.autoTable({
      head: [['TEACHER STATISTICS', '']],
      body: stats,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] }
    });
    
    // Teacher Details Table
    const teacherData = teachers.map(teacher => [
      teacher.fullName,
      teacher.employeeId,
      teacher.department,
      teacher.subject,
      teacher.qualification,
      teacher.experience + ' years',
      teacher.phone,
      teacher.email
    ]);
    
    doc.autoTable({
      head: [['Name', 'Employee ID', 'Department', 'Subject', 'Qualification', 'Experience', 'Phone', 'Email']],
      body: teacherData,
      startY: doc.lastAutoTable.finalY + 20,
      theme: 'grid',
      headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 255, 240] }
    });

    doc.save(`Teacher_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Excel Export Function
  const exportToExcel = (data: any[], filename: string, type: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, type);
    
    // Auto-adjust column widths
    const colWidths = [];
    const headers = Object.keys(data[0] || {});
    headers.forEach((header, i) => {
      const maxLength = Math.max(
        header.length,
        ...data.map(row => (row[header] || '').toString().length)
      );
      colWidths[i] = { wch: Math.min(maxLength + 2, 50) };
    });
    ws['!cols'] = colWidths;
    
    XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Document Templates
  const documentTemplates = [
    {
      id: 'student_id_card',
      name: 'Student ID Card',
      description: 'Official student identification card'
    },
    {
      id: 'enrollment_certificate',
      name: 'Enrollment Certificate',
      description: 'Certificate of student enrollment'
    },
    {
      id: 'transcript',
      name: 'Academic Transcript',
      description: 'Official academic record'
    },
    {
      id: 'fee_receipt',
      name: 'Fee Receipt',
      description: 'Payment receipt document'
    },
    {
      id: 'character_certificate',
      name: 'Character Certificate',
      description: 'Certificate of good conduct'
    },
    {
      id: 'completion_certificate',
      name: 'Course Completion Certificate',
      description: 'Certificate of course completion'
    }
  ];

  const generateTemplate = (templateId, studentData) => {
    const doc = new jsPDF();
    
    switch (templateId) {
      case 'student_id_card':
        // Student ID Card Layout
        doc.setFontSize(16);
        doc.setTextColor(0, 255, 0);
        doc.text('MATRIX UNIVERSITY', 105, 30, { align: 'center' });
        doc.setFontSize(14);
        doc.text('STUDENT IDENTITY CARD', 105, 40, { align: 'center' });
        
        // Student Details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Name: ${studentData.fullName}`, 20, 60);
        doc.text(`Student ID: ${studentData.rollNumber}`, 20, 75);
        doc.text(`Department: ${studentData.department}`, 20, 90);
        doc.text(`Semester: ${studentData.semester}`, 20, 105);
        doc.text(`Year: ${studentData.uniYear}`, 20, 120);
        
        doc.save(`Student_ID_Card_${studentData.fullName}.pdf`);
        break;
        
      case 'enrollment_certificate':
        // Enrollment Certificate
        doc.setFontSize(18);
        doc.setTextColor(0, 255, 0);
        doc.text('ENROLLMENT CERTIFICATE', 105, 40, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`This is to certify that ${studentData.fullName} bearing`, 20, 80);
        doc.text(`Student ID ${studentData.rollNumber} is enrolled in`, 20, 95);
        doc.text(`${studentData.department} department for the academic`, 20, 110);
        doc.text(`year ${new Date().getFullYear()}-${new Date().getFullYear() + 1}.`, 20, 125);
        
        doc.save(`Enrollment_Certificate_${studentData.fullName}.pdf`);
        break;
        
      default:
        // Generic template
        doc.setFontSize(16);
        doc.text('Document Template', 105, 40, { align: 'center' });
        doc.save(`Document_${studentData.fullName}.pdf`);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeacherInputChange = (e) => {
    setTeacherFormData({ ...teacherFormData, [e.target.name]: e.target.value });
  };

  const handleComplaintInputChange = (e) => {
    setComplaintFormData({ ...complaintFormData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      rollNumber: "",
      department: "",
      semester: "",
      uniYear: "",
      criminalActivity: "",
      guardianName: "",
      guardianPhone: "",
      bloodGroup: "",
      nationality: "",
      religion: "",
      feeStatus: "Pending",
      admissionDate: "",
      scholarshipInfo: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing student
        const updatedStudents = students.map(student => 
          student.id === editId ? { ...formData, id: editId } : student
        );
        setStudents(updatedStudents);
      } else {
        // Add new student
        const newStudent = {
          ...formData,
          id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
          rollNumber: formData.rollNumber || `STU${String(students.length + 1).padStart(3, '0')}`
        };
        setStudents([...students, newStudent]);
      }
      setShowForm(false);
      setEditId(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        rollNumber: "",
        department: "",
        semester: "",
        uniYear: "",
        criminalActivity: "",
        guardianName: "",
        guardianPhone: "",
        bloodGroup: "",
        nationality: "",
        religion: "",
        feeStatus: "Pending",
        admissionDate: "",
        scholarshipInfo: "",
      });
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      // Always close the form even if there's an error
      setShowForm(false);
      setEditId(null);
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setFormData(student);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Teacher CRUD Operations
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTeacherId) {
        // Update existing teacher
        const updatedTeachers = teachers.map(teacher => 
          teacher.id === editTeacherId ? { ...teacherFormData, id: editTeacherId } : teacher
        );
        setTeachers(updatedTeachers);
      } else {
        // Add new teacher
        const newTeacher = {
          ...teacherFormData,
          id: teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1,
          employeeId: teacherFormData.employeeId || `EMP${String(teachers.length + 1).padStart(3, '0')}`
        };
        setTeachers([...teachers, newTeacher]);
      }
      setShowTeacherForm(false);
      setEditTeacherId(null);
      setTeacherFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        employeeId: "",
        department: "",
        designation: "",
        qualification: "",
        experience: "",
        joiningDate: "",
        salary: "",
        subjects: "",
      });
    } catch (error) {
      console.error("Error saving teacher:", error);
    } finally {
      // Always close the form even if there's an error
      setShowTeacherForm(false);
      setEditTeacherId(null);
    }
  };

  const handleTeacherEdit = (teacher) => {
    setEditTeacherId(teacher.id);
    setTeacherFormData(teacher);
    setShowTeacherForm(true);
  };

  const handleTeacherDelete = async (id) => {
    try {
      // For demo purposes, remove from local state
      const updatedTeachers = teachers.filter(t => t.id !== id);
      setTeachers(updatedTeachers);
      setFilteredTeachers(updatedTeachers);
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Complaint CRUD Operations
  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editComplaintId) {
        // Update existing complaint
        const updatedComplaints = complaints.map(complaint => 
          complaint.id === editComplaintId ? { ...complaintFormData, id: editComplaintId } : complaint
        );
        setComplaints(updatedComplaints);
      } else {
        // Add new complaint
        const newComplaint = {
          ...complaintFormData,
          id: complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1,
          complaintId: complaintFormData.complaintId || `CMP${String(complaints.length + 1).padStart(3, '0')}`,
          submissionDate: new Date().toISOString().split('T')[0],
          status: complaintFormData.status || "Pending"
        };
        setComplaints([...complaints, newComplaint]);
      }
      setShowComplaintForm(false);
      setEditComplaintId(null);
      setComplaintFormData({
        fullName: "",
        fatherName: "",
        cnic: "",
        gender: "",
        mobileNumber: "",
        phoneNumber: "",
        whatsappNumber: "",
        email: "",
        occupation: "",
        postalAddress: "",
        city: "",
        complaintCategory: "",
        complaintDetails: "",
        againstPerson: "",
        againstDepartment: "",
        incidentDate: "",
        evidenceFiles: [],
        priority: "Medium",
        status: "Pending"
      });
    } catch (error) {
      console.error("Error saving complaint:", error);
    } finally {
      setShowComplaintForm(false);
      setEditComplaintId(null);
    }
  };

  const handleComplaintEdit = (complaint) => {
    setEditComplaintId(complaint.id);
    setComplaintFormData(complaint);
    setShowComplaintForm(true);
  };

  const handleComplaintDelete = async (id) => {
    try {
      const updatedComplaints = complaints.filter(c => c.id !== id);
      setComplaints(updatedComplaints);
      setFilteredComplaints(updatedComplaints);
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const handleComplaintStatusUpdate = async (id, newStatus) => {
    try {
      const updatedComplaints = complaints.map(complaint => 
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      );
      setComplaints(updatedComplaints);
      setFilteredComplaints(updatedComplaints.filter(c => 
        filteredComplaints.some(fc => fc.id === c.id)
      ));
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  // Document Generation Functions
  const generateStudentReport = async () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('Student Management System Report', 20, 30);
    
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    pdf.text(`Total Students: ${students.length}`, 20, 55);
    
    // Student List
    let yPosition = 75;
    pdf.setFontSize(14);
    pdf.text('Student List:', 20, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(10);
    students.forEach((student, index) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(`${index + 1}. ${student.fullName}`, 20, yPosition);
      pdf.text(`Email: ${student.email}`, 30, yPosition + 7);
      pdf.text(`Department: ${student.department}`, 30, yPosition + 14);
      pdf.text(`Semester: ${student.semester}`, 30, yPosition + 21);
      if (student.criminalActivity) {
        pdf.text(`Criminal Activity: ${student.criminalActivity}`, 30, yPosition + 28);
        yPosition += 35;
      } else {
        yPosition += 28;
      }
      yPosition += 10;
    });
    
    pdf.save('student-report.pdf');
  };

  const generateAdminReport = async () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text('Admin Details Report', 20, 30);
    
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);
    
    pdf.setFontSize(14);
    pdf.text('Administrator Information:', 20, 75);
    
    pdf.setFontSize(12);
    pdf.text(`Name: ${admin.name}`, 30, 95);
    pdf.text(`Email: ${admin.email}`, 30, 105);
    pdf.text(`Role: ${admin.role}`, 30, 115);
    pdf.text(`Phone: ${admin.phone}`, 30, 125);
    pdf.text(`Department: ${admin.department}`, 30, 135);
    
    pdf.text('System Statistics:', 20, 160);
    pdf.text(`Total Students: ${students.length}`, 30, 175);
    pdf.text(`Active Students: ${students.filter(s => s.status !== 'Inactive').length}`, 30, 185);
    
    pdf.save('admin-report.pdf');
  };

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="stats-card text-center p-6 rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold glow-green terminal-text">TOTAL STUDENTS</h3>
              <p className="text-4xl font-bold glow-green">{students.length}</p>
            </div>
            <Users size={48} className="glow-green" />
          </div>
        </motion.div>
        
        <motion.div 
          className="stats-card text-center p-6 rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold glow-green terminal-text">TOTAL TEACHERS</h3>
              <p className="text-4xl font-bold glow-green">{teachers.length}</p>
            </div>
            <UserCheck size={48} className="glow-green" />
          </div>
        </motion.div>
        
        <motion.div 
          className="stats-card text-center p-6 rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold glow-green terminal-text">TOTAL COMPLAINTS</h3>
              <p className="text-4xl font-bold glow-green">{complaints.length}</p>
            </div>
            <AlertTriangle size={48} className="glow-green" />
          </div>
        </motion.div>
        
        <motion.div 
          className="stats-card text-center p-6 rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold glow-green terminal-text">PENDING COMPLAINTS</h3>
              <p className="text-4xl font-bold glow-green">{complaints.filter(c => c.status === 'Pending').length}</p>
            </div>
            <Clock size={48} className="glow-green" />
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="matrix-card rounded-lg p-6 mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 glow-green terminal-text text-center">ADMIN CONTROL PANEL</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="matrix-card p-4 rounded">
            <div className="flex items-center gap-4 mb-4">
              <Users size={32} className="glow-green" />
              <h3 className="text-xl font-semibold glow-green">ADMINISTRATOR</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">NAME:</span> {admin.name}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="glow-green" />
                <span className="font-semibold">EMAIL:</span> {admin.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="glow-green" />
                <span className="font-semibold">PHONE:</span> {admin.phone}
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="glow-green" />
                <span className="font-semibold">ROLE:</span> {admin.role}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="glow-green" />
                <span className="font-semibold">DEPARTMENT:</span> {admin.department}
              </div>
            </div>
          </div>
          
          <div className="matrix-card p-4 rounded">
            <div className="flex items-center gap-4 mb-4">
              <Shield size={32} className="glow-green" />
              <h3 className="text-xl font-semibold glow-green">SYSTEM STATUS</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>Security:</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>Last Backup:</span>
                <span className="text-green-400">2 HOURS AGO</span>
              </div>
              <div className="flex justify-between">
                <span>Uptime:</span>
                <span className="text-green-400">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderStudentManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold glow-green terminal-text">STUDENT DATABASE</h2>
        <button
          className="matrix-button px-6 py-3 rounded terminal-text flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <UserPlus size={20} />
          REGISTER STUDENT
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="matrix-card rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 glow-green" />
            <input
              type="text"
              placeholder="SEARCH STUDENTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="matrix-input rounded px-4 py-3 pl-12 w-full"
            />
          </div>
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-3 glow-green" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="matrix-input rounded px-4 py-3 pl-12 w-full"
            >
              <option value="">ALL DEPARTMENTS</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <div className="text-center">
            <span className="glow-green terminal-text">
              TOTAL RECORDS: {filteredStudents.length}
            </span>
          </div>
        </div>
      </div>
      
      <div className="matrix-table rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">STUDENT ID</th>
              <th className="px-4 py-3 text-left">FULL NAME</th>
              <th className="px-4 py-3 text-left">EMAIL</th>
              <th className="px-4 py-3 text-left">DEPARTMENT</th>
              <th className="px-4 py-3 text-left">SEMESTER</th>
              <th className="px-4 py-3 text-left">STATUS</th>
              <th className="px-4 py-3 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <div className="matrix-loading mx-auto"></div>
                  <p className="mt-2 glow-green">LOADING DATA...</p>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 glow-green">
                  {searchTerm || filterDepartment || filterSemester ? 
                    "NO MATCHING STUDENTS FOUND. TRY DIFFERENT SEARCH CRITERIA." :
                    "NO STUDENTS FOUND. REGISTER NEW STUDENTS TO BEGIN."
                  }
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <motion.tr
                  key={student.id || student.rollNumber}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-green-900 hover:bg-opacity-20"
                >
                  <td className="px-4 py-3 terminal-text">{student.rollNumber}</td>
                  <td className="px-4 py-3">{student.fullName}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.department}</td>
                  <td className="px-4 py-3">{student.semester}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      student.criminalActivity ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                    }`}>
                      {student.criminalActivity ? 'FLAGGED' : 'CLEAR'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      className="text-blue-400 hover:text-blue-300 transition"
                      title="View Details"
                      onClick={() => alert(JSON.stringify(student, null, 2))}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="text-green-400 hover:text-green-300 transition"
                      title="Edit Student"
                      onClick={() => handleEdit(student)}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300 transition"
                      title="Delete Student"
                      onClick={() => handleDelete(student.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderDocumentGeneration = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Document Generation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg border"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <FileText size={48} className="mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Student Report</h3>
            <p className="text-gray-600 mb-4">Generate a comprehensive PDF report of all students</p>
            <button
              onClick={generateStudentReport}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              <Download size={16} />
              Generate PDF
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg border"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <Users size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Admin Report</h3>
            <p className="text-gray-600 mb-4">Generate admin details and system statistics</p>
            <button
              onClick={generateAdminReport}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2 mx-auto"
            >
              <Download size={16} />
              Generate PDF
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg border"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Export to CSV</h3>
            <p className="text-gray-600 mb-4">Export student data to Excel/CSV format</p>
            <button
              onClick={exportToExcel}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center gap-2 mx-auto"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-8 bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4">Document Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h4 className="font-semibold">Student ID Card Template</h4>
            <p className="text-sm text-gray-600">Generate student ID cards with photos and details</p>
            <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm">
              Coming Soon
            </button>
          </div>
          <div className="border p-4 rounded">
            <h4 className="font-semibold">Transcript Template</h4>
            <p className="text-sm text-gray-600">Generate official transcripts for students</p>
            <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm">
              Coming Soon
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderEnhancedForm = () => (
    <motion.div
      className="fixed inset-0 matrix-modal flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        className="matrix-form rounded-lg p-8 w-full max-w-4xl max-h-90vh overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 glow-green terminal-text text-center">
          {editId ? "MODIFY STUDENT DATA" : "REGISTER NEW STUDENT"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="fullName"
            placeholder="FULL NAME"
            value={formData.fullName}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3 terminal-text"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL ADDRESS"
            value={formData.email}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="PHONE NUMBER"
            value={formData.phone}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3"
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="ROLL NUMBER"
            value={formData.rollNumber}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3 terminal-text"
            required
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3"
            required
          >
            <option value="">SELECT DEPARTMENT</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3"
            required
          >
            <option value="">SELECT SEMESTER</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="3rd">3rd Semester</option>
            <option value="4th">4th Semester</option>
            <option value="5th">5th Semester</option>
            <option value="6th">6th Semester</option>
            <option value="7th">7th Semester</option>
            <option value="8th">8th Semester</option>
          </select>
          <select
            name="uniYear"
            value={formData.uniYear}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3"
            required
          >
            <option value="">SELECT UNIVERSITY YEAR</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <textarea
            name="address"
            placeholder="COMPLETE ADDRESS"
            value={formData.address}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3 col-span-3"
            rows="2"
            required
          />
          <textarea
            name="criminalActivity"
            placeholder="CRIMINAL ACTIVITY RECORDS (IF ANY)"
            value={formData.criminalActivity}
            onChange={handleInputChange}
            className="matrix-input rounded px-4 py-3 col-span-3"
            rows="2"
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="matrix-button px-6 py-3 rounded terminal-text"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              resetForm();
            }}
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="matrix-button px-6 py-3 rounded terminal-text"
          >
            {editId ? "UPDATE" : "REGISTER"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 glow-green terminal-text">SYSTEM ANALYTICS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div className="stats-card text-center p-6 rounded-lg" whileHover={{ scale: 1.05 }}>
          <Shield size={48} className="mx-auto mb-3 glow-green" />
          <h3 className="text-xl font-bold glow-green">SECURITY ALERTS</h3>
          <p className="text-3xl font-bold mt-2">{students.filter(s => s.criminalActivity).length}</p>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderTeacherManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 glow-green terminal-text">TEACHER MANAGEMENT SYSTEM</h2>
      
      {/* Teacher Form */}
      {showTeacherForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-gray-900 border border-green-500 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 glow-green">
              {editTeacherId ? "EDIT TEACHER DATA" : "REGISTER NEW TEACHER"}
            </h3>
            <form onSubmit={handleTeacherSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="FULL NAME"
                value={teacherFormData.fullName}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                value={teacherFormData.email}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="PHONE NUMBER"
                value={teacherFormData.phone}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="text"
                name="department"
                placeholder="DEPARTMENT"
                value={teacherFormData.department}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="SUBJECT/COURSE"
                value={teacherFormData.subject}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="text"
                name="qualification"
                placeholder="QUALIFICATION"
                value={teacherFormData.qualification}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="number"
                name="experience"
                placeholder="EXPERIENCE (YEARS)"
                value={teacherFormData.experience}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="text"
                name="employeeId"
                placeholder="EMPLOYEE ID"
                value={teacherFormData.employeeId}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <input
                type="date"
                name="joiningDate"
                value={teacherFormData.joiningDate}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3"
                required
              />
              <textarea
                name="address"
                placeholder="COMPLETE ADDRESS"
                value={teacherFormData.address}
                onChange={handleTeacherInputChange}
                className="matrix-input rounded px-4 py-3 col-span-3"
                required
              />
              <div className="col-span-3 flex gap-4 justify-end">
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowTeacherForm(false);
                    setEditTeacherId(null);
                    setTeacherFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      department: "",
                      subject: "",
                      qualification: "",
                      experience: "",
                      employeeId: "",
                      joiningDate: "",
                      address: "",
                    });
                  }}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  CANCEL
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {editTeacherId ? "UPDATE TEACHER" : "ADD TEACHER"}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Teacher Actions */}
      <div className="flex justify-between items-center mb-6">
        <motion.button
          onClick={() => setShowTeacherForm(true)}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserPlus size={20} />
          ADD NEW TEACHER
        </motion.button>
        <div className="flex gap-4">
          <motion.button
            onClick={() => exportToExcel(teachers, "Teachers_Report", "Teachers")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <FileSpreadsheet size={16} />
            EXPORT EXCEL
          </motion.button>
          <motion.button
            onClick={() => generateTeacherPDF()}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <File size={16} />
            GENERATE PDF
          </motion.button>
        </div>
      </div>

      {/* Teacher Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-green-400" size={20} />
          <input
            type="text"
            placeholder="SEARCH TEACHERS..."
            value={teacherSearchTerm}
            onChange={(e) => setTeacherSearchTerm(e.target.value)}
            className="matrix-input rounded px-4 py-3 pl-12 w-full"
          />
        </div>
        <select
          value={filterTeacherDepartment}
          onChange={(e) => setFilterTeacherDepartment(e.target.value)}
          className="matrix-input rounded px-4 py-3"
        >
          <option value="">ALL DEPARTMENTS</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Teacher Table */}
      <div className="matrix-border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-900">
              <th className="px-4 py-3 font-bold">TEACHER NAME</th>
              <th className="px-4 py-3 font-bold">EMPLOYEE ID</th>
              <th className="px-4 py-3 font-bold">DEPARTMENT</th>
              <th className="px-4 py-3 font-bold">SUBJECT</th>
              <th className="px-4 py-3 font-bold">EXPERIENCE</th>
              <th className="px-4 py-3 font-bold">CONTACT</th>
              <th className="px-4 py-3 font-bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loadingTeachers ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <div className="matrix-loading mx-auto"></div>
                  <p className="mt-2 glow-green">LOADING TEACHERS...</p>
                </td>
              </tr>
            ) : filteredTeachers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 glow-green">
                  {teacherSearchTerm || filterTeacherDepartment ? 
                    "NO MATCHING TEACHERS FOUND. TRY DIFFERENT SEARCH CRITERIA." :
                    "NO TEACHERS FOUND. ADD NEW TEACHERS TO BEGIN."
                  }
                </td>
              </tr>
            ) : (
              filteredTeachers.map((teacher) => (
                <motion.tr
                  key={teacher.id || teacher.employeeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-green-800 hover:bg-green-900 hover:bg-opacity-20 transition-colors"
                >
                  <td className="px-4 py-3">{teacher.fullName}</td>
                  <td className="px-4 py-3">{teacher.employeeId}</td>
                  <td className="px-4 py-3">{teacher.department}</td>
                  <td className="px-4 py-3">{teacher.subject}</td>
                  <td className="px-4 py-3">{teacher.experience} years</td>
                  <td className="px-4 py-3">
                    <div>{teacher.phone}</div>
                    <div className="text-sm opacity-70">{teacher.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleTeacherEdit(teacher)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleTeacherDelete(teacher.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderComplaintManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 glow-green terminal-text">COMPLAINT MANAGEMENT SYSTEM</h2>
      
      {/* Complaint Form Modal */}
      {showComplaintForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            className="matrix-form rounded-lg p-6 w-full max-w-4xl max-h-90vh overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4 glow-green terminal-text text-center">
              {editComplaintId ? "UPDATE COMPLAINT" : "REGISTER NEW COMPLAINT"}
            </h3>
            
            <form onSubmit={handleComplaintSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div className="col-span-2">
                <h4 className="text-lg font-semibold mb-3 text-green-300">Personal Information</h4>
              </div>
              
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={complaintFormData.fullName}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="text"
                name="fatherName"
                placeholder="Father Name"
                value={complaintFormData.fatherName}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="text"
                name="cnic"
                placeholder="CNIC (12345-6789012-3)"
                value={complaintFormData.cnic}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <select
                name="gender"
                value={complaintFormData.gender}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={complaintFormData.mobileNumber}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number (Optional)"
                value={complaintFormData.phoneNumber}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="tel"
                name="whatsappNumber"
                placeholder="WhatsApp Number (Optional)"
                value={complaintFormData.whatsappNumber}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={complaintFormData.email}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="text"
                name="occupation"
                placeholder="Occupation (Optional)"
                value={complaintFormData.occupation}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="text"
                name="city"
                placeholder="City"
                value={complaintFormData.city}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <textarea
                name="postalAddress"
                placeholder="Postal Address (Optional)"
                value={complaintFormData.postalAddress}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3 col-span-2"
                rows="2"
              />
              
              {/* Complaint Details */}
              <div className="col-span-2 mt-4">
                <h4 className="text-lg font-semibold mb-3 text-green-300">Complaint Details</h4>
              </div>
              
              <select
                name="complaintCategory"
                value={complaintFormData.complaintCategory}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              >
                <option value="">Select Complaint Category</option>
                {complaintCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                name="priority"
                value={complaintFormData.priority}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent</option>
              </select>
              
              <input
                type="text"
                name="againstPerson"
                placeholder="Against Person (Optional)"
                value={complaintFormData.againstPerson}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="text"
                name="againstDepartment"
                placeholder="Against Department (Optional)"
                value={complaintFormData.againstDepartment}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <input
                type="date"
                name="incidentDate"
                placeholder="Incident Date"
                value={complaintFormData.incidentDate}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
              />
              
              <select
                name="status"
                value={complaintFormData.status}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3"
                disabled={!editComplaintId}
              >
                {complaintStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <textarea
                name="complaintDetails"
                placeholder="Detailed description of the complaint"
                value={complaintFormData.complaintDetails}
                onChange={handleComplaintInputChange}
                className="matrix-input rounded px-4 py-3 col-span-2"
                rows="4"
              />
              
              {/* Form Actions */}
              <div className="col-span-2 flex justify-end gap-4 mt-6">
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowComplaintForm(false);
                    setEditComplaintId(null);
                    setComplaintFormData({
                      fullName: "",
                      fatherName: "",
                      cnic: "",
                      gender: "",
                      mobileNumber: "",
                      phoneNumber: "",
                      whatsappNumber: "",
                      email: "",
                      occupation: "",
                      postalAddress: "",
                      city: "",
                      complaintCategory: "",
                      complaintDetails: "",
                      againstPerson: "",
                      againstDepartment: "",
                      incidentDate: "",
                      evidenceFiles: [],
                      priority: "Medium",
                      status: "Pending"
                    });
                  }}
                  className="matrix-button-secondary px-6 py-3 rounded transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <X className="inline mr-2" size={16} />
                  CANCEL
                </motion.button>
                <motion.button
                  type="submit"
                  className="matrix-button px-6 py-3 rounded transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="inline mr-2" size={16} />
                  {editComplaintId ? "UPDATE COMPLAINT" : "SUBMIT COMPLAINT"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Complaint Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <motion.button
            onClick={() => setShowComplaintForm(true)}
            className="matrix-button px-6 py-3 rounded terminal-text flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle size={20} />
            FILE COMPLAINT
          </motion.button>
          <motion.button
            onClick={() => {
              const complaintData = filteredComplaints.map(complaint => ({
                'Complaint ID': complaint.complaintId || complaint.id,
                'Full Name': complaint.fullName,
                'Category': complaint.complaintCategory,
                'Status': complaint.status,
                'Priority': complaint.priority,
                'Submission Date': complaint.submissionDate,
                'Against Person': complaint.againstPerson,
                'Against Department': complaint.againstDepartment,
                'City': complaint.city,
                'Mobile': complaint.mobileNumber,
                'Email': complaint.email
              }));
              exportToExcel(complaintData, 'Complaints_Report', 'Complaints');
            }}
            className="matrix-button-secondary px-6 py-3 rounded terminal-text flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <FileSpreadsheet size={20} />
            EXPORT TO EXCEL
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search complaints..."
          value={complaintSearchTerm}
          onChange={(e) => setComplaintSearchTerm(e.target.value)}
          className="matrix-input rounded px-4 py-3"
        />
        
        <select
          value={filterComplaintCategory}
          onChange={(e) => setFilterComplaintCategory(e.target.value)}
          className="matrix-input rounded px-4 py-3"
        >
          <option value="">ALL CATEGORIES</option>
          {complaintCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select
          value={filterComplaintStatus}
          onChange={(e) => setFilterComplaintStatus(e.target.value)}
          className="matrix-input rounded px-4 py-3"
        >
          <option value="">ALL STATUSES</option>
          {complaintStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        <motion.button
          onClick={() => {
            setComplaintSearchTerm("");
            setFilterComplaintCategory("");
            setFilterComplaintStatus("");
          }}
          className="matrix-button-secondary px-4 py-3 rounded terminal-text"
          whileHover={{ scale: 1.05 }}
        >
          <Filter size={16} className="inline mr-2" />
          CLEAR FILTERS
        </motion.button>
      </div>

      {/* Complaints Table */}
      <div className="matrix-border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-900">
              <th className="px-4 py-3 font-bold">ID</th>
              <th className="px-4 py-3 font-bold">COMPLAINANT</th>
              <th className="px-4 py-3 font-bold">CATEGORY</th>
              <th className="px-4 py-3 font-bold">PRIORITY</th>
              <th className="px-4 py-3 font-bold">STATUS</th>
              <th className="px-4 py-3 font-bold">AGAINST</th>
              <th className="px-4 py-3 font-bold">DATE</th>
              <th className="px-4 py-3 font-bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loadingComplaints ? (
              <tr>
                <td colSpan="8" className="text-center py-8">
                  <div className="matrix-loading mx-auto"></div>
                  <p className="mt-2 glow-green">LOADING COMPLAINTS...</p>
                </td>
              </tr>
            ) : filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 glow-green">
                  {complaintSearchTerm || filterComplaintCategory || filterComplaintStatus ? 
                    "NO MATCHING COMPLAINTS FOUND. TRY DIFFERENT SEARCH CRITERIA." :
                    "NO COMPLAINTS FOUND. FILE NEW COMPLAINTS TO BEGIN."
                  }
                </td>
              </tr>
            ) : (
              filteredComplaints.map((complaint) => (
                <motion.tr
                  key={complaint.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-green-800 hover:bg-green-900 hover:bg-opacity-20 transition-colors"
                >
                  <td className="px-4 py-3">{complaint.complaintId || complaint.id}</td>
                  <td className="px-4 py-3">
                    <div>{complaint.fullName}</div>
                    <div className="text-sm opacity-70">{complaint.email}</div>
                  </td>
                  <td className="px-4 py-3">{complaint.complaintCategory}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      complaint.priority === 'Urgent' ? 'bg-red-600 text-white' :
                      complaint.priority === 'High' ? 'bg-orange-600 text-white' :
                      complaint.priority === 'Medium' ? 'bg-yellow-600 text-black' :
                      'bg-green-600 text-white'
                    }`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleComplaintStatusUpdate(complaint.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-bold border-0 ${
                        complaint.status === 'Resolved' ? 'bg-green-600 text-white' :
                        complaint.status === 'In Progress' ? 'bg-blue-600 text-white' :
                        complaint.status === 'Under Investigation' ? 'bg-purple-600 text-white' :
                        complaint.status === 'Rejected' ? 'bg-red-600 text-white' :
                        complaint.status === 'Closed' ? 'bg-gray-600 text-white' :
                        'bg-yellow-600 text-black'
                      }`}
                    >
                      {complaintStatuses.map(status => (
                        <option key={status} value={status} className="bg-black text-green-400">
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {complaint.againstPerson && <div>{complaint.againstPerson}</div>}
                    {complaint.againstDepartment && <div className="text-sm opacity-70">{complaint.againstDepartment}</div>}
                  </td>
                  <td className="px-4 py-3">{complaint.submissionDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleComplaintEdit(complaint)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        title="Edit Complaint"
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          // Generate individual complaint PDF
                          const doc = new jsPDF();
                          doc.setFontSize(20);
                          doc.setTextColor(0, 255, 0);
                          doc.text('COMPLAINT REPORT', 105, 20, { align: 'center' });
                          doc.setFontSize(12);
                          doc.setTextColor(0, 0, 0);
                          doc.text(`Complaint ID: ${complaint.complaintId || complaint.id}`, 20, 40);
                          doc.text(`Complainant: ${complaint.fullName}`, 20, 50);
                          doc.text(`Category: ${complaint.complaintCategory}`, 20, 60);
                          doc.text(`Status: ${complaint.status}`, 20, 70);
                          doc.text(`Priority: ${complaint.priority}`, 20, 80);
                          doc.text(`Details: ${complaint.complaintDetails}`, 20, 90);
                          doc.save(`Complaint_${complaint.complaintId || complaint.id}.pdf`);
                        }}
                        className="text-green-400 hover:text-green-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        title="Download PDF"
                      >
                        <FileText size={16} />
                      </motion.button>
                      <motion.button
                        onClick={() => handleComplaintDelete(complaint.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        title="Delete Complaint"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="min-h-screen bg-black text-green-400 p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ fontFamily: 'Orbitron, monospace' }}
    >
      <motion.h1
        className="text-5xl font-bold text-center mb-8 glow-green terminal-text glitch"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        STUDENT MANAGEMENT MATRIX
      </motion.h1>
      
      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="matrix-nav rounded-lg p-2 flex gap-2">
          <button
            className={`matrix-tab px-6 py-2 rounded-md transition ${
              activeTab === "dashboard" 
                ? "active" 
                : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Users className="inline mr-2" size={16} />
            DASHBOARD
          </button>
          <button
            className={`matrix-tab px-6 py-2 rounded-md transition ${
              activeTab === "students" 
                ? "active" 
                : ""
            }`}
            onClick={() => setActiveTab("students")}
          >
            <GraduationCap className="inline mr-2" size={16} />
            STUDENTS
          </button>
          <button
            className={`matrix-tab px-6 py-2 rounded-md transition ${
              activeTab === "teachers" 
                ? "active" 
                : ""
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            <UserCheck className="inline mr-2" size={16} />
            TEACHERS
          </button>
          <button
            className={`matrix-tab px-6 py-2 rounded-md transition ${
              activeTab === "complaints" 
                ? "active" 
                : ""
            }`}
            onClick={() => setActiveTab("complaints")}
          >
            <AlertTriangle className="inline mr-2" size={16} />
            COMPLAINTS
          </button>
          <button
            className={`matrix-tab px-6 py-2 rounded-md transition ${
              activeTab === "documents" 
                ? "active" 
                : ""
            }`}
            onClick={() => setActiveTab("documents")}
          >
            <FileText className="inline mr-2" size={16} />
            DOCUMENTS
          </button>
          <button
            className={`matrix-tab px-6 py-2 rounded-md transition ${
              activeTab === "analytics" 
                ? "active" 
                : ""
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <Award className="inline mr-2" size={16} />
            ANALYTICS
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "students" && renderStudentManagement()}
      {activeTab === "teachers" && renderTeacherManagement()}
      {activeTab === "complaints" && renderComplaintManagement()}
      {activeTab === "documents" && renderDocumentGeneration()}
      {activeTab === "analytics" && renderAnalytics()}

      {/* Enhanced Modal Form */}
      {showForm && renderEnhancedForm()}
    </motion.div>
  );
}

export default App;
