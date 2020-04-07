import { from } from 'rxjs';
import { filterText } from './src/filter-text.js';

const URL_TO_FETCH_CITIES =
"https://my-json-server.typicode.com/dusanmitrovic98/cities-rjxs-version1/cities/";

export function subscribeFetchCities()
{
  var citiesObservable = from(
    fetch(URL_TO_FETCH_CITIES)
      .then(response => response.json())
  )
  return citiesObservable;
}

/*
var citiesObservablee = subscribeFetchCities();
citiesObservablee.subscribe(cities => {
  cities.map(city => {
    console.log(city);
  })
})
*/


