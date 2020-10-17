import express from "express";
import auth from "./auth";
import api from "./api";
import renderView from "./renderView";

const router = express.Router();
router.use("/auth", auth);
router.use("/api", api);
router.use("/", renderView);

export default router;
