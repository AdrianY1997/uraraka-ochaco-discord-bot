import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("ping")
    .setDescription("Ping bot")
    .setCallback(async ({ client, interaction }) => {
        interaction.reply({
            content: `${client.ws.ping}`
        });
    })