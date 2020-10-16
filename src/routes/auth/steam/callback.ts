import express from "express";
import { callback } from "../../../controllers/steam.controller";
import { authenticate } from "passport";

const router = express.Router();
router.get(
    "/",
    authenticate("steam", { failureRedirect: "/auth/steam" }),
    callback
);

export default router;
