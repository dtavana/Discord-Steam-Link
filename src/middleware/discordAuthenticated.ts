export default (req, res, next) => {
    if (req.session.discordData || req.session.authenticatedData) {
        next();
    } else {
        res.redirect("/auth/discord");
    }
};
