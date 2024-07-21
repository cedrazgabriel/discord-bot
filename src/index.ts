import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client, Embed, EmbedBuilder, GatewayIntentBits, REST, Routes } from 'discord.js';
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

        const { commandName, options } = interaction;

        if (commandName === 'sugerir-filme') {

            await interaction.deferReply();

            console.log('Generating content...');

            const genre = options.data.find(option => option.name === 'genero')?.value || "qualquer";

            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

                // Certifique-se de que o método para obter o modelo está correto
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                // Correção na forma de chamar o método para gerar conteúdo
                const prompt = `Me sugira um filme de ${genre}, e não me faça perguntas, só me sugira um filme e também onde eu posso assitir, junto com os links do stream onde eu posso assistir. traga também uma imagem do filme para fazer tipo um cartaz`;

                console.log('pediu a ia')
                const result = await model.generateContent(prompt);

                console.log(result.response.text())

                // Acesso ao texto da resposta
                const text = result.response.text() || "Desculpe, não consegui sugerir um filme no momento.";

                const embed = new EmbedBuilder()
                    .setTitle('Sugestão de Filme')
                    .setDescription(text)
                    .setColor('#0099ff');

                await interaction.editReply({ embeds: [embed] });

            } catch (error) {
                console.error('Error generating content:', error);
                await interaction.reply("Desculpe, ocorreu um erro ao sugerir um filme.");
            }
        }
    });



}

main();
