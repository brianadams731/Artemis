require("express-async-errors");
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { app } from "./server";
import connectionConfig from "./utils/connectionConfig";

dotenv.config();
(async function () {
    await createConnection(connectionConfig);
})();

app.use((err:any, req:any, res:any, next:any) => {
    console.log(err);
    return res.status(500).send();
});

app.listen(process.env.PORT || "8080", () => {
    console.log(`Server running at http://localhost:${process.env.PORT || "8080"}/`);
});
