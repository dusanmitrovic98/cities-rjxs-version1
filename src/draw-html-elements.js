import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';
import { filterText } from './filter-text.js';
import 
{ 
  subscribeFetchCities,
  subscribeFetchCityByName
}
from './cities-services.js';

export function drawHtmlElements()
{
  const inputCityName = drawHtmlInputElement("inputCity", document.body);
  inputCityName.autocomplete = "on";

  fromEvent(inputCityName, "input")
    .pipe(
      sampleTime(1000),
      map(event => event.target.value)
    ).subscribe(textToBeFiltered => {
      console.clear();
      const filteredText = filterText(textToBeFiltered);
      inputCityName.value = filteredText;
      const citiesObservable = subscribeFetchCityByName(filteredText);
      citiesObservable.subscribe(city => {
        console.log(city[0]);
      })
      
    })

}

function drawHtmlInputElement(inputId, parent)
{
  var input = document.createElement("input");
  input.id = inputId;
  parent.appendChild(input);
  return input;
}