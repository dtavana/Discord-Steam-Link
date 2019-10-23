import express from 'express';
import {startAuthentication} from '../../../controllers/discord.controller';

const router = express.Router();
router.get('/', startAuthentication);

export default router;
