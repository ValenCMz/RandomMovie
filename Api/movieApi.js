let fetch;

import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default || nodeFetch;
});

module.exports = {
  randomMovieApi: async function (msg, client) {
    // Un numro random entre 1 y 2147483647
    let nroPagina = Math.floor(Math.random() * 500) + 1;

    // Array de urls para hacer el request
    let urls = [`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc`,
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc`,
    ];


    try {
      const url = urls[Math.floor(Math.random() * urls.length)];
      console.log(url);
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

  ,

  imgById: async function (msg, id, client) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/images`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${client.config.token_movie_api}`
        }
      };
      let response = await fetch(url, options);
      let json = await response.json();
      console.log(json);
      return json;
    }
    catch (error) {
      console.error(error);
      msg.reply('Hubo un error al obtener los datos.');
      return null;
    }

  }
}


