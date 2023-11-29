let fetch;

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default || nodeFetch;
});

module.exports = {
     randomMovieApi: function(client){
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
            return json;
        
        } catch (error) {
            console.error(error);
            msg.reply('Hubo un error al obtener los datos.');
            return null;
        }
    }
}


