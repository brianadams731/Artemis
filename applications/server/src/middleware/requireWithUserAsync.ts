import { Response, NextFunction } from "express";
import { User } from "../models/User";

const requireWithUserAsync = async function (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> {
    if (!req.session.userId) {
        res.status(401).send("Error: Invalid Credentials");
        return;
    }
    const user = await User.findOne(req.session.userId);
    if (!user) {
        res.status(401).send("Error: Invalid Credentials");
        return;
    }
    req.user = user;
    next();
};

export { requireWithUserAsync };
