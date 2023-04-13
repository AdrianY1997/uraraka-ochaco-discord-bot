import { ButtonBuilder } from '@discordjs/builders';
import { EmbedBuilder, Colors, Emoji, GuildEmoji, ButtonStyle } from 'discord.js';
import { Queue, Song } from 'distube';

export const PLAYER_INFO = async (queue: Queue, song: Song) => {

    return new EmbedBuilder()
        .setColor(Colors.LuminousVividPink)
        .setAuthor({
            name: `${song.name?.substring(0, 25)}...`,
            url: song.url,
            iconURL: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png"
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
        .setThumbnail(song.thumbnail!)
        .setFooter({
            text: `Petición de ${song.member?.nickname}`,
            // iconURL: `${song.member?.avatarURL}`
        })
}