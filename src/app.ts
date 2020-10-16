import bodyParser from "body-parser";
import express from "express";
import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";
import Config from "./interfaces/Config";
import routes from "./routes";
import { resolve } from "path";
import { init } from "./controllers/db";
import passport from "passport";
import { Strategy } from "passport-steam";
import session from "express-session";

const config: Config = safeLoad(readFileSync("config.yml", "utf8"));
const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
passport.serializeUser((user, done) => {
    done(null, user._json);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
passport.use(
    new Strategy(
        {
            returnURL: `http://localhost:${config.PORT}/auth/steam/callback`,
            realm: `http://localhost:${config.PORT}/`,
            apiKey: config.STEAM_API_KEY
        },
        (identifier, profile, done) => {
            return done(null, profile);
        }
    )
);
app.use(
    session({
        secret: config.SECRET,
        name: "U_SESSION",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.locals.config = config;
app.locals.db = init(config);
app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "../src", "views"));
app.use(express.static(resolve(__dirname, "../src", "public")));
app.listen(config.PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`Discord Steam Link now listening on port ${config.PORT}`)
);
