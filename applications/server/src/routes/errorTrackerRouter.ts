import express from "express";

var cors = require('cors')
const errorTrackerRouter = express.Router();

errorTrackerRouter.options("/", cors());
errorTrackerRouter.post("/", cors(), (req, res)=>{
    console.log(JSON.stringify(req.body), null, 2);
    res.set('Access-Control-Allow-Origin', "*");
    res.set("Access-Control-Allow-Methods", "POST");
    
    res.status(200).send();
})

export { errorTrackerRouter };
