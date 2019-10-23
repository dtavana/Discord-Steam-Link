import {connect} from 'mongoose';

export const init = async(config) => {
    return await connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true });
};
