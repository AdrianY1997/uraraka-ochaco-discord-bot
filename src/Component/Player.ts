import { Queue, Song } from "distube";
import { CustomDistube } from "./CustomDistube";
import { ADDING_SONG, PLAYER_INFO, PLAYER_NO_PREVIOUS, PLAYER_QUEUE } from '../Util/Embeds';
import { ControlsDictionary, CustomGuild } from '../Util/types';
import { TextChannel, Message, MessageReaction, User } from 'discord.js';

let msgPlayer: Message | undefined;
let msgQueue: Message | undefined;
let tmpPlayer: Message | undefined;
let isStaticPlayer = true;
let isReactionSet = false;

const addControls = async (queue: Queue, song: Song) => {
    const msg = isStaticPlayer ? msgPlayer! : tmpPlayer!;

    await msg.react("⬅️")
    await msg.react("⏹️")
    await msg.react("⏯️")
    await msg.react("➡️")
    await msg.react("🎵")
    await msg.react("🔁")
    await msg.react("🔀")
    if (!isStaticPlayer) await msg.react("📰")

    const filter = (reaction: MessageReaction, user: User) => { return user.id !== queue.textChannel?.guild.members.me?.id };
    const collector = msg.createReactionCollector({filter});

    collector.on("collect", async (reaction, user) => {
        const emoji = reaction.emoji.name ?? "";

        const controls = {
            "⬅️": async () => {
                await reaction.users.remove(user.id);
                if (queue.previousSongs.length > 0) await queue.previous();
                else await updateQueue(queue, song, false, 1);
            },
            "⏹️": async () => {
                await reaction.users.remove(user.id);
                await queue.stop();
                updateQueue(undefined, undefined, true)
                collector.stop()
            },
            "⏯️": async () => {
                await reaction.users.remove(user.id);
                if (queue.paused) queue.resume();
                else queue.pause();
                await updatePlayer(queue, song, false)
            },
            "➡️": async () => {
                await reaction.users.remove(user.id);
                await queue.skip();
            },
            "🎵": async () => {
                await reaction.users.remove(user.id)
                queue.toggleAutoplay()
                await updatePlayer(queue, song, false)
            },
            "🔁": async () => {
                await reaction.users.remove(user.id)
                let mode = queue.repeatMode + 1
                if (mode > 2) mode = 0
                queue.setRepeatMode(mode)
                await updatePlayer(queue, song, false)
            },
            "🔀": async () => {
                await reaction.users.remove(user.id)
                await queue.shuffle()
                await updateQueue(queue, song, false);
            },
            "📰": async () => {
                await reaction.users.remove(user.id)
                await updateQueue(queue, song, false, 2);
            }
        } as ControlsDictionary;

        controls[emoji]();
    })
}

const removeControls = async () => {
    const msg = isStaticPlayer ? msgPlayer! : tmpPlayer!;
    await msg.edit({
        embeds: [await PLAYER_INFO({
            queue: undefined,
            song: undefined,
            isNew: true
        })]
    })
    if (!isStaticPlayer) setTimeout(() => {
        msg.delete();
    }, 5000);
    await msg.reactions.removeAll()
    isReactionSet = false;
}

const updatePlayer = async (queue: Queue | undefined, song: Song | undefined, isNew: boolean, error: number = 0) => {
    const msg = isStaticPlayer ? msgPlayer! : tmpPlayer!;
    await msg.edit({
        embeds: [await PLAYER_INFO({
            queue: queue,
            song: song,
            isNew: false
        })]
    })
}

const updateQueue = async (queue: Queue | undefined, song: Song | undefined, isEmpty: boolean, trigger: number = 0) => {
    const NO_PREVIOUS = 1;
    const SHOW_LIST = 2;
    const SONG_ADDED = 3;

    if (isStaticPlayer) {
        if (!trigger) {
            msgQueue?.edit({
                embeds: [await PLAYER_QUEUE({
                    queue: queue,
                    song: song,
                    isEmpty: isEmpty
                })]
            })
        }
        if (trigger == NO_PREVIOUS) {
            msgQueue?.edit({
                embeds: [await PLAYER_NO_PREVIOUS()]
            });
            setTimeout(async () => await updateQueue(queue, song, false), 5000);
        }
    } else {
        if (trigger == NO_PREVIOUS) queue?.textChannel?.send({ embeds: [await PLAYER_NO_PREVIOUS()] })
        if (trigger == SHOW_LIST) queue?.textChannel?.send({
            embeds: [await PLAYER_QUEUE({
                queue: queue,
                song: song,
                isEmpty: false,
            })]
        })
        if (trigger == SONG_ADDED) queue?.textChannel?.send({
            embeds: [await ADDING_SONG({
                queue: queue,
                song: song,
                isEmpty: false,
            })]
        })
    }
}

export async function player(distube: CustomDistube) {
    distube.on("initQueue", async (queue: Queue) => {
        queue.autoplay = true;
        queue.volume = 50
    });

    distube.on("playSong", async (queue: Queue, song: Song) => {
        const guild = (queue.textChannel?.guild) as CustomGuild
        const config = guild.uraraka_config;
        if (config.musicChannel.id && config.musicChannel.player.id && config.musicChannel.queue.id) {
            const channel = await guild.channels.fetch(config.musicChannel.id) as TextChannel;
            msgPlayer = await channel.messages.fetch(config.musicChannel.player.id);
            msgQueue = await channel.messages.fetch(config.musicChannel.queue.id);
            await updatePlayer(queue, song, false);
            if (!isReactionSet) {
                isReactionSet = true
                addControls(queue, song);
            }
        } else {
            isStaticPlayer = false;

            if (tmpPlayer) removeControls()

            tmpPlayer = await queue.textChannel?.send({
                embeds: [await PLAYER_INFO({
                    queue: queue,
                    song: song,
                    isNew: false
                })],
            })!

            addControls(queue, song);
        }

        await updateQueue(queue, song, false);
    });

    distube.on("addSong", async (queue: Queue, song: Song) => await updateQueue(queue, song, false, 3))

    distube.on("disconnect", async (queue) => {
        removeControls();
        tmpPlayer = undefined;
        isStaticPlayer = true;
        isReactionSet = false;
    })
}