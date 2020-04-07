// Import stylesheets
import './style.css';
import { City } from './src/models/City.js';
import { filterText } from './src/filter-text.js';
import 
{
  subscribeFetchCities
}
from './src/cities-services.js';


// Write Javascript code!

var citiesObservable = subscribeFetchCities();
citiesObservable.subscribe(cities => {
  cities.map(City => {
    console.log(City);
  })
})
