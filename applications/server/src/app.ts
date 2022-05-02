import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import { createConnection } from "typeorm";

import connectionConfig from "./utils/connectionConfig";
import { sessionConfig } from "./utils/sessionConfig";

import { ticketRoute } from "./routes/ticketRoute";
import { workspaceRoute } from "./routes/workspaceRoute";
import { boardRouter } from "./routes/boardRoute";
import { loginRouter } from "./routes/loginRoute";
import { registerRouter } from "./routes/registerRoute";
import { logoutRouter } from "./routes/logoutRoute";
import { userRouter } from "./routes/userRouter";
import { errorTrackerRouter } from "./routes/errorTrackerRouter";


dotenv.config();
createConnection(connectionConfig);
const app = express();

app.use(session(sessionConfig));
app.use(express.json());


app.use("/register",registerRouter)
app.use("/logout",logoutRouter)
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/ticket", ticketRoute);
app.use("/workspace", workspaceRoute);
app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/errorTracker", errorTrackerRouter);

app.use('/public', express.static('public'));



app.get("/", (req, res) => {
    return res.send("Test from server");
});

app.listen(process.env.PORT || "8080", () => {    
    console.log(`Server running at http://localhost:${process.env.PORT || "8080"}/`);
});

export { app };