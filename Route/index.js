// Configuraciones del bot
const { Client } = require("discord.js");
const client = new Client({ intents: [131071] });
const { randomMovie, listGenres, randomMovieGenres, randomSerie, randomSerieGenres, listGenresSeries } = require('../Commands/commands.js');
client.config = require('../config.json');

client.login(client.config.token).then(() => {
    client.user.setActivity('!help');
}).catch((err) => console.log(err));

process.on('SIGINT', () => {
    console.log('¡Manually disconnected bot!');
    client.destroy();
    process.exit();
});

const commands = {
    "!rm": randomMovieRoute,
    "!help": showHelpRoute,
    "!mg": listGenresMovieRoute,
    "!sg": listGenresSeriesRoute,
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
        msg.reply("The command does not exist");
    }
});

async function showHelpRoute(msg) {
    let rta = `Hi ${msg.author.username} \n \n **Commands:** \n \n **!rm:** Recommends a random movie \n \n **!mg:** Shows you the list of movie genres \n \n **!rmg:** Recommends a random movie of a specific genre \n \n **!rs:** Recommends a random series \n \n **!sg:** Shows you the list of series genres \n \n **!rsg:** Recommends a random series of a specific genre \n \n **!info:** Shows you bot information`;
    msg.reply(rta);
}

async function randomMovieRoute(msg, client) {
    await randomMovie(msg, client);
}

async function randomMovieGenresRoute(msg, client, genre) {
    if (!genre) return msg.reply('You must enter a genre');
    await randomMovieGenres(msg, client, genre);
}

async function listGenresMovieRoute(msg, client) {
    await listGenres(msg, client);
}

async function randomSerieRoute(msg, client) {
    await randomSerie(msg, client);
}

async function showInforoute(msg) {
    let rta = `Hello ${msg.author.username} \n \n Bot that recommends a random movie or a random series.\n \n **Creator:** Valentin Caminos Martinez \n \n **Version: ** 1.0 \n \n **Github:** https://github.com/ValenCMz`; msg.reply(rta);
}

async function randomSerieGenresRoute(msg, client, genre) {
    await randomSerieGenres(msg, client, genre);
}

async function listGenresSeriesRoute(msg, client) {
    await listGenresSeries(msg, client);
}