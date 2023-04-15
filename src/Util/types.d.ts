import { ClientUser, Guild } from "discord.js";
import { Queue } from "distube";

export interface configVariablesTypes {
    lang: string
    configChannel: {
        id: string
        message: {
            id: string
        }
    }
    musicChannel: {
        name: string
        id: string
        player: {
            id: string
        }
        queue: {
            id: string
        }
    }
}

export interface CustomGuild extends Guild {
    uraraka_config: configVariablesTypes
}

export interface ControlsDictionary {
    [index: string]: () => Promise<void>
}

export interface PlayerInfo {
    queue: Queue | undefined;
    song: Song | undefined;
    isNew: boolean
}

export interface PlayerQueue {
    queue: Queue | undefined;
    song: Song | undefined;
    isEmpty: boolean
}