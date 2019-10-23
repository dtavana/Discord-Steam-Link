export default (req, res, next) => {
    if (req.session.discordToken) {
        next();
    } else {
        res.redirect('/auth/discord');
    }
}
