//Links to our database;
const URL_FETCH_MOVIES =
  "https://my-json-server.typicode.com/dusanmitrovic98/movies-and-actors-version2/movies/";
const URL_FETCH_ACTORS =
  "https://my-json-server.typicode.com/dusanmitrovic98/movies-and-actors-version2/actors/";

export function subscribeFetchMovies() {
    var moviesObservable = from(
    fetch(URL_FETCH_MOVIES)
      .then(response => response.json())
  )
  return moviesObservable;
}

export async function getMoviesById(movieId) {
  return await (await fetch(URL_FETCH_MOVIES + movieId)
    .catch(errorHandler))
      .json();
}

export function subscribeFetchActors() {
    var actorsObservable = from(
    fetch(URL_FETCH_MOVIES)
      .then(response => response.json())
  )
  return actorsObservable;
}

export async function getActorsById(actorId) {
  return await (await fetch(URL_FETCH_ACTORS + actorId)
    .catch(errorHandler))
      .json();
}

function errorHandler(error) {
  console.warr(error);
  let response = new Response(
    JSON.stringify({
      message: "fetch error!"
    })
  );
  return response;
}
