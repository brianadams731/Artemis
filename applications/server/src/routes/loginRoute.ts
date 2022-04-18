import express from "express";
import { User } from "../models/User";
import { checkHashedPasswordAsync } from "../utils/passwordHash";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const loginCred = req.body;
    const user = await User.findOne({
        select: ["email", "password", "id"],
        where: { email: loginCred.email },
    });
    // Checking for user ahead to save hashing against an invalid user
    if (!user) {
        return res.status(401).send("Error: Invalid Credentials");
    }

    const isValidPassword = await checkHashedPasswordAsync(loginCred.password, user.password);
    console.log(isValidPassword);
    if (!isValidPassword) {
        return res.status(401).send("Error: Invalid Credentials");
    } else {
        req.session.userId = user!.id;
        return res.status(200).send("User: Logged In");
    }
});

loginRouter.get("/test", async (req, res)=>{
    console.log(req.session.userId);
    
    if(!req.session.userId){
        return res.status(401).send();
    }
    const user = await User.findOne(req.session.userId);
    if(!user){
        return res.status(401).send();  
    }
    return res.status(200).send();
})

export { loginRouter };
