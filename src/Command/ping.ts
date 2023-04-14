import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("ping")
    .setDescription("Hace ping al bot")
    .setCallback(async ({ client, interaction }) => {
        interaction.reply({
            content: `${client.ws.ping}`
        });
    })