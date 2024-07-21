
import { Command } from './types/base';
import { ChatInputCommandInteraction } from 'discord.js';
import { generateGeminiClient } from '../ai/gemini-client';
import { generateSugestMoviePrompt } from '../ai/prompts/sugest-filme';

export class SuggestMovieCommand extends Command {
    constructor() {
        super('sugerir-filme', 'Peça uma sugestão de filme!');
    }

    async execute(interaction: ChatInputCommandInteraction) {

        console.log('Suggesting movie...');

        await interaction.deferReply();

        const { options } = interaction;

        const genre = options.data.find(option => option.name === 'genero')?.value?.toString() || "qualquer";

        try {
            const client = await generateGeminiClient();
            const prompt = generateSugestMoviePrompt({ genre });
            const result = await client.generateContent(prompt);

            const text = result.response.text() || "Desculpe, não consegui sugerir um filme no momento.";

            await interaction.editReply(text);

        } catch (error) {
            console.error('Error generating content:', error);
            await interaction.editReply("Desculpe, ocorreu um erro ao sugerir um filme.");
        }
    }
}
