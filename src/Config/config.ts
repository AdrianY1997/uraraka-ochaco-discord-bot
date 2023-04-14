import { Guild, TextChannel } from 'discord.js';
import { CustomGuild, configVariablesTypes } from '../Util/types';
import { configMessageVariables } from '../Util/Embeds';

export const setConfig = async (guild: CustomGuild, config: configVariablesTypes) => {
    
    const configChannel = await guild.channels.fetch(config.configChannel.id)
    const configMessage = await (configChannel as TextChannel).messages.fetch(config.configChannel.message.id);

    guild.uraraka_config = config;

    return await configMessage.edit(await configMessageVariables(config));
}