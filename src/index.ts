import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import 'dotenv/config';

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
    },
    {
        name: 'sugerir-uhu',
        description: 'Peça uma sugestão de uhu!',
    },
    {
        name: 'sugerir-desgrama',
        description: 'Peça uma sugestão de uhu!',
    },
    {
        name: 'sugerir-teste-yasmin',
        description: 'Peça uma sugestão de uhu!',
    },
    {
        name: 'sugerir-teste-cedraz',
        description: 'Peça uma sugestão de uhu!',
    },
    {
        name: 'sugerir-teste-final',
        description: 'Peça uma sugestão de uhu!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function registerCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        // Limpa todos os comandos antigos
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [] });

        // Registra os novos comandos
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error reloading application (/) commands:', error);
    }
}


async function main() {

    registerCommands();

    const commands = await rest.get(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID));
    console.log(commands);

    client.once('ready', () => {
        console.log('Bot is online!');

    });

    client.login(process.env.DISCORD_TOKEN);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'sugerir-filme') {
            console.log('Generating content...');
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

                // Certifique-se de que o método para obter o modelo está correto
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                // Correção na forma de chamar o método para gerar conteúdo
                const prompt = "Me sugira um filme, qualquer um, e não me faça perguntas, só me sugira um filme.";
                const result = await model.generateContent(prompt);

                // Acesso ao texto da resposta
                const text = result.response.text() || "Desculpe, não consegui sugerir um filme no momento.";

                await interaction.reply(text);
            } catch (error) {
                console.error('Error generating content:', error);
                await interaction.reply("Desculpe, ocorreu um erro ao sugerir um filme.");
            }
        }
    });



}

main();
