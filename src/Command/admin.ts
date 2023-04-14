import { ChannelType, PermissionsBitField, TextChannel } from "discord.js";
import { CommandBuilder } from "../Component/Command";
import { PLAYER_INFO, PLAYER_QUEUE } from "../Util/Embeds";
import { setConfig } from "../Config/config";
import { CustomGuild } from "../Util/types";

export default new CommandBuilder()
    .setName("admin")
    .setDescription("Modifica la configuración del servidor")
    .addSubcommand(cmd => cmd.setName("set")
        .setDescription("Asignación")
        .addStringOption(cmd => cmd.setName("target")
            .setDescription("Configuración a asignar")
            .addChoices({
                name: "Canal de música",
                value: "music_channel"
            })
            .setRequired(true))
        .addStringOption(cmd => cmd.setName("nombre")
            .setDescription("Nombre del canal")
            .setRequired(true)))
    .setCallback(async ({ client, interaction }) => {
        const subcommand = interaction.options.getSubcommand(true);
        const target = interaction.options.getString("target")
        const name = interaction.options.getString("nombre")
        const guild = interaction.guild as CustomGuild;

        if (subcommand === "set") {
            if (target === "music_channel") {
                const channels = await interaction.guild.channels.fetch()
                let channel = channels.find(channel => channel?.name === name)

                let player, queue;

                if (!channel) {
                    channel = await interaction.guild.channels.create({
                        name: name!,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                allow: PermissionsBitField.All
                            }
                        ]
                    })

                    player = await channel.send({embeds: [await PLAYER_INFO(undefined, undefined, true)]})
                    queue = await channel.send({ embeds: [await PLAYER_QUEUE(undefined, undefined, true)]})
                } else {
                    channel = channel as TextChannel
                    channel.bulkDelete((await channel.messages.fetch()).size)
                    player = await channel.send({embeds: [await PLAYER_INFO(undefined, undefined, true)]})
                    queue = await channel.send({ embeds: [await PLAYER_QUEUE(undefined, undefined, true)]})
                }

                guild.uraraka_config.musicChannel.id = channel.id
                guild.uraraka_config.musicChannel.player.id = player.id
                guild.uraraka_config.musicChannel.queue.id = queue.id
            }
        }

        setConfig(guild, guild.uraraka_config);

        const msg = await interaction.reply("🕞")
        msg.delete();
    });
