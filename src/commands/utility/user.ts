import { CommandInteraction, Interaction, InteractionType, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Informações do usuário');


export async function execute(interaction: CommandInteraction) {
    await interaction.reply(`This command was run by ${interaction.user.username}`)
}