import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("play")
    .setDescription("Play Songs from YouTube | Spotify")
    .addStringOption(option => 
        option.setName("song")
            .setDescription("Select the song")
    )
    .setCallback(async ({ client, interaction }) => {
        const string = interaction.options.getString("song");
        if (!string) return interaction.reply(`❌ | Please enter a song url or query to search.`)
        client.distube.play(interaction.member.voice.channel!, string, {
            member: interaction.member,
            textChannel: interaction.channel!,
        })

        const queue = client.distube.getQueue(interaction.guild)

        if (queue?.autoplay == false) queue?.toggleAutoplay()
        
        const msg = await interaction.reply("ready")
        msg.delete();
    });
