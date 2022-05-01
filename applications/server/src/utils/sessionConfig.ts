import session, { SessionOptions } from "express-session";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const sessionConfig: SessionOptions = {
    name: "userSession",
    secret: "cookieSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 24 * 60 * 60 * 1000 },
    store: new (require("connect-pg-simple")(session))({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
    }),
    genid: function (req) {
        return uuidv4();
    },
};

export { sessionConfig };
