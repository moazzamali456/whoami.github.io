import { Router } from 'express';
import { login, refresh, logout } from '../controllers/authController';
import { loginRateLimiter } from '../middleware/rateLimit';

const router = Router();
router.post('/login', loginRateLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
export default router;
