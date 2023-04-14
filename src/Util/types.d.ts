import { ClientUser, Guild } from "discord.js";

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