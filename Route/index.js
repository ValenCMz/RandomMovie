// Configuraciones del bot
const { Client } = require("discord.js");
const client = new Client({ intents: [131071] });
const { randomMovie, listGenres, randomMovieGenres, randomSerie, randomSerieGenres } = require('../Commands/commands.js');
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

const commands = {
    "!rm": randomMovieRoute,
    "!help": showHelpRoute,
    "!genres": listGenresRoute,
    "!rmg": randomMovieGenresRoute,
    "!rs": randomSerieRoute,
    "!rsg": randomSerieGenresRoute,
    "!info": showInforoute
}

client.on('messageCreate', async (msg) => {
    if (msg.author.bot || !msg.content.startsWith("!")) return;

    const command = msg.content.split(" ")[0];
    if (commands.hasOwnProperty(command)) {
        const args = msg.content.split(" ").slice(1);
        commands[command](msg, client, ...args);
    } else {
        msg.reply("El comando no existe");
    }
});

async function showHelpRoute(msg) {
    let rta = `Hola ${msg.author.username} \n \n **Lista de comandos:** \n \n **!rm** : Recomienda una pelicula random \n \n **!rmg** : Recomienda una pelicula random de un genero especifico \n \n **!rs** : Recomienda una serie random \n \n **!genres** : Muestra la lista de generos disponibles \n \n **!info** : Muestra informacion del bot \n \n **!help** : Muestra la lista de comandos disponibles`;
    msg.reply(rta);
}

async function randomMovieRoute(msg, client) {
    await randomMovie(msg, client);
}

async function randomMovieGenresRoute(msg, client, genre) {
    await randomMovieGenres(msg, client, genre);
}

async function listGenresRoute(msg, client) {
    await listGenres(msg, client);
}

async function randomSerieRoute(msg, client) {
    await randomSerie(msg, client);
}

async function showInforoute(msg) {
    let rta = `Hola ${msg.author.username} \n \n **Informacion del bot:** \n \n **Creador:** Valentin Caminos Martinez \n \n **Version:** 1.0 \n \n **Fecha de creacion:** 24/10/2021`;
    msg.reply(rta);
}

async function randomSerieGenresRoute(msg, client, genre) {
    await randomSerieGenres(msg, client, genre);
}