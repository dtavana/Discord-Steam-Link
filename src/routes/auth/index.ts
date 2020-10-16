import express from "express";
import discord from "./discord";
import steam from "./steam";
import unlink from "./unlink";
import discordAuthenticated from "../../middleware/discordAuthenticated";

const router = express.Router();
router.use("/discord", discord);
router.use("/steam", discordAuthenticated, steam);
router.use("/unlink", discordAuthenticated, unlink);

export default router;
