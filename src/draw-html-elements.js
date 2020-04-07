require('rxjs');
require('rxjs/operators');
import { subscribeFetchCities} from './src/cities-services.js';

export function drawHtmlElements()
{
  const inputCityName = drawHtmlInputElement("inputCityName", document.body);

  fromEvent(inputCityName, "input")

}

function drawHtmlInputElement(inputId, parent)
{
  var input = document.createElement("input");
  input.id = inputId;
  parent.appendChild(input);
  return input;
}