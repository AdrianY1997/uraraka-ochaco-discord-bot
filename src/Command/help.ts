import { CommandBuilder } from "../Component/Command";

export default new CommandBuilder()
    .setName("help")
    .setDescription("Muestra un listado con los comandos y sus usos")
    .setCallback(async ({ client, interaction }) => {
        const reply = await interaction.reply("No esta configurado aun! 😅")
        setTimeout(() => {
            reply.delete()
        }, 5000);
    });