import { Queue, Song } from "distube";
import { CustomDistube } from "./CustomDistube";
import { PLAYER_INFO, PLAYER_QUEUE } from '../Util/Embeds';
import { CustomGuild } from "../Util/types";
import { TextChannel, Message } from 'discord.js';

let msgPlayer: Message | undefined;
let msgQueue: Message | undefined;
let tmpPlayer: Message | undefined;
let tmpQueue: Message | undefined
let isStaticPlayer = true;
let isReactionSet = false;

const addControls = async (player: Message, queue: Queue, song: Song) => {
    const msg = player

    await msg.react("⬅️")
    await msg.react("⏹️")
    await msg.react("⏯️")
    await msg.react("➡️")
    await msg.react("🎵")
    await msg.react("🔁")
    await msg.react("🔀")

    const collector = msg.createReactionCollector();

    collector.on("collect", async (reaction, user) => {
        switch (reaction.emoji.name) {
            case "⬅️": 
                await reaction.users.remove(user.id);
                await queue.previous();
                break;
            case "⏹️": 
                await reaction.users.remove(user.id);
                await queue.stop();
                if (isStaticPlayer) {
                    removeControls(msgPlayer!)
                } else {
                    removeControls(tmpPlayer!)
                }
                break;
            case "⏯️": 
                await reaction.users.remove(user.id);
                if (queue.paused) {
                    queue.resume()
                } else {
                    queue.pause()
                };
                await msgPlayer!.edit({embeds: [await PLAYER_INFO(queue, song)]})
                break;
            case "➡️": 
                await reaction.users.remove(user.id);
                await queue.skip();
                break;
            case "🎵": 
                await reaction.users.remove(user.id)
                queue.toggleAutoplay()
                await msgPlayer!.edit({embeds: [await PLAYER_INFO(queue, song)]})
                break;
            case "🔁": 
                await reaction.users.remove(user.id)
                let mode = queue.repeatMode + 1
                if (mode > 2) mode = 0
                queue.setRepeatMode(mode)
                await msgPlayer!.edit({embeds: [await PLAYER_INFO(queue, song)]})
                break;
            case "🔀": 
                await reaction.users.remove(user.id)
                await queue.shuffle()
                if (isStaticPlayer) {
                    await msgQueue?.edit({ embeds: [await PLAYER_QUEUE(queue, song, true)]})
                }
                break;
        }
    })
}

const removeControls = async (player: Message) => {
    const msg = player

    await msg.edit({embeds: [await PLAYER_INFO(undefined, undefined, true)]})
    await msg.reactions.removeAll()
}

export async function player(distube: CustomDistube) {
    distube.on("initQueue", async (queue: Queue) => {
        queue.autoplay = true;
        queue.volume = 100
    });

    distube.on("playSong", async (queue: Queue, song: Song) => {
        const guild = (queue.textChannel?.guild) as CustomGuild
        const config = guild.uraraka_config;
        if (config.musicChannel.id && config.musicChannel.player.id && config.musicChannel.queue.id) {
            const channel = await guild.channels.fetch(config.musicChannel.id) as TextChannel;
            msgPlayer = await channel.messages.fetch(config.musicChannel.player.id);
            msgQueue = await channel.messages.fetch(config.musicChannel.queue.id);

            msgPlayer.edit({embeds: [await PLAYER_INFO(queue, song)]})
            msgQueue.edit({ embeds: [await PLAYER_QUEUE(queue, song, true)]})

            if (!isReactionSet) {
                isReactionSet = true
                addControls(msgPlayer, queue, song);
            }
        } else {
            isStaticPlayer = false;

            if (tmpPlayer) {
                await tmpPlayer.reactions.removeAll()
            }

            tmpPlayer = await queue.textChannel?.send({
                embeds: [await PLAYER_INFO(queue, song)],
            })!

            addControls(tmpPlayer!, queue, song);
        }

        if (queue.songs.length == 1 && isStaticPlayer) {
            (msgQueue as Message).edit({ embeds: [await PLAYER_QUEUE(undefined, undefined, true)] });
        }
    });

    distube.on("disconnect", async (queue) => {
        if (!isStaticPlayer){
            removeControls(tmpPlayer!);
        } else {
            removeControls(msgPlayer!);
        }

        tmpPlayer = undefined;
        isStaticPlayer = true;
        isReactionSet = false;
    })
}