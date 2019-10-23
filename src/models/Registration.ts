import {Document, Model, model, Schema} from "mongoose";

interface IRegistration extends Document {
    discordId: string;
    steamId: string;
    registeredAt: Date;
}

const RegistrationSchema: Schema = new Schema({
    discordId: { type: String, required: true, unique: true },
    steamId: { type: String, required: true, unique: true },
    steamName: { type: String, required: true, unique: true },
    discordName: { type: String, required: true, unique: true },
    steamAvatar: { type: String, required: false, unique: true },
    discordAvatar: { type: String, required: false, unique: true },
});

export const Registration: Model<IRegistration> = model<IRegistration>("Registration", RegistrationSchema);
