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
  const inputCity = drawInputHtmlElement("inputCity", document.body);

  fromEvent(inputCity, "input")
    .pipe(
      sampleTime(1000),
      map(event => event.target.value)
    ).subscribe(textToBeFiltered => {
      console.clear();
      const filteredText = filterText(textToBeFiltered);
      inputCity.value = filteredText;
      const citiesObservable = subscribeFetchCityByName(filteredText);
      citiesObservable.subscribe(city => {
          var div = drawDivHtmlElement(document.body, "skdoak", "cityDataDiv");
      })      
    })

}

function drawInputHtmlElement(parent, id)
{
  var input = document.createElement("input");
  input.id = id;
  parent.appendChild(input);
  return input;
}

function drawDivHtmlElement(parent, innerHtml, id)
{
  var div = document.createElement("div");
  div.innerHTML = innerHtml;
  div.id = id;
  parent.appendChild(div);
  return div;
}