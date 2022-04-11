import express from "express";
import { User } from "../models/User";
import { parseUserRegisterAsync } from "../utils/parseUser";

const registerRouter = express.Router();

registerRouter.post("/register", async (req,res)=>{
    const parsedUser = await parseUserRegisterAsync(req.body);

    let user = await User.create({
        username: parsedUser.username,
        password: parsedUser.password,
        email:parsedUser.email,
    }).save().catch(()=>{
        res.status(500).send("Error: User exists")
    });
    
    //req.session.userID = user!.id;
    res.redirect("/");
})

export {registerRouter};