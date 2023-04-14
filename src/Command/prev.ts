import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("prev")
    .setDescription("Reproduce la canción anterior")
    .setCallback(async ({ client, interaction }) => {
        client.distube.skip(interaction.guild);
    });
