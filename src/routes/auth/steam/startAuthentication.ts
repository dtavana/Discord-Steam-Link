import express from "express";
import { authenticate } from "passport";

const router = express.Router();
router.get("/", authenticate("steam", { failureRedirect: "/auth/steam" }));

export default router;
