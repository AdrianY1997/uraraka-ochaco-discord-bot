import { REST, Routes } from 'discord.js';
import { BOT_CLIENT_ID, BOT_TOKEN } from '../Config/Bot';
import { CustomClient } from '../Component/CustomClient';

export function CommandRegister(client: CustomClient) {
    // const rest = new REST({ version: '10' }).setToken(BOT_TOKEN!);

    // client.once("ready", async () => {
    //     try {
    //         await rest.put(Routes.applicationCommands(BOT_CLIENT_ID!), { body: client.commands });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // })
}
