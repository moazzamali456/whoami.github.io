import { Router } from 'express';
import { 
  listStudents, 
  getStudent, 
  createStudent, 
  updateStudent, 
  deleteStudent, 
  exportStudents, 
  getAnalytics, 
  getDatabaseStatus 
} from '../controllers/studentController';
// import { rbacMiddleware } from '../middleware/rbac';
// import { authMiddleware } from '../middleware/auth';

const router = Router();

// Temporarily disable auth for testing
router.get('/', listStudents);
router.get('/analytics', getAnalytics);
router.get('/status', getDatabaseStatus);
router.get('/export/csv', exportStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
