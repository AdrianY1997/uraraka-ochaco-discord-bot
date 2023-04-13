import { Queue, Song } from "distube";
import { CustomDistube } from "./CustomDistube";
import { PLAYER_INFO } from '../Util/Embeds';

export async function player(distube: CustomDistube) {
    distube.on("initQueue", async (queue: Queue) => {
        
    })

    distube.on("playSong", async (queue: Queue, song: Song) => {
        const message = await queue.textChannel?.send({
            embeds: [await PLAYER_INFO(queue, song)],
        })

        await message?.react("⬅️")
        await message?.react("⏹️")
        await message?.react("⏯️")
        await message?.react("➡️")
    })
}