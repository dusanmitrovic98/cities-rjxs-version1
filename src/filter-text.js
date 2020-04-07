export function filterText(textToBeFiltered)
{
  var filteredText = "";
  textToBeFiltered.split('')
    .forEach((character) => {
      if(character.toLowerCase() != character.toUpperCase())
        filteredText += character;
      if(character == " ")
        filteredText += " ";
    })
  return filteredText;
}

export function filterSpacesForHTTPS(textToBeFiltered)
{

}