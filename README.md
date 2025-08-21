# 🎭 Matrix Student Management System

A futuristic student management system with Matrix theme, featuring green terminal aesthetics and comprehensive student tracking capabilities.

![Matrix Theme](https://img.shields.io/badge/Theme-Matrix-00ff00)
![Framework](https://img.shields.io/badge/Frontend-React-61dafb)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## � **Live Demo**
🔗 **https://moazzamali456.github.io/whoami.github.io**

## �🎯 **Admin Contact**
- **Name**: WHOAMI
- **Email**: ****************
- **Phone**: 00000000000

## ✨ **Features**

### 🎨 **Matrix Theme**
- Green rain animation background
- Terminal-style typography with Orbitron font
- Glow effects and cyberpunk aesthetics
- Dark theme with green accents

### 📊 **Student Management**
- Multi-section student registration (Personal, Academic, Guardian, Security)
- Real-time search and filtering
- Analytics dashboard with statistics
- Security status monitoring
- Fee status tracking
- Profile image support
- PDF/Excel export functionality

### �‍🏫 **Teacher Management**
- Complete teacher profiles
- Department and subject assignment
- Experience tracking
- Contact information management

## 🚀 **Quick Start - Local Development**

### **Prerequisites**
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- VS Code (recommended) - [Download here](https://code.visualstudio.com/)

### **Method 1: Easy Setup (Windows)**
1. Extract the project folder
2. Double-click `setup-and-run.bat`
3. Your browser will open automatically at `http://localhost:5173`

### **Method 2: Easy Setup (Mac/Linux)**
1. Extract the project folder
2. Open terminal in project folder
3. Run: `chmod +x setup-and-run.sh && ./setup-and-run.sh`
4. Your browser will open automatically at `http://localhost:5173`

### **Method 3: VS Code Tasks**
1. Open project folder in VS Code
2. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. Type "Tasks: Run Task"
4. Select "Start Matrix Student Management"

### **Method 4: Manual Setup**
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 **Project Structure**
```
matrix-student-management/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── Matrix.css       # Matrix theme styles
│   │   └── components/      # Reusable components
│   ├── public/              # Static assets
│   └── package.json         # Dependencies
├── .vscode/                 # VS Code configuration
│   ├── tasks.json          # Automated tasks
│   ├── launch.json         # Debug configuration
│   └── extensions.json     # Recommended extensions
├── setup-and-run.bat       # Windows quick setup
├── setup-and-run.sh        # Mac/Linux quick setup
├── LOCAL_SETUP.md          # Detailed setup guide
└── README.md               # This file
```

## 🎭 **Technology Stack**
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom Matrix CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **PDF Export**: jsPDF with autoTable
- **Excel Export**: SheetJS (xlsx)
- **Fonts**: Orbitron (Matrix style)

## � **Available Scripts**

In the `frontend` directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 **Key Features Showcase**

### **Matrix Theme Elements**
- ✅ Animated Matrix rain background
- ✅ Green terminal glow effects
- ✅ Cyberpunk color scheme
- ✅ Futuristic UI components

### **Student Management**
- ✅ 8-semester academic system
- ✅ Complete CRUD operations
- ✅ Advanced search and filtering
- ✅ Bulk data export (PDF/Excel)
- ✅ Student analytics dashboard

### **Teacher Management**
- ✅ Teacher profiles with experience tracking
- ✅ Department assignment
- ✅ Subject specialization
- ✅ Contact management

### **Data Export**
- ✅ Professional PDF generation
- ✅ Excel spreadsheet export
- ✅ Formatted reports with styling

## 🛠️ **Development**

### **Adding New Features**
1. Navigate to `frontend/src/App.tsx`
2. Add your components in the appropriate sections
3. Follow the existing Matrix theme patterns
4. Use Tailwind CSS classes for styling

### **Customizing Theme**
- Main styles: `frontend/src/Matrix.css`
- Tailwind config: `frontend/tailwind.config.js`
- Colors: Green (#00ff00) variants for Matrix theme

## 📱 **Responsive Design**
- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop enhancement
- ✅ Touch-friendly interface

## 🔐 **Security Features**
- ✅ Anonymous admin information
- ✅ No sensitive data exposure
- ✅ Client-side data handling
- ✅ Safe for public deployment

## 📖 **Documentation**
- [Local Setup Guide](LOCAL_SETUP.md) - Detailed installation instructions
- [Live Demo](https://moazzamali456.github.io/whoami.github.io) - See it in action

## 🤝 **Contributing**
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 **License**
This project is licensed under the MIT License.

## 🎊 **Enjoy Your Matrix Experience!**
Experience the future of student management with this cyberpunk-themed application!
   cd matrix-student-management
   ```

2. **Setup Database (MySQL)**
   - Install and start XAMPP
   - Start Apache and MySQL services
   - Access phpMyAdmin: http://localhost/phpmyadmin
   - Database will be created automatically on first run

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Server will start at: http://localhost:3000

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will start at: http://localhost:5173

### Backend
1. Copy `.env.example` to `.env` and fill secrets.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run migrations & seed default admin:
   ```sh
   npm run migrate
   npm run seed
   ```
4. Start dev server:
   ```sh
   npm run dev
   ```

### Frontend
1. Copy `.env.example` to `.env` and set API URL.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start dev server:
   ```sh
   npm run dev
   ```

### Docker
1. Build and run with Docker Compose:
   ```sh
   docker-compose up --build
   ```

## Security Notes
- All secrets in env vars
- JWT access/refresh tokens, httpOnly+Secure cookies
- Rate limits, lockouts, audit logs
- Input validation, sanitization, helmet, CORS, hpp
- No secrets/tokens/passwords in logs

## Deployment Checklist
- Set strong secrets in `.env`
- Use HTTPS in production
- Restrict CORS origins
- Run `npm audit` and fix vulnerabilities
- Review audit logs
- Monitor rate limits and lockouts

## API Docs
- OpenAPI/Swagger available at `/api/docs` (admin only)

## Testing
- Unit/integration tests for auth, RBAC, student CRUD
- Postman/Insomnia collection included

---

See code for more details and configuration.
