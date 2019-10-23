import btoa from 'btoa';
import fetch from 'node-fetch';
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
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${creds}`
            },
        });
    const json = await response.json();
    req.session.discordToken = json.access_token;
    res.redirect('/auth/steam');
};

