import express from "express";
import registrations from "./registrations";

const router = express.Router();
router.use("/registrations", registrations);

export default router;
