import { handleError } from "./error-handling.js";
import { showCharacters, displayItem } from "./display-items.js";
import { displayFilmDetails } from "./display-model-details.js";

//--- GLOBAL VARIABLES ---//

const URI = "https://swapi.dev/api/";
const filmList = document.querySelector(".all-films");
const starshipList = document.querySelector(".all-starships");
const characterList = document.querySelector(".all-characters");
const allPeople = [];

const filmErrors = document.querySelector(".film-errors");
const characterErrors = document.querySelector(".character-errors");
const starshipErrors = document.querySelector(".starship-errors");

//--- FETCH LISTS OF ALL FILMS, ALL PEOPLE, ALL STARSHIPS ---//

async function fetchAllFilms() {
  try {
    const response = await fetch(`${URI}films/`);
    const data = await response.json();
    const films = data.results;
    if (films.length === 0) {
      handleError("Empty data", filmErrors);
    } else {
      films.forEach((film) => {
        const filmBox = document.createElement("div");
        filmBox.classList.add("flex-box", "shadow", "grey-bg");
        filmBox.innerHTML = `
        <h3>Title: <span>${film.title}</span></h3>
        <h4>Episode: <span >${film.episode_id}</span></h4>
        <h4 class="gold">Release year: <span class="year">${new Date(
          film.release_date
        ).getFullYear()}</span></h4>`;
        filmList.appendChild(filmBox);
        filmBox.addEventListener("click", function () {
          displayFilmDetails(film);
        });
      });
    }
  } catch (error) {
    handleError(error, filmErrors);
  }
}

async function fetchAllStarships() {
  // 4 pages of starships in Star Wars API:
  for (let i = 1; i < 5; i++) {
    try {
      const response = await fetch(`${URI}/starships/?page=${i}`);
      const data = await response.json();
      const starships = data.results;
      if (starships.length === 0) {
        handleError("Empty data", starshipErrors);
      } else {
        starships.forEach((starship) => {
          displayItem(starship, starshipList);
        });
      }
    } catch (error) {
      handleError(error, starshipErrors);
    }
  }
}

async function fetchAllCharacters() {
  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", showCharacters);
  window.addEventListener("click", function () {
    characterList.innerHTML = "";
    searchInput.value = "";
  });

  // 8 pages of people in Star Wars API:
  for (let i = 1; i < 9; i++) {
    try {
      const response = await fetch(`${URI}/people/?page=${i}`);
      const data = await response.json();
      const people = data.results;
      if (people.length === 0) {
        handleError("Empty data", characterErrors);
      } else {
        allPeople.push(...people);
      }
    } catch (error) {
      handleError(error, characterErrors);
    }
  }
}

export {
  fetchAllFilms,
  fetchAllCharacters,
  fetchAllStarships,
  characterList,
  allPeople,
};
