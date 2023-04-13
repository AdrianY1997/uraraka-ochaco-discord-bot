import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("prev")
    .setDescription("Play the previous song in the list")
    .setCallback(async ({ client, interaction }) => {
        client.distube.skip(interaction.guild);
    });
