import { CustomClient } from "../Component/CustomClient";
import * as fs from 'fs';
import * as path from 'path';
import { SlashCommandBuilder } from 'discord.js';
import { CommandBuilder } from "../Component/Command";

export async function CommandHandler(client: CustomClient) {

    const commands = fs.readdirSync(path.join(__dirname, "..", "Command"));

    for (const commandFile of commands) {
        const { default: cmd }: { default: CommandBuilder } = await import(path.join(__dirname, "..", "Command", commandFile))

        client.commands.set(cmd.name, cmd);
    }

    client.once("ready", () => {
        client.application?.commands.set(client.commands.map((cmd: { toJSON: () => any; }) => cmd.toJSON()));
    })
}