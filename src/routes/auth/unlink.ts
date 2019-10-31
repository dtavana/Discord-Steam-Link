import express from 'express';
import {unlink} from "../../controllers/auth.controller";

const router = express.Router();
router.get('/', unlink);

export default router;
