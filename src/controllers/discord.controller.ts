import { URLSearchParams } from "url";
import fetch from "node-fetch";
import moment from "moment";
import { Registration } from "../models/Registration";
import { getDiscordCallback } from "../utils/getCallback";
export const startAuthentication = async (req, res) => {
    const { DISCORD_CLIENT_ID } = req.app.locals.config;
    const authString = `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds.join&response_type=code&redirect_uri=${getDiscordCallback(
        req.app.locals.config
    )}`;
    res.redirect(authString);
};

export const callback = async (req, res) => {
    const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = req.app.locals.config;
    const { code } = req.query;
    const params = new URLSearchParams();
    params.append("client_id", DISCORD_CLIENT_ID);
    params.append("client_secret", DISCORD_CLIENT_SECRET);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("scope", "identify guilds.join");
    params.append("redirect_uri", getDiscordCallback(req.app.locals.config));
    const tokenRes = await req.app.locals.dapi.post("/oauth2/token", params);
    const tokenJson = tokenRes.data;
    const { access_token: accessToken } = tokenJson;
    req.session.discordToken = accessToken;
    const userRes = await req.app.locals.dapi.get("/users/@me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const userJson = userRes.data;
    const { id: discordId, username, discriminator, avatar } = userJson;
    req.app.locals.dapi.put(
        `/guilds/${req.app.locals.config.GUILD_ID}/members/${discordId}`,
        {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: accessToken
        },
        {
            headers: {
                Authorization: `Bot ${req.app.locals.config.BOT_TOKEN}`
            }
        }
    );
    req.app.locals.dapi.put(
        `/guilds/${req.app.locals.config.GUILD_ID}/members/${discordId}/roles/${req.app.locals.config.ROLE_ID}`,
        {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: accessToken
        },
        {
            headers: {
                Authorization: `Bot ${req.app.locals.config.BOT_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );

    const { steamId, steamName, steamAvatar } = req.session.steamData;
    req.session.discordData = {
        discordId,
        discordName: `${username}#${discriminator}`,
        discordAvatar: `https://cdn.discordapp.com/avatars/${discordId}/${avatar}`
    };
    const registeredAt = new Date();
    const data = {
        steamId,
        discordId,
        steamName,
        discordName: req.session.discordData.discordName,
        steamAvatar,
        discordAvatar: req.session.discordData.discordAvatar,
        registeredAt
    };
    Registration.create(data);
    req.session.authenticatedData = data;
    req.session.authenticatedData["registeredAtString"] = moment(
        registeredAt
    ).fromNow(false);
    res.redirect("/");
};
