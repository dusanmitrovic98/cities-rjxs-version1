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
  const divCitiesList = drawDivHtmlElement(document.body, 
                                          "List of cities in our database:",  
                                          "divCitiesList");

  const divDitiesListContainer = drawDivHtmlElement(document.body,
                                                    "",
                                                    "divDitiesListContainer");

  drawCitiesList();

  const inputCity = drawInputHtmlElement(document.body, "inputCity", "off");

  const divCityContainer = drawDivHtmlElement(document.body, "", "divCityContainer");
  
  drawInputCityData(inputCity);

  drawHideDivButtonHtlmElement(document.body, "Movies and actors RXJS version", "hideButton");
}

function drawInputHtmlElement(parent, id, autocomplete)
{
  const input = document.createElement("input");
  input.id = id;
  input.autocomplete = "off";
  parent.appendChild(input);
  return input;
}

function drawDivHtmlElement(parent, innerHtml, id)
{
  const div = document.createElement("div");
  div.innerHTML = innerHtml;
  div.id = id;
  parent.appendChild(div);
  return div;
}

function drawHideDivButtonHtlmElement(parent, innerHtml, id)
{
  const button = document.createElement("a");
  button.id = id;
  button.innerHTML = innerHtml;
  button.className = "btn btn-secondary text-white";

  parent.appendChild(button);
  button.onclick = () => {
    
    var container = document.getElementById("container");
    if (container.style.display === "block") 
    {
      container.style.display = "none";
    } 
    else 
    {
      container.style.display = "block";
      button.href = "#container";
    }
  }
}

function drawInputCityData(inputCity)
{
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
              const divCity = drawDivHtmlElement(divCityContainer, 
                                                `Id: ${city[0].id} | ` + 
                                                `name: ${city[0].name} | ` +
                                                `population: ${city[0].population} | ` + 
                                                `country: ${city[0].country}`
                                                , "cityDataDiv");
            })    
          })
}

function drawCitiesList()
{
  divDitiesListContainer.querySelectorAll('*').forEach(child => child.remove());
  subscribeFetchCities()
    .subscribe(cities => {
      cities.map(city => {
        const divCityListElement = drawDivHtmlElement(divDitiesListContainer,
                                                      `${city.id}. ${city.name}`,
                                                      "divCityListElement")
      })
    })
}