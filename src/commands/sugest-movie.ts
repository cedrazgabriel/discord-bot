
import { Command } from './types/base';
import { ChatInputCommandInteraction } from 'discord.js';
import { generateGeminiClient } from '../ai/gemini-client';
import { generateSugestMoviePrompt } from '../ai/prompts/sugest-filme';
import { prisma } from '../db/prisma';

export class SuggestMovieCommand extends Command {
    constructor() {
        super('sugerir-filme', 'Peça uma sugestão de filme!');
    }

    async execute(interaction: ChatInputCommandInteraction) {

        await interaction.deferReply();

        const { options, user } = interaction;

        const genre = options.data.find(option => option.name === 'genero')?.value?.toString() || "qualquer";

        try {
            const client = await generateGeminiClient();
            const prompt = generateSugestMoviePrompt({ genre });
            const result = await client.generateContent(prompt);

            const text = result.response.text();

            await prisma.commandHistory.create({
                data: {
                    command_name: this.name,
                    user_id: user.id,
                    response: text,
                }
            })

            await interaction.editReply(text);

        } catch (error) {
            console.error('Erro ao gerar sugestão de filme:', error);
            await interaction.editReply("Desculpe, ocorreu um erro ao sugerir um filme.");
        }
    }
}
