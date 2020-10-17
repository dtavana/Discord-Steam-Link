import express from "express";
import { registrations } from "../../controllers/api.controller";

const router = express.Router();
router.get("/", registrations);

export default router;
