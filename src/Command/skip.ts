import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("skip")
    .setDescription("Salta la canción actual")
    .setCallback(async ({ client, interaction }) => {
        client.distube.previous(interaction.guild);
    });
