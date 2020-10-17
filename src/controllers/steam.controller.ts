import moment from "moment";
import { Registration } from "../models/Registration";

export const callback = async (req, res) => {
    const {
        steamid: steamId,
        personaname: steamName,
        avatar: steamAvatar
    } = req.user._json;
    const exists = await Registration.findOne({ steamId });
    if (exists) {
        const { registeredAt } = exists;
        req.session.authenticatedData = exists;
        req.session.authenticatedData["registeredAtString"] = moment(
            registeredAt
        ).fromNow(false);
        res.redirect("/");
    } else {
        req.session.steamData = { steamId, steamName, steamAvatar };
        res.redirect("/auth/discord");
    }
};
