import express from "express";
import { callback } from "../../../controllers/discord.controller";

const router = express.Router();
router.get("/", callback);

export default router;
