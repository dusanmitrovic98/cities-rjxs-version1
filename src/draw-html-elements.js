import { fromEvent } from 'rxjs';
import { map, sampleTime } from 'rxjs/operators';
import { filterText } from './src/filter-text.js';
import { subscribeFetchCities} from './src/cities-services.js';

export function drawHtmlElements()
{
  const inputCityName = drawHtmlInputElement("inputCityName", document.body);

  fromEvent(inputCityName, "input")
    .pipe(
      sampleTime(1000),
      map(event => event.target.value)
    ).subscribe(textToBeFiltered => {
      const filteredText = filterText(textToBeFiltered);
      inputCityName.value = filteredText;
      
    })

}

function drawHtmlInputElement(inputId, parent)
{
  var input = document.createElement("input");
  input.id = inputId;
  parent.appendChild(input);
  return input;
}