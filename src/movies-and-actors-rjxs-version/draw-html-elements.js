import 
{
  subscribeFetchMovies,
  subscribeFetchMovieById,
  subscribeFetchActors,
  subscribeFetchActorById
}
from './fetch-movies-and-actors.js';

export function drawHtmlElementsMoviesAndActorsRJXS()
{
  console.log("Movie call history:");

  const container = drawDivHtmlElement(document.body, "", "container");

  drawDivHtmlElement(container, "List of movies in our database:", "movieListDiv");

  drawDivHtmlElement(container, "", "movieListContainer");

  drawMovieListInHtmlElements(movieListContainer);

  drawLabelHtmlElement(container, "Select movie: ", "selectMovieLabel");

  drawMovieSelectHtmlElement(container, "selectMovies");

  drawDivHtmlElement(container, "", "selectedMovieDiv");
 
  drawDivHtmlElement(container, "", "movieData");

  drawDivHtmlElement(container, "", "movieActorsListDiv");

  drawDivHtmlElement(container, "", "movieActorsList");

}

function drawDivHtmlElement(parent, innerHtml, id)
{
  var div = document.createElement("div");
  div.innerHTML = innerHtml;
  div.id = id;
  parent.appendChild(div);
  return div;
}

function drawParagraphHtmlElement(parent, innerHtml, id)
{
  var paragraph = document.createElement("p");
  paragraph.innerHTML = innerHtml;
  paragraph.id = id;
  parent.appendChild(paragraph);
  return paragraph;
}

function drawLabelHtmlElement(parent, innerHtml, id)
{
  var label = document.createElement("label");
  label.innerHTML = innerHtml;
  label.id = id;
  parent.appendChild(label);
  return label;
}

function drawMovieListInHtmlElements(parent)
{
  const moviesObservable = subscribeFetchMovies()
  moviesObservable.subscribe(movies => {
    movies.map(element =>{
      drawDivHtmlElement(parent, `${element.id}. ${element.title}`, `movieList${element.id}`);
    })
  })
}

function drawMovieSelectHtmlElement(parent, id)
{
  var select = document.createElement("select");
  select.id = id;
  parent.appendChild(select);
  drawMovieTitlesInsideSelectOptions(select, "...");
  select.onchange = () => {
    selectMovieOnChange(select.selectedIndex);
  }
  return select;
}

function drawMovieTitlesInsideSelectOptions(parentSelect, defaultOptionText)
{
  var defaultOption = document.createElement("option");
  defaultOption.value = 0;
  defaultOption.text = defaultOptionText;
  parentSelect.appendChild(defaultOption);

  const moviesObservable = subscribeFetchMovies();
    moviesObservable.subscribe(movies => {
      movies.map(element =>{
        var option = document.createElement("option");
        option.value = element.id;
        option.text = element.title;
        parentSelect.appendChild(option);
      })
    })
}

function selectMovieOnChange(id){
    var oldChild = document.getElementById("movieData");
    var newChild = document.createElement("div");
    newChild.id = "movieData";
    container.replaceChild(newChild, oldChild);
    var oldActorsList = document.getElementById("movieActorsList");
    var newActorsList = document.createElement("div");
    newActorsList.id = "movieActorsList";
    container.replaceChild(newActorsList, oldActorsList);
    if(id == 0)
    {
      selectedMovieDiv.innerHTML = "";
      newChild.innerHTML = "No movies selected. Please select a movie.";
      movieActorsListDiv.innerHTML = "";
    }else
    { 
    const movieObservable = subscribeFetchMovieById(id);
    movieObservable.subscribe(movie => {
      selectedMovieDiv.innerHTML = "Selected movie data:";
      newChild.innerHTML = "Id: " + movie.id + " | " +                          
                            "Title: " + movie.title + " | " +
                            "Year: " + movie.year;
      if(movie.actorsById.length == 0)
      {
        movieActorsListDiv.innerHTML = `${movie.title} actors list is empty!`;
      }else
      {
        movieActorsListDiv.innerHTML = `${movie.title} actors list:`;
        Promise.all(movie.actorsById.map(actorId => {
          if(actorId != 0)
            const actorObservable = subscribeFetchActorById(actorId);
            actorObservable.subscribe(actor => {
            drawDivHtmlElement(newActorsList, "Actor id: " + actor.id + " | " +
                                              "name: " + actor.name + " | " +
                                              "last name: " + actor.lastName);
            })
        }))
      }
      console.log(movie.title);
    })
}
}