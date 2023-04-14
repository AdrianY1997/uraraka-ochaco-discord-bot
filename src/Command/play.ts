import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("play")
    .setDescription("Reproduce una canción desde diferentes proveedores")
    .addStringOption(option => 
        option.setName("song")
            .setDescription("La canción a reproducir")
            .setRequired(true)
            .setAutocomplete(true)
    )
    .setCallback(async ({ client, interaction }) => {
        const string = interaction.options.getString("song");
        client.distube.play(interaction.member.voice.channel!, string!, {
            member: interaction.member,
            textChannel: interaction.channel!,
        })
        const msg = await interaction.reply("🕞")
        msg.delete();
    });
