// Configuraciones del bot
const { Client } = require("discord.js");
const client = new Client({ intents: [131071] });
client.config = require('./config.json');
let fetch;

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default || nodeFetch;
});

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
    if (msg.content.toLowerCase() === 'peliculas') {
        try {
            const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${client.config.token_movie_api}`
              }
            };
            
            fetch(url, options)
              .then(res => res.json())
              .then(json => console.log(json))
              .catch(err => console.error('error:' + err));
       
        } catch (error) {
            console.error(error);
            msg.reply('Hubo un error al obtener los datos.');
        }
    }
});

