import btoa from 'btoa';
import fetch from 'node-fetch';
import {Registration} from "../models/Registration";
export const startAuthentication = async(req, res) => {
    const {PORT, DISCORD_CLIENT_ID} = req.app.locals.config;
    const redirect = encodeURIComponent(`http://localhost:${PORT}/auth/discord/callback`);
    const authString = `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds.join&response_type=code&redirect_uri=${redirect}`;
    res.redirect(authString);
};

export const callback = async(req, res) => {
    const {PORT, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET} = req.app.locals.config;
    const redirect = encodeURIComponent(`http://localhost:${PORT}/auth/discord/callback`);
    const { code } = req.query;
    const creds = btoa(`${DISCORD_CLIENT_ID}:${DISCORD_CLIENT_SECRET}`);
    const tokenRes = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${creds}`
            },
        });
    const tokenJson = await tokenRes.json();
    const { access_token } = tokenJson;
    req.session.discordToken = access_token;
    const userRes = await fetch(`${req.app.locals.config.DISCORD_API_BASE}users/@me`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        });
    const userJson = await userRes.json();
    const { id: discordId, username, discriminator, avatar } = userJson;
    const exists = await Registration.findOne({ discordId });
    if(exists) {
        req.session.authenticatedData = exists;
        res.redirect('/');
    } else {
        req.session.discordData = {
            discordId,
            discordName: `${username}#${discriminator}`,
            discordAvatar: `https://cdn.discordapp.com/avatars/${discordId}/${avatar}`,
        };
        res.redirect('/auth/steam');
    }
};

