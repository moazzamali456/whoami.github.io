# 🚀 Student Management System - Live Server Deployment Guide

## 📋 Prerequisites
- Node.js 20+ installed
- MySQL 8.0+ database
- Domain name (optional)
- VPS/Cloud server (DigitalOcean, AWS, etc.)

## 🏗️ Deployment Options

### Option 1: Free Hosting (Recommended for Testing)

#### Frontend Deployment (Vercel - Free)
1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel --prod`
   - Follow prompts to deploy

3. **Set environment variables in Vercel:**
   - Go to Vercel dashboard
   - Add: `VITE_API_BASE_URL=https://your-backend-url.com/api`

#### Backend Deployment (Railway/Render - Free Tier)

**Using Railway:**
1. **Prepare for deployment:**
   ```bash
   cd backend
   npm run build
   ```

2. **Create railway.json:**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

3. **Deploy to Railway:**
   - Install Railway CLI: `npm install -g @railway/cli`
   - Login: `railway login`
   - Deploy: `railway up`

4. **Set environment variables in Railway:**
   ```
   NODE_ENV=production
   PORT=4000
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_USER=your-db-user
   DB_PASS=your-db-password
   DB_NAME=student_management
   ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-64-chars-long
   REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-64-chars-long
   CORS_ORIGINS=https://your-frontend-vercel-url.com
   CRYPTO_ENC_KEY=your-32-byte-base64-encryption-key
   COOKIE_SECURE=true
   COOKIE_DOMAIN=.railway.app
   ```

#### Database (PlanetScale - Free Tier)
1. **Create PlanetScale account**
2. **Create database: `student-management`**
3. **Get connection string**
4. **Update backend environment variables**

---

### Option 2: VPS Deployment (Production Ready)

#### Server Setup (Ubuntu 22.04)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install SSL certificates (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
```

#### Deploy Backend
```bash
# Clone/upload your code
cd /var/www
sudo git clone your-repo-url student-management
sudo chown -R $USER:$USER student-management

# Install backend dependencies
cd student-management/backend
npm install --production

# Build TypeScript
npm run build

# Create .env file
sudo nano .env
# Add all production environment variables

# Setup database
mysql -u root -p
CREATE DATABASE student_management;
CREATE USER 'student_admin'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON student_management.* TO 'student_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run database seeder
npm run seed

# Start with PM2
pm2 start dist/server.js --name "student-management-api"
pm2 startup
pm2 save
```

#### Deploy Frontend
```bash
# Build frontend
cd ../frontend
npm install
npm run build

# Copy build to Nginx
sudo cp -r dist/* /var/www/html/
```

#### Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/student-management
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/student-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

### Option 3: Docker Deployment

#### Build and Deploy with Docker Compose
```bash
# Make sure you're in the project root
cd "c:/myp/student management system"

# Start all services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:4000
# Database Admin: http://localhost:8080
```

---

## 🔧 Production Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=4000
DB_HOST=your-production-db-host
DB_PORT=3306
DB_USER=student_admin
DB_PASS=your-secure-database-password
DB_NAME=student_management
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-minimum-64-characters-long
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-minimum-64-characters-long
REFRESH_TOKEN_TTL=7d
CORS_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
LOGIN_RATE_LIMIT_MAX=5
CRYPTO_ENC_KEY=your-32-byte-base64-encryption-key-for-field-encryption
COOKIE_SECURE=true
COOKIE_DOMAIN=.your-domain.com
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

---

## 🚀 Quick Deploy Commands

### Local Development
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

---

## 📊 Monitoring & Maintenance

### PM2 Commands
```bash
pm2 status                 # Check status
pm2 logs student-management-api  # View logs
pm2 restart student-management-api  # Restart
pm2 stop student-management-api     # Stop
```

### Database Backup
```bash
mysqldump -u student_admin -p student_management > backup.sql
```

### SSL Certificate Renewal
```bash
sudo certbot renew --dry-run
```

---

## 🔒 Security Checklist for Production

- ✅ Use strong, unique secrets for JWT tokens
- ✅ Enable HTTPS/SSL certificates
- ✅ Configure firewall (UFW on Ubuntu)
- ✅ Regular security updates
- ✅ Database user with minimal privileges
- ✅ Rate limiting enabled
- ✅ CORS properly configured
- ✅ Environment variables secured
- ✅ Regular backups scheduled

---

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update `CORS_ORIGINS` in backend .env
2. **Database Connection**: Check DB credentials and host
3. **JWT Errors**: Verify token secrets are set
4. **Build Failures**: Ensure all dependencies are installed

### Logs:
- Backend: `pm2 logs student-management-api`
- Frontend: Browser Developer Tools
- Nginx: `/var/log/nginx/error.log`
- MySQL: `/var/log/mysql/error.log`

---

Your Student Management System is now ready for production deployment! Choose the option that best fits your needs and budget.
