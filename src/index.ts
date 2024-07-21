import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatInputCommandInteraction, Client, Embed, EmbedBuilder, GatewayIntentBits, REST, Routes } from 'discord.js';
import 'dotenv/config';
import { executeCommand } from './commands/config/manager';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const commands = [
    {
        name: 'sugerir-filme',
        description: 'Peça uma sugestão de filme!',
        options: [
            {
                type: 3, // Tipo "STRING"
                name: 'genero',
                description: 'Especifique o gênero do filme',
                required: false,
            }
        ],
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function registerCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        // Registra os novos comandos
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error reloading application (/) commands:', error);
    }
}


async function main() {

    // registerCommands();

    const commands = await rest.get(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID));
    console.log(commands);

    client.once('ready', () => {
        console.log('Bot is online!');

    });

    client.login(process.env.DISCORD_TOKEN);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (interaction instanceof ChatInputCommandInteraction) {
            const { commandName } = interaction;
            await executeCommand(commandName, interaction);
        } else {
            console.error('Invalid interaction type.');
            await interaction.reply("Desculpe, tipo de interação inválido para este comando.");
        }
    })




}

main();
