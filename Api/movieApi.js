let fetch;

import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default || nodeFetch;
});


const movieApi = {
  randomMovieApi: async function (msg, client) {
    let nroPagina = Math.floor(Math.random() * 500) + 1;
    let urls = [`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc`,
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc`,
    ];

    try {
      const url = urls[Math.floor(Math.random() * urls.length)];
      let json = await getGeneric(url, client);
      return json;

    } catch (error) {
      msg.reply('There was an error getting the data.');
      return null;
    }
  }

  ,

  imgById: async function (msg, id, client) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/images`;
      let json = await getGeneric(url, client);
      return json;
    }
    catch (error) {
      msg.reply('There was an error getting the data.');
      return null;
    }
  }

  ,

  listGenres: async function (msg, client) {
    try {
      const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
      let json = await getGeneric(url, client);
      console.log(json);
      return json;
    }
    catch (error) {
      msg.reply('There was an error getting the data.');
      return null;
    }
  }

  ,

  randomMovieGenres: async function (msg, client, genre) {
    try {
      let id_genre = await movieApi.getIdGenre(msg, client, genre);
      let nroPagina = Math.floor(Math.random() * 500) + 1;
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nroPagina}&sort_by=popularity.desc&with_genres=${id_genre}`;
      let json = await getGeneric(url, client);
      return json;
    }
    catch (error) {
      msg.reply('There was an error getting the data.');
      return null;
    }
  },

  getIdGenre: async function (msg, client, genre) {
    try {
      let listGenres = await movieApi.listGenres(msg, client);
      for (let i = 0; i < listGenres.genres.length; i++) {
        if (listGenres.genres[i].name.toLowerCase() == genre.toLowerCase()) {
          return listGenres.genres[i].id;
        }
      }
    } catch (error) {
      msg.reply('There was an error getting the data.');
      return null;
    }
  },

  videoByIdMovie: async function (msg, id, client) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
      let json = await getGeneric(url, client);
      return json;
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

module.exports = movieApi;
