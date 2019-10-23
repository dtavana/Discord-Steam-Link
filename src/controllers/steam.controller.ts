import btoa from 'btoa';
import fetch from 'node-fetch';

export const callback = async(req, res) => {
    console.log(req.session.discordToken);
    console.log(req.user);
    res.redirect
};

