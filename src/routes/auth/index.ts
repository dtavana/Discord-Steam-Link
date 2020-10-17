import express from "express";
import discord from "./discord";
import steam from "./steam";
import unlink from "./unlink";
import steamAuthenticated from "../../middleware/steamAuthenticated";

const router = express.Router();
router.use("/", steam);
router.use("/steam", steam);
router.use("/discord", steamAuthenticated, discord);
router.use("/unlink", steamAuthenticated, unlink);

export default router;
