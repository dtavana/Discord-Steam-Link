import {Document, Model, model, Schema} from "mongoose";

interface IRegistration extends Document {
    discordId: string;
    steamId: string;
    steamName: string;
    discordName: string;
    steamAvatar: string;
    discordAvatar: string;
    registeredAt: Date;
}

const RegistrationSchema: Schema = new Schema({
    discordId: { type: String, required: true, unique: true },
    steamId: { type: String, required: true, unique: true },
    steamName: { type: String, required: true, unique: false },
    discordName: { type: String, required: true, unique: false },
    steamAvatar: { type: String, required: false, unique: false },
    discordAvatar: { type: String, required: false, unique: false },
    registeredAt: { type: Date, required: true, unique: false },
});

export const Registration: Model<IRegistration> = model<IRegistration>("Registration", RegistrationSchema);
