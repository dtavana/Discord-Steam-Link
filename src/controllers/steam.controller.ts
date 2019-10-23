import fetch from 'node-fetch';
import {Registration} from "../models/Registration";

export const callback = async(req, res) => {
    const { steamid: steamId, personaname: steamName, avatar: steamAvatar } = req.user._json;
    const { discordId, discordName, discordAvatar } = req.session.discordData;
    const data = { steamId, discordId, steamName, discordName, steamAvatar, discordAvatar};
    await Registration.create(data);
    req.session.authenticatedData = data;
    res.redirect('/');
};

