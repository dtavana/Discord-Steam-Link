import express from "express";
import startAuthentication from "./startAuthentication";
import callback from "./callback";

const router = express.Router();
router.use("/", startAuthentication);
router.use("/callback", callback);

export default router;
