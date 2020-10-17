import Config from "../interfaces/Config";

export const getSteamCallback = (config: Config) => {
    return `${config.DOMAIN}:${config.PORT}/auth/steam/callback`;
};

export const getDiscordCallback = (config: Config) => {
    return `${config.DOMAIN}:${config.PORT}/auth/discord/callback`;
};
