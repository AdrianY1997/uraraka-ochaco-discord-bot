import { Queue, Song } from "distube";
import { CustomDistube } from "./CustomDistube";
import { PLAYER_BUTTONS, PLAYER_INFO } from '../Util/Embeds';
import { TextChannel } from 'discord.js';
import { ButtonBuilder } from '@discordjs/builders';

export async function player(distube: CustomDistube) {
    distube.on("playSong", async (queue: Queue, song: Song) => {
        queue.textChannel?.send({
            embeds: [await PLAYER_INFO(queue, song)],
            components: [PLAYER_BUTTONS]
        })
    })
}