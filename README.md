# 🎭 Matrix Student Management System

A futuristic student management system with Matrix theme, featuring green terminal aesthetics, MySQL database integration, and comprehensive student tracking capabilities.

![Matrix Theme](https://img.shields.io/badge/Theme-Matrix-00ff00)
![Database](https://img.shields.io/badge/Database-MySQL-blue)
![Framework](https://img.shields.io/badge/Frontend-React-61dafb)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933)

## 🎯 **Admin Contact**
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
- CSV export functionality

### 🗄️ **Database Integration**
- MySQL with Sequelize ORM
- phpMyAdmin web interface
- Automatic database setup
- Sample data initialization
- Full CRUD operations

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v16 or higher)
- XAMPP (for MySQL and phpMyAdmin)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/matrix-student-management.git
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
