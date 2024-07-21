import { ChatInputCommandInteraction } from "discord.js";
import { SuggestMovieCommand } from "../sugest-movie.js";


const commandsMap = new Map([
    ['sugerir-filme', new SuggestMovieCommand()],
]);

export async function executeCommand(commandName: string, interaction: ChatInputCommandInteraction) {
    const command = commandsMap.get(commandName);

    if (command) {
        await command.execute(interaction);
    } else {
        console.error(`Comando "${commandName}" não encontrado.`);
        await interaction.reply("Desculpe, comando não encontrado.");
    }
}