import {Registration} from "../models/Registration";

export const registrations = async(req, res) => {
    const players = await Registration.find({}, { 'steamId': 1, '_id': 0 });
    const playersReduced = players.map(player => player.steamId);
    const result = {
        data: {
            players: playersReduced
        }
    };
    res.status(200).send(result);
};

