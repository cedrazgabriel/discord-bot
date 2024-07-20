import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import 'dotenv/config';

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function main() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error reloading application (/) commands:', error);
    }

    // Cria uma nova instância do client
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    // Evento que é disparado quando o bot está pronto
    client.once('ready', () => {
        console.log('Bot is online!');
    });

    // Evento que é disparado quando o bot recebe uma mensagem
    client.on('messageCreate', message => {
        console.log('Mensagem recebida:', message.content);
        // Responde a mensagem se for "ping"
        if (message.content === 'ping') {
            message.channel.send('Pong!');
        }
    });

    // Evento para comandos de barra
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'ping') {
            await interaction.reply('Olá mundo!');
        }
    });

    // Faz login no bot usando o token do .env
    client.login(process.env.DISCORD_TOKEN);
}

main();
