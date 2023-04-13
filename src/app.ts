import * as http from "http"
import dotenv from "dotenv";
dotenv.config()

import { CustomClient } from "./Component/CustomClient";
import { BOT_TOKEN } from "./Config/Bot";

http.createServer((req, res) => {
    res.write("I'm alive");
    res.end();
}).listen(8080)

const client = new CustomClient({
    intents: 3276799
});

client.login(BOT_TOKEN);