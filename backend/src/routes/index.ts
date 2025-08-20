import { Router } from 'express';
import authRoutes from './auth';
import studentRoutes from './students';
// import docsRoutes from './docs'; // Temporarily disabled

const router = Router();
router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
// router.use('/docs', docsRoutes); // Temporarily disabled
export default router;
