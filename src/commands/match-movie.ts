
import { Command } from './types/base';
import { ChatInputCommandInteraction } from 'discord.js';
import { generateGeminiClient } from '../ai/gemini-client';
import { prisma } from '../db/prisma';
import { generateMatchMoviePrompt } from '../ai/prompts/match-movie';

export class MatchMovieCommand extends Command {
    constructor() {
        super('match-movie', 'Diga dois filmes e eu recomendarei um em comum!');
    }

    async execute(interaction: ChatInputCommandInteraction) {

        await interaction.deferReply();

        const { options, user } = interaction;

        const firstMovie = options.data.find(option => option.name === 'primeiro-filme')?.value?.toString()
        const secondMovie = options.data.find(option => option.name === 'segundo-filme')?.value?.toString()

        if (!firstMovie || !secondMovie) {
            await interaction.editReply("Por favor, informe dois filmes para que eu possa sugerir um em comum.");
            return;
        }

        try {
            const client = await generateGeminiClient();
            const prompt = generateMatchMoviePrompt({ firstMovie, secondMovie });
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
