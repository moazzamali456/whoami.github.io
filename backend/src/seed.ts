import bcrypt from 'bcrypt';
import { User } from '../src/models/User';
import { sequelize } from '../src/config/db';

const seedAdmin = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await User.create({
      email: 'admin@example.com',
      passwordHash: hashedPassword,
      role: 'admin',
      failedLoginCount: 0,
      lockUntil: null,
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
