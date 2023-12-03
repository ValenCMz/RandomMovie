let fetch;
const { listGenres } = require('../Api/movieApi.js');

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default || nodeFetch;
});


const serieApi = {
    randomSerie: async function (msg, client) {
        let nroPagina = Math.floor(Math.random() * 500) + 1;
        let urls = [`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc`,
        `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc`,
        ];

        try {
            const url = urls[Math.floor(Math.random() * urls.length)];
            let json = await getGeneric(url, client);
            return json;

        } catch (error) {
            msg.reply('Hubo un error al obtener los datos.');
            return null;
        }
    },
    randomSerieGenres: async function (msg, client, genre) {


    }
}

async function getGeneric(url, client) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${client.config.token_movie_api}`
        }
    };

    let response = await fetch(url, options);
    let json = await response.json();
    return json;
}

module.exports = serieApi;
