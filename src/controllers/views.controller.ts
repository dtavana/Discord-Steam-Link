export const renderView = (req, res) => {
    const data = req.session.authenticatedData;
    data ? res.render("info", { data }) : res.render("login");
};
