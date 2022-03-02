import { Session } from "express-session";

declare module 'express-session'{
    interface Session{
        // TODO: Add any extra fields to the session object here
    }
}