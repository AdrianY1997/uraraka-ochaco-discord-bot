import { ApplicationCommandChoicesData, AutocompleteInteraction, ChannelType } from 'discord.js';
import { EventBuilder } from '../../../Component/Event';


export default new EventBuilder('interactionCreate')
    .setCallback(async (client, interaction) => {

        if (interaction.isAutocomplete()) {
            const song = interaction.options.getString("song")
            if (song) {
                const related = (await client.distube.search(song)).map(r => r.name)

                interaction.respond(related.map(r => ({name: r ?? "", value: r ?? ""})));
            }
        }

        if (!interaction.isChatInputCommand()) return;

        if (interaction.channel && interaction.channel.type == ChannelType.DM) {
            return interaction.reply({
                content: 'No puedes usar comandos en MD',
                ephemeral: true
            })
        }

        if (!interaction.inCachedGuild()) {
            await interaction.guild?.fetch();
            return interaction.reply({
                content: "Guardando el servidor en cache",
                ephemeral: true
            })
        }

        const { commandName } = interaction;

        const command = client.commands.get(commandName);

        if (!command) {
            return interaction.reply({
                content: 'No se encontró el comando',
                ephemeral: true
            })
        }

        await command.callback({ client, interaction });
        return void 0;
    })