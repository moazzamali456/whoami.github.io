# 🎭 Matrix Student Management System - Local Setup Guide

## 📋 **Prerequisites**
Before running this project locally, make sure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional, for version control) - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

## 🚀 **Quick Start Guide**

### **Step 1: Open the Project in VS Code**
1. Extract/copy the project folder to your computer
2. Open **VS Code**
3. Go to **File** → **Open Folder**
4. Select the project folder (the one containing this README)

### **Step 2: Install Dependencies**
Open VS Code terminal (**View** → **Terminal** or **Ctrl+`**) and run:

```bash
# Install frontend dependencies
cd frontend
npm install
```

### **Step 3: Run the Application**
In the same terminal, run:

```bash
# Start the development server
npm run dev
```

### **Step 4: Access the Website**
- The terminal will show: `Local: http://localhost:5173`
- **Click the link** or open your browser and go to: **http://localhost:5173**
- You should see the Matrix Student Management System running!

## 🎯 **Alternative: Use Helper Scripts**

### **For Windows:**
Double-click the `setup-and-run.bat` file

### **For Mac/Linux:**
Run the `setup-and-run.sh` file:
```bash
chmod +x setup-and-run.sh
./setup-and-run.sh
```

## 🔧 **Manual Setup (If Quick Start Doesn't Work)**

### **1. Check Node.js Installation**
```bash
node --version
npm --version
```
Should show version numbers. If not, install Node.js.

### **2. Navigate to Frontend Folder**
```bash
cd frontend
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Start Development Server**
```bash
npm run dev
```

## 🎭 **What You'll See**
- **Matrix rain animation** in the background
- **Dark green cyberpunk theme**
- **Complete student management system**
- **Navigation tabs**: Students, Teachers, Analytics
- **All features working locally**

## 📁 **Project Structure**
```
matrix-student-management/
├── frontend/                 # React frontend application
│   ├── src/                 # Source code
│   ├── public/              # Static files
│   ├── package.json         # Dependencies
│   └── vite.config.ts       # Build configuration
├── backend/                 # Node.js backend (optional)
├── setup-and-run.bat       # Windows setup script
├── setup-and-run.sh        # Mac/Linux setup script
└── LOCAL_SETUP.md          # This file
```

## 🛠️ **Troubleshooting**

### **Problem: "npm: command not found"**
**Solution**: Install Node.js from https://nodejs.org/

### **Problem: Port 5173 is busy**
**Solution**: The app will automatically use the next available port (5174, 5175, etc.)

### **Problem: Dependencies installation fails**
**Solution**: 
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### **Problem: Browser shows blank page**
**Solution**: 
1. Check the terminal for error messages
2. Try refreshing the browser (Ctrl+F5)
3. Check if the development server is still running

## 🚀 **Building for Production**
To create a production build:
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` folder.

## 📞 **Support**
If you encounter any issues:
1. Check that Node.js version is 16 or higher
2. Make sure you're in the `frontend` folder when running npm commands
3. Try deleting `node_modules` and running `npm install` again

## 🎯 **Features Available Locally**
- ✅ Complete Matrix theme with animations
- ✅ Student management (add, edit, delete, search)
- ✅ Teacher management
- ✅ Analytics dashboard
- ✅ PDF export functionality
- ✅ Excel export functionality
- ✅ Responsive design
- ✅ All UI components and forms

**Enjoy your Matrix Student Management System!** 🎊
