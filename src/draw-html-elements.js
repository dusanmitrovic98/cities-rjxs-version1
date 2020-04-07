require('rxjs');
require('rxjs/operators');
import { subscribeFetchCities} from './src/cities-services.js';

export function drawHtmlElements()
{
  const inputCityName = drawHtmlInputElement("inputCityName", document.body);

  const clicks = fromEvent(document, 'click');
const result = clicks.pipe(sampleTime(1000));
result.subscribe(x => console.log(x));
 /* fromEvent(inputCityName, "input")
    .pipe(
      sampleTime(1000),

    )*/

}

function drawHtmlInputElement(inputId, parent)
{
  var input = document.createElement("input");
  input.id = inputId;
  parent.appendChild(input);
  return input;
}