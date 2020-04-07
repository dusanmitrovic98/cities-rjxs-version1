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
  

  const inputCity = drawInputHtmlElement(document.body, "inputCity", "on");

  const divCityContainer = drawDivHtmlElement(document.body, "","divCityContainer");
  
  fromEvent(inputCity, "input")
    .pipe(
      sampleTime(1000),
      map(event => event.target.value)
      ).subscribe(textToBeFiltered => {
          divCityContainer.querySelectorAll('*').forEach(child => child.remove());
          console.clear();
          const filteredText = filterText(textToBeFiltered);
          inputCity.value = filteredText;
          const citiesObservable = subscribeFetchCityByName(filteredText);
          citiesObservable.subscribe(city => {
            if(city[0])
              const cityDiv = drawDivHtmlElement(divCityContainer, 
                                                `Id: ${city[0].id} | ` + 
                                                `name: ${city[0].name} | ` +
                                                `population: ${city[0].population} | ` + 
                                                `country: ${city[0].country}`
                                                , "cityDataDiv");
            })    
          })
}

function drawInputHtmlElement(parent, id, autocomplete)
{
  var input = document.createElement("input");
  input.id = id;
  input.autocomplete = "off";
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