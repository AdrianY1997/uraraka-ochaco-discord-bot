import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("help")
    .setDescription("Show help for commands")
    .setCallback(async ({ client, interaction }) => {
        const reply = await interaction.reply("Is not configured yet")
        
        setTimeout(() => {
            reply.delete()
        }, 5000);
    });