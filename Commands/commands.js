const { randomMovieApi } = require('../Api/movieApi.js');

async function randomMovie(msg, client) {
    let movies = await randomMovieApi(client);
    if (movies != null) {
        //De todas las peliculas debo elegir una random
        let movie = movies.results[Math.floor(Math.random() * movies.results.length)];
        console.log(movie);
        let rta = `Hola ${msg.author.username} \n \n Pelicula recomendada: ${movie.original_title} \n \n Descripcion: ${movie.overview} \n \n Promedio de votos: ${movie.vote_average}`
        msg.reply(rta);
    } else {
        msg.reply(`Hola ${msg.author.username}, no se pudo obtener una pelicula random`);
    }
}

module.exports = { randomMovie };