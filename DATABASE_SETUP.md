# MySQL/phpMyAdmin Setup Guide for Student Management System

## 🗄️ Database Configuration

### Prerequisites
1. **Install XAMPP** (includes Apache, MySQL, phpMyAdmin)
   - Download from: https://www.apachefriends.org/
   - Default installation location: `C:\xampp`

2. **Start Services**
   - Open XAMPP Control Panel
   - Start **Apache** service
   - Start **MySQL** service

### 📊 phpMyAdmin Access
- **URL**: http://localhost/phpmyadmin
- **Username**: root
- **Password**: (leave empty by default)

### 🎯 Database Setup

#### Automatic Setup (Recommended)
The application will automatically:
1. Connect to MySQL
2. Create database: `student_management`
3. Create tables with proper structure
4. Initialize sample data

#### Manual Setup (Alternative)
If you prefer manual setup:

1. **Access phpMyAdmin**: http://localhost/phpmyadmin
2. **Create Database**:
   ```sql
   CREATE DATABASE student_management;
   ```

3. **Use Database**:
   ```sql
   USE student_management;
   ```

4. **Students Table** (Auto-created by application):
   ```sql
   CREATE TABLE students (
     id INT AUTO_INCREMENT PRIMARY KEY,
     fullName VARCHAR(100) NOT NULL,
     email VARCHAR(100),
     phone VARCHAR(20) NOT NULL,
     address TEXT NOT NULL,
     dateOfBirth DATE,
     gender ENUM('Male', 'Female', 'Other'),
     bloodGroup VARCHAR(5),
     nationality VARCHAR(50) DEFAULT 'Pakistani',
     religion VARCHAR(30),
     rollNumber VARCHAR(20) UNIQUE NOT NULL,
     studentId VARCHAR(20) UNIQUE,
     department VARCHAR(100),
     course VARCHAR(100),
     semester VARCHAR(10),
     admissionDate DATE,
     guardianName VARCHAR(100),
     guardianPhone VARCHAR(20),
     guardianRelation VARCHAR(30) DEFAULT 'Father',
     securityStatus ENUM('Verified', 'Pending', 'Suspended') DEFAULT 'Pending',
     feeStatus ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
     scholarshipInfo VARCHAR(200),
     criminalActivity TEXT,
     profileImage TEXT,
     status ENUM('Active', 'Inactive', 'Suspended', 'Graduated', 'Dropped') DEFAULT 'Active',
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     deletedAt TIMESTAMP NULL
   );
   ```

### 🔧 Environment Configuration

Update `.env` file with your MySQL credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=student_management
DB_USER=root
DB_PASS=

# Admin Details
ADMIN_NAME=Syed Moazzam Ali
ADMIN_EMAIL=whoami00380@gmail.com
ADMIN_PHONE=03296228003

# phpMyAdmin URL
PHPMYADMIN_URL=http://localhost/phpmyadmin
```

### 🚀 Start the Application

1. **Start Backend**:
   ```bash
   cd "backend"
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd "frontend"
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - Database: http://localhost/phpmyadmin

### 📋 Database Management via phpMyAdmin

#### View Students
1. Go to http://localhost/phpmyadmin
2. Select `student_management` database
3. Click on `students` table
4. Browse data, run queries, export data

#### Common Queries
```sql
-- View all active students
SELECT * FROM students WHERE status = 'Active';

-- Count students by department
SELECT department, COUNT(*) as count 
FROM students 
GROUP BY department;

-- Find students with pending fees
SELECT fullName, department, feeStatus 
FROM students 
WHERE feeStatus = 'Pending';

-- Security status overview
SELECT securityStatus, COUNT(*) as count 
FROM students 
GROUP BY securityStatus;
```

### 🔍 Troubleshooting

#### Common Issues:
1. **MySQL not starting**:
   - Check if port 3306 is free
   - Try restarting XAMPP as Administrator

2. **Database connection error**:
   - Verify MySQL service is running
   - Check credentials in `.env` file

3. **phpMyAdmin access denied**:
   - Use username: `root`, password: (empty)
   - Check Apache service is running

#### Database Status Check:
- API Endpoint: http://localhost:3000/api/students/status
- Health Check: http://localhost:3000/api/health

### 📊 Features Available

#### Student Management:
- ✅ Add/Edit/Delete students
- ✅ Search and filter functionality
- ✅ Enhanced form with multiple sections
- ✅ Profile image support
- ✅ Academic tracking
- ✅ Guardian information
- ✅ Security status monitoring
- ✅ Fee status management

#### Analytics Dashboard:
- ✅ Total students count
- ✅ Department statistics
- ✅ Security status overview
- ✅ Fee status tracking
- ✅ Gender distribution
- ✅ Recent admissions

#### Matrix Theme:
- ✅ Green/Black color scheme
- ✅ Matrix rain animation
- ✅ Terminal-style typography
- ✅ Glow effects
- ✅ Modern UI components

### 🎯 Admin Contact
- **Name**: Syed Moazzam Ali
- **Email**: whoami00380@gmail.com
- **Phone**: 03296228003

### 📝 Database Backup
Regular backup recommended:
1. Go to phpMyAdmin
2. Select `student_management` database
3. Click "Export" tab
4. Choose "Quick" export method
5. Download SQL file

---
**Matrix Student Management System** - Enhanced with MySQL Integration
