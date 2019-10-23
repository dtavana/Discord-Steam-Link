import express from 'express';
import auth from './auth';
import renderInfo from './renderInfo';

const router = express.Router();
router.use('/auth', auth);
router.use('/', renderInfo);

export default router;
