import {Registration} from "../models/Registration";

export const registrations = async(req, res) => {
    const data = await Registration.find({}, { 'steamId': 1, '_id': 0 });
    res.status(200).send({data});
};

