const { randomMovieApi, listGenres, randomMovieGenres, videoByIdMovie } = require('../Api/movieApi.js');
const { randomSerie, randomSerieGenres, videoByIdSerieAndSeasonNumbre, listGenresSeries } = require('../Api/tvSerieApi.js');

module.exports = {
    randomMovie: async function (msg, client) {
        let movies = await randomMovieApi(msg, client);
        if (movies.results.length > 0) {
            await showMovie(movies, msg, client);
        } else {
            msg.reply(`Hello ${msg.author.username}, could not get a random movie`);
        }
    }
    ,
    randomMovieGenres: async function (msg, client, genre) {
        let movies = await randomMovieGenres(msg, client, genre);
        if (movies.results.length > 0) {
            await showMovie(movies, msg, client);
        } else {
            msg.reply(`Hello ${msg.author.username}, could not get a random movie of that genre`);
        }

    }
    ,
    listGenres: async function (msg, client) {
        let genres = await listGenres(msg, client);
        if (genres != null) {
            let rta = `**List of movie genres:** \n \n`;
            for (let i = 0; i < genres.genres.length; i++) {
                rta += `**°${genres.genres[i].name}** \n`;
            }
            console.log(genres);
            msg.reply(rta);
        } else {
            msg.reply(`Hello ${msg.author.username}, could not get genre list`);
        }
    }

    ,
    randomSerie: async function (msg, client) {
        let series = await randomSerie(msg, client);
        if (series.results.length > 0) {
            await showSerie(series, msg, client);
        } else {
            msg.reply(`Hola ${msg.author.username}, no se pudo obtener una serie series`);
        }
    }
    ,
    randomSerieGenres: async function (msg, client, genre) {
        let series = await randomSerieGenres(msg, client, genre);
        if (series.results.length > 0) {
            await showSerie(series, msg, client);
        } else {
            msg.reply(`Hello ${msg.author.username}, could not get a random series`);
        }
    },

    listGenresSeries: async function (msg, client) {
        let genres = await listGenresSeries(msg, client);
        if (genres != null) {
            let rta = `**List of series genres:** \n \n`;
            for (let i = 0; i < genres.genres.length; i++) {
                rta += `**°${genres.genres[i].name}** \n`;
            }
            console.log(genres);
            msg.reply(rta);
        } else {
            msg.reply(`Hello ${msg.author.username}, could not get genre list`);
        }
    }
}

async function showMovie(movies, msg, client) {
    let movie = movies.results[Math.floor(Math.random() * movies.results.length)];
    let video = await videoByIdMovie(msg, movie.id, client);
    if (video && video.results && video.results.length > 0) {
        var videoUrl = `https://www.youtube.com/watch?v=${video.results[0].key}`;
    }
    let imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    if (videoUrl != null && imageUrl != null) {
        let rta = `Hello ${msg.author.username} \n \n **Recommended movie:** ${movie.original_title}\n \n **Description:** ${movie.overview}\n \n **Vote average:** ${movie.vote_average}\n**Poster:**${imageUrl}\n**Trailer:**${videoUrl} `; msg.reply(rta);
    }
    else if (videoUrl == null && imageUrl != null) {
        let rta = `Hello ${msg.author.username} \n \n **Recommended movie:** ${movie.original_title}\n \n **Description:** ${movie.overview}\n \n **Vote average:** ${movie.vote_average}\n**Poster:**${imageUrl}`;
        msg.reply(rta);
    }
}

async function showSerie(series, msg, client) {
    let serie = series.results[Math.floor(Math.random() * series.results.length)];
    if (serie != null) {
        let imageUrl = `https://image.tmdb.org/t/p/original${serie.poster_path}`;
        let rta = `Hello ${msg.author.username} \n \n **Recommended serie:** ${serie.original_name}\n \n **Description:** ${serie.overview}\n \n **Vote average:** ${serie.vote_average}\n**Poster:**${imageUrl}`;
        msg.reply(rta);
    } else {
        msg.reply(`Hello ${msg.author.username}, could not get a random series`);
    }

}
