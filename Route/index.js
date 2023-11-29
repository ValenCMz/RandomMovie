// Configuraciones del bot
const { Client } = require("discord.js");
const client = new Client({ intents: [131071] });
const { randomMovie } = require('../Commands/commands.js');
client.config = require('../config.json');


client.login(client.config.token).then(() => {
    console.log(`Cliente iniciado como ${client.user.username}! `);
    client.user.setActivity('Estoy en desarrollo');
}).catch((err) => console.log(err));


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

process.on('SIGINT', () => {
    console.log('¡Bot desconectado manualmente!');
    client.destroy();
    process.exit();
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith("!")) {
        switch (msg.content) {
            case "!random":
                randomMovie(msg, client);
                break;
            default:
                msg.reply("El comando no es correcto");
                break;
        }
    } else {
        msg.reply("No es un comando valido");

    }
});

