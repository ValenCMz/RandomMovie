const {randomMovieApi} = require('../Api/movieApi.js');

function randomMovie(msg,client) {
    msg.reply("El comando random funciona");
    let movie = randomMovieApi(client);
    if(movie != null){
        console.log(movie);
        msg.reply(`Hola ${msg.author.username}, la pelicula random es ${movie}`);
    }else{
        msg.reply(`Hola ${msg.author.username}, no se pudo obtener una pelicula random`);
    }
}

module.exports = {randomMovie};