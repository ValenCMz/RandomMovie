const { randomMovieApi, imgById } = require('../Api/movieApi.js');

async function randomMovie(msg, client) {
    let movies = await randomMovieApi(msg, client);
    if (movies != null) {
        //De todas las peliculas debo elegir una random
        let movie = movies.results[Math.floor(Math.random() * movies.results.length)];
        let img = await imgById(msg, movie.id, client);
        let imagePath = img.backdrops[0].file_path;
        let imageUrl = `https://image.tmdb.org/t/p/original${imagePath}`;
        if (img != null) {
            let rta = `Hola ${msg.author.username} \n \n **Pelicula recomendada:** ${movie.original_title} \n \n**Descripcion:** ${movie.overview} \n \n**Promedio de votos:** ${movie.vote_average} \n \n**Imagen:** ${imageUrl}`;
            msg.reply(rta);
        }
    } else {
        msg.reply(`Hola ${msg.author.username}, no se pudo obtener una pelicula random`);
    }
}

module.exports = { randomMovie };