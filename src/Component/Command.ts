import {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder
} from '@discordjs/builders';
import {
    ChatInputCommandInteraction, Message,
} from "discord.js";
import { CustomClient } from './CustomClient';

export class CommandBuilder extends SlashCommandBuilder {
    public callback!: CommandFunction;

    public setCallback(fn: CommandFunction) {
        this.callback = fn;
        return this;
    }

    public override addSubcommand(
        input:
            | SlashCommandSubcommandBuilder
            | ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)
    ) {
        super.addSubcommand(input)
        return this;
    }

    public override addSubcommandGroup(
        input:
            | SlashCommandSubcommandGroupBuilder
            | ((subcommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)
    ) {
        super.addSubcommandGroup(input);
        return this;
    }
}

type CommandFunction = (idk: {
    client: CustomClient;
    interaction: ChatInputCommandInteraction<'cached'>;
}) => unknown;