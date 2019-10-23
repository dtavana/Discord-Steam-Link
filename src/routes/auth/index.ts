import express from 'express';
import discord from './discord';
import steam from './steam';
import discordAuthenticated from "../../middleware/discordAuthenticated";

const router = express.Router();
router.use('/discord', discord);
router.use('/steam', discordAuthenticated, steam);

export default router;
