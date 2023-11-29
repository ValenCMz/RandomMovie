let fetch;

import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default || nodeFetch;
});

module.exports = {
  randomMovieApi: async function (client) {
    try {
      const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
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

    } catch (error) {
      console.error(error);
      msg.reply('Hubo un error al obtener los datos.');
      return null;
    }
  }
}


