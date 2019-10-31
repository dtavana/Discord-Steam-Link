import {Registration} from "../models/Registration";

export const unlink = async(req, res) => {
    const {discordId} = req.session.authenticatedData;
    await Registration.deleteOne({discordId});
    req.session.destroy();
    res.redirect('/');
};

