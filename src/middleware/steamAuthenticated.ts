export default (req, res, next) => {
    if (req.session.steamData || req.session.authenticatedData) {
        next();
    } else {
        res.redirect("/auth/steam");
    }
};
