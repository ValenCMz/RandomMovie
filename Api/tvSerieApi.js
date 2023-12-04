let fetch;

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
            msg.reply('There was an error getting the data.');
            return null;
        }
    },
    randomSerieGenres: async function (msg, client, genre) {
        let id_genre = await serieApi.getIdGenre(msg, client, genre);
        let nroPagina = Math.floor(Math.random() * 500) + 1;
        const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc&with_genres=${id_genre}`;
        try {
            let json = await getGeneric(url, client);
            return json;
        }
        catch (error) {
            msg.reply('There was an error getting the data.');
            return null;
        }
    }
    ,
    videoByIdSerieAndSeasonNumbre: async function (msg, id, client) {
        try {
            const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
            let json = await getGeneric(url, client);
            return json;
        }
        catch (error) {
            msg.reply('Hubo un error al obtener los datos.');
            return null;
        }
    },

    listGenresSeries: async function (msg, client) {
        try {
            const url = `https://api.themoviedb.org/3/genre/tv/list?language=en`;
            let json = await getGeneric(url, client);
            return json;
        }
        catch (error) {
            msg.reply('Hubo un error al obtener los datos.');
            return null;
        }
    },

    getIdGenre: async function (msg, client, genre) {
        try {
            let genres = await serieApi.listGenres(msg, client);
            for (let i = 0; i < genres.genres.length; i++) {
                if (genres.genres[i].name.toLowerCase() == genre.toLowerCase()) {
                    return genres.genres[i].id;
                }
            }
            return null;
        }
        catch (error) {
            msg.reply('There was an error getting the data.');
            return null;
        }
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
