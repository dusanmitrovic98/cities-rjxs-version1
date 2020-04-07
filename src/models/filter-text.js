export function filterText(textToBeFiltered)
{
  filteredText = "";
  textToBeFiltered.split('')
    .forEach((character) => {
      if(character.toLowerCase() != character.toUpperCase())
        filterText += character;
    })
  return filterText;
}