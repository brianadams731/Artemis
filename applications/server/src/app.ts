import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { app } from "./server";
import connectionConfig from "./utils/connectionConfig";

dotenv.config();
(async function () {
    await createConnection(connectionConfig);
})();


app.listen(process.env.PORT || "8080", () => {
    console.log(`Server running at http://localhost:${process.env.PORT || "8080"}/`);
});
