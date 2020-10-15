import btoa from "btoa";
import { URLSearchParams } from "url";
import fetch from "node-fetch";
import moment from "moment";
import { Registration } from "../models/Registration";
export const startAuthentication = async (req, res) => {
  const { PORT, DISCORD_CLIENT_ID } = req.app.locals.config;
  const redirect = encodeURIComponent(
    `http://localhost:${PORT}/auth/discord/callback`
  );
  const authString = `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&scope=identify%20guilds.join&response_type=code&redirect_uri=${redirect}`;
  res.redirect(authString);
};

export const callback = async (req, res) => {
  const {
    PORT,
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
  } = req.app.locals.config;
  const { code } = req.query;
  const options = {
    method: "POST",
    body: {},
  };
  let params = new URLSearchParams();
  params.append("client_id", DISCORD_CLIENT_ID);
  params.append("client_secret", DISCORD_CLIENT_SECRET);
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  params.append("scope", "identify guilds.join");
  params.append(
    "redirect_uri",
    `http://localhost:${PORT}/auth/discord/callback`
  );
  options.body = params;
  const tokenRes = await fetch(
    `https://discordapp.com/api/oauth2/token`,
    options
  );
  const tokenJson = await tokenRes.json();
  const { access_token } = tokenJson;
  req.session.discordToken = access_token;
  const userRes = await fetch(
    `${req.app.locals.config.DISCORD_API_BASE}users/@me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const userJson = await userRes.json();
  const { id: discordId, username, discriminator, avatar } = userJson;
  await fetch(
    `${req.app.locals.config.DISCORD_API_BASE}guilds/${req.app.locals.config.GUILD_ID}/members/${discordId}`,
    {
      method: "PUT",
      body: JSON.stringify({ access_token }),
      headers: {
        Authorization: `Bot ${req.app.locals.config.BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  await fetch(
    `${req.app.locals.config.DISCORD_API_BASE}guilds/${req.app.locals.config.GUILD_ID}/members/${discordId}/roles/${req.app.locals.config.ROLE_ID}`,
    {
      method: "PUT",
      body: JSON.stringify({ access_token }),
      headers: {
        Authorization: `Bot ${req.app.locals.config.BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const exists = await Registration.findOne({ discordId });
  if (exists) {
    const { registeredAt } = exists;
    req.session.authenticatedData = exists;
    req.session.authenticatedData["registeredAtString"] = moment(
      registeredAt
    ).fromNow(false);
    res.redirect("/");
  } else {
    req.session.discordData = {
      discordId,
      discordName: `${username}#${discriminator}`,
      discordAvatar: `https://cdn.discordapp.com/avatars/${discordId}/${avatar}`,
    };
    res.redirect("/auth/steam");
  }
};
