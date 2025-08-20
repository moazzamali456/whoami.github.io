import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { authMiddleware } from '../middleware/auth';
import { rbacMiddleware } from '../middleware/rbac';

const swaggerDocument = YAML.load('./swagger.yaml');
const router = Router();
router.use('/', authMiddleware, rbacMiddleware('admin'), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default router;
