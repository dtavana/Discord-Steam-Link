export default (req, res, next) => {
    if (req.session.discordData) {
        next();
    } else {
        res.redirect('/auth/discord');
    }
}
