import { Router } from 'express';
import newEntrance from './../controllers/newEntrance.js';
import newOutgoing from './../controllers/newOutgoing.js';
import getTransactions from './../controllers/getTransactions.js';
import authenticatedOnly from './../middlewares/authenticatedOnly.js';
import parseSession from './../middlewares/parseSession.js';

const router = Router();

router.post('/new-entrance', authenticatedOnly, parseSession, newEntrance);
router.post('/new-outgoing', authenticatedOnly, parseSession, newOutgoing);
router.get('/transactions', authenticatedOnly, parseSession, getTransactions);

export default router;