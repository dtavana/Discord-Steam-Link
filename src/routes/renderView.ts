import express from "express";
import { renderView } from "../controllers/views.controller";

const router = express.Router();
router.get("/", renderView);

export default router;
