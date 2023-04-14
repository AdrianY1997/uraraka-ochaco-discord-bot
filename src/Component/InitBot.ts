import { CategoryChannel, ChannelType, Guild, PermissionsBitField, TextChannel } from "discord.js";

import defaultConfig from './../Config/default.config.json';
import { setConfig } from '../Config/config';
import { configMessageEmbed, configMessageVariables } from "../Util/Embeds";
import { CustomGuild } from "../Util/types";

export const init = async (guild: Guild) => {

    let configEmbed,
        configVariables,
        configTmp;

    const configChannelName = "uraraka-config";
    const configCategoryName = "Configuration";

    let configCategory = guild.channels.cache.find((guild: { name: string; }) => guild.name == configCategoryName) as CategoryChannel;
    let configChannel = guild.channels.cache.find((guild: { name: string; }) => guild.name == configChannelName);

    if (!configCategory)
        configCategory = await guild.channels.create({
            name: configCategoryName,
            type: ChannelType.GuildCategory,
            position: 0,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: PermissionsBitField.Flags.ViewChannel
                }
            ],
        })

    if (configChannel) {
        const reInitialize = async () => {
            await configChannel?.delete();
            init(guild);
        }

        configChannel = (configChannel as TextChannel);

        const messages = await configChannel.messages.fetch();

        if (messages.size > 2) configChannel.bulkDelete(messages.size - 2)
        if (messages.size < 2) return reInitialize();

        configVariables = messages.first();
        configEmbed = messages.last();

        const actualConfig = JSON.parse(configVariables?.content ?? "");

        if (!actualConfig) return reInitialize();

        configTmp = { ...defaultConfig, ...actualConfig }
    } else {
        configTmp = defaultConfig

        configChannel = await guild.channels.create({
            name: configChannelName,
            type: ChannelType.GuildText,
            parent: configCategory,
        })

        configEmbed = await configChannel.send({
            embeds: [
                await configMessageEmbed(configTmp) //embed
            ]
        })

        configVariables = await configChannel.send({
            content: await configMessageVariables(configTmp) //embed
        })
    }

    configTmp.configChannel = {
        name: configChannel.name,
        id: configChannel.id,
    }
    configTmp.configChannel.embed = { id: configEmbed?.id };
    configTmp.configChannel.message = { id: configVariables?.id }

    return setConfig((guild) as CustomGuild, configTmp);
}