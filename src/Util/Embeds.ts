import { EmbedBuilder, Colors } from 'discord.js';
import { Queue, Song } from 'distube';

export const PLAYER_INFO = async (queue: Queue, song: Song) => {
    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setAuthor({
            name: `${song.name?.substring(0, 25)}`,
            url: `${song.url}`,
            iconURL: `${song.thumbnail ?? ""}`
        })
        .setFields([
            {
                name: `Duración:`,
                value: `${song.formattedDuration}`,
                inline: true
            },
            {
                name: `Total:`,
                value: `${queue.formattedDuration}`,
                inline: true
            },
            {
                name: `Fuente:`,
                value: `${song.source}`,
                inline: true
            }
        ])
        .setFooter({
            text: `Petición de ${song.member?.nickname}`,
            iconURL: `${song.member?.avatarURL}`
        })
}
export const PLAYER_BUTTONS = {
    type: 1,
    components: [
        {
            "type": 2,
            "style": 1,
            "label": ":arrow_left:",
            "custom_id": "previous_song"
        },
        {
            "type": 2,
            "style": 1,
            "label": ":stop_button:",
            "custom_id": "stop_song"
        },
        {
            "type": 2,
            "style": 1,
            "label": ":play_pause:",
            "custom_id": "play_pause_song"
        },
        {
            "type": 2,
            "style": 1,
            "label": ":arrow_right:",
            "custom_id": "next_song"
        }
    ]
}