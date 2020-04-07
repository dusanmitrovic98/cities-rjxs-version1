export function drawHtmlElements()
{
  drawHtmlInputElement("inputCityName", document.body);
  
}

function drawHtmlInputElement(inputId, parent)
{
  var input = document.createElement("input");
  input.id = inputId;
  parent.appendChild(input);
  return input;
}