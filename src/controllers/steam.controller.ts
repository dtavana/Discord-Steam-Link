import moment from 'moment';
import {Registration} from "../models/Registration";

export const callback = async(req, res) => {
    const { steamid: steamId, personaname: steamName, avatar: steamAvatar } = req.user._json;
    const { discordId, discordName, discordAvatar } = req.session.discordData;
    const registeredAt = new Date();
    const data = { steamId, discordId, steamName, discordName, steamAvatar, discordAvatar, registeredAt};
    await Registration.create(data);
    req.session.authenticatedData = data;
    req.session.authenticatedData['registeredAtString'] = moment(registeredAt).fromNow(false);
    res.redirect('/');
};

