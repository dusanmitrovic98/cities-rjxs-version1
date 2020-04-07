export function filterText(textToBeFiltered)
{
  filteredText = "";
  textToBeFiltered.split('')
    .forEach((character) => {
      if(character.toLowerCase() != character.toUpperCase())
        filteredText += character;
    })
  return filteredText;
}