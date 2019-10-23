import {Document, Model, model, Schema} from "mongoose";

interface IRegistration extends Document {
    discordId: string;
    steamId: string;
    registeredAt: Date;
}

const RegistrationSchema: Schema = new Schema({
    createdAt: { type: Date, required: false },
    discordId: { type: String, required: true, unique: true },
    steamId: { type: String, required: true, unique: true },
});
RegistrationSchema.pre<IRegistration>("save", function (next) {
    const now = new Date();
    if (!this.registeredAt) {
        this.registeredAt = now;
    }
    next();
});

export const Registration: Model<IRegistration> = model<IRegistration>("Registration", RegistrationSchema);
