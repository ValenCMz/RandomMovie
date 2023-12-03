const { randomMovieApi, listGenres, randomMovieGenres, videoByIdMovie } = require('../Api/movieApi.js');
const { randomSerie } = require('../Api/tvSerieApi.js');

module.exports = {
    randomMovie: async function (msg, client) {
        let movies = await randomMovieApi(msg, client);
        if (movies != null) {
            await showMovie(movies, msg, client);
        } else {
            msg.reply(`Hola ${msg.author.username}, no se pudo obtener una pelicula random`);
        }
    }
    ,
    randomMovieGenres: async function (msg, client, genre) {
        let movies = await randomMovieGenres(msg, client, genre);
        if (movies != null) {
            await showMovie(movies, msg, client);
        } else {
            msg.reply(`Hola ${msg.author.username}, no se pudo obtener una pelicula random de ese genero`);
        }

    }
    ,
    listGenres: async function (msg, client) {
        let genres = await listGenres(msg, client);
        if (genres != null) {
            let rta = `**Lista de generos:** \n \n`;
            for (let i = 0; i < genres.genres.length; i++) {
                rta += `**°${genres.genres[i].name}** \n`;
            }
            console.log(genres);
            msg.reply(rta);
        } else {
            msg.reply(`Hola ${msg.author.username}, no se pudo obtener la lista de generos`);
        }
    }

    ,
    randomSerie: async function (msg, client) {
        let series = await randomSerie(msg, client);
        if (series != null) {
            await showSerie(series, msg, client);
        } else {
            msg.reply(`Hola ${msg.author.username}, no se pudo obtener una serie random`);
        }
    }
    ,
    randomSerieGenres: async function (msg, client, genre) {
        let series = await randomSerieGenres(msg, client, genre);
        if (series != null) {
            await showSerie(series, msg, client);
        } else {
            msg.reply(`Hola ${msg.author.username}, no se pudo obtener una serie random de ese genero`);
        }
    }

}

async function showMovie(movies, msg, client) {
    let movie = movies.results[Math.floor(Math.random() * movies.results.length)];
    console.log(movie);
    let video = await videoByIdMovie(msg, movie.id, client);
    if (video && video.results && video.results.length > 0) {
        var videoUrl = `https://www.youtube.com/watch?v=${video.results[0].key}`;
    }
    let imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    if (videoUrl != null && imageUrl != null) {
        let rta = `Hola ${msg.author.username} \n \n **Pelicula recomendada:** ${movie.original_title}\n \n**Descripcion:** ${movie.overview}\n \n**Promedio de votos:** ${movie.vote_average}\n**Poster:**${imageUrl}\n**Trailer:**${videoUrl} `;
        msg.reply(rta);
    }
    else if (videoUrl == null && imageUrl != null) {
        let rta = `Hola ${msg.author.username} \n \n **Pelicula recomendada:** ${movie.original_title}\n \n**Descripcion:** ${movie.overview}\n \n**Promedio de votos:** ${movie.vote_average}\n**Poster:**${imageUrl}`;
        msg.reply(rta);
    }
}

async function showSerie(series, msg, client) {
    let serie = series.results[Math.floor(Math.random() * series.results.length)];
    let imageUrl = `https://image.tmdb.org/t/p/original${serie.poster_path}`;
    let rta = `Hola ${msg.author.username} \n \n **Serie recomendada:** ${serie.original_name}\n \n**Descripcion:** ${serie.overview}\n \n**Promedio de votos:** ${serie.vote_average}\n**Poster:**${imageUrl}`;
    msg.reply(rta);
}
