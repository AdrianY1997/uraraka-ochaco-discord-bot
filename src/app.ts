import dotenv from "dotenv";
dotenv.config()

import { CustomClient } from "./Component/CustomClient";
import { BOT_TOKEN } from "./Config/Bot";

const client = new CustomClient({
    intents: 3276799
});

client.login(BOT_TOKEN);