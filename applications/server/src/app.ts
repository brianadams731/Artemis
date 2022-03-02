import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
debugger;
app.get("/",(req,res)=>{
    return res.send("Test from server");
})

app.listen(process.env.PORT||"8080",()=>{
    console.log(`Server running at http://localhost:${process.env.PORT||"8080"}/`);
})