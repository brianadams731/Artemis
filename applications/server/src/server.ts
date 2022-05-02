import express from "express";
import session from "express-session";
import { sessionConfig } from "./utils/sessionConfig";

import { ticketRoute } from "./routes/ticketRoute";
import { workspaceRoute } from "./routes/workspaceRoute";
import { boardRouter } from "./routes/boardRoute";
import { loginRouter } from "./routes/loginRoute";
import { registerRouter } from "./routes/registerRoute";
import { logoutRouter } from "./routes/logoutRoute";
import { userRouter } from "./routes/userRouter";
import { errorTrackerRouter } from "./routes/errorTrackerRouter";

const app = express();

app.use(session(sessionConfig));
app.use(express.json());

app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/ticket", ticketRoute);
app.use("/workspace", workspaceRoute);
app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/errorTracker", errorTrackerRouter);

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    return res.send("Test from server");
});

export { app };
