import { ActivityType } from 'discord.js';
import { EventBuilder } from '../../../Component/Event';

export default new EventBuilder('ready', true)
    .setCallback(async client => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: "/help",
                    type: ActivityType.Listening,
                }
            ],
            afk: false
        });
        console.log(`${client.user?.username} `)

        // client.guilds.cache.forEach(guild => init(guild));
    })