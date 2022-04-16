import express from "express";
import { User } from "../models/User";
import { parseUserRegisterAsync } from "../utils/parseUser";
const registerRouter = express.Router();

registerRouter.post("/", async (req,res)=>{
    const parsedUser = await parseUserRegisterAsync(req.body);

    try{
        const user = new User();
        user.username = parsedUser.username!;
        user.password = parsedUser.password!;
        user.email = parsedUser.email!;
        user.save();
        req.session.userId = user!.id;
    }catch(err){
        res.status(500).send("Error: User not created");
    }
    
    res.status(200).send("User Created");
})

export {registerRouter};