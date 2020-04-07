import { from } from 'rxjs';

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

export function subscribeFetchCityById(movieId)
{
    var movieObservable = from(
    fetch(URL_FETCH_MOVIES + movieId)
      .then(response => response.json())
  )
  return movieObservable;
}

export function subscribeFetchActors() {
    var actorsObservable = from(
    fetch(URL_FETCH_ACTORS)
      .then(response => response.json())
  )
  return actorsObservable;
}

export function subscribeFetchActorById(actorId)
{
    var actorObservable = from(
    fetch(URL_FETCH_ACTORS + actorId)
      .then(response => response.json())
  )
  return actorObservable;
}