import { Router } from 'express';
import { register, login } from './../controllers/authControllers.js';
import logout from './../controllers/logout.js';
import authenticatedOnly from './../middlewares/authenticatedOnly.js';

const router = Router();

router.post('/cadastro', register);
router.post('/login', login);
router.delete('/logout', authenticatedOnly, logout);

export default router;