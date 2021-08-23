const URI = "https://swapi.dev/api/";

const filmList = document.querySelector(".all-films");
const starshipList = document.querySelector(".all-starships");
const characterList = document.querySelector(".all-characters");
const allPeople = [];

const filmErrors = document.querySelector(".film-errors");
const characterErrors = document.querySelector(".character-errors");
const starshipErrors = document.querySelector(".starship-errors");

(function init() {
	allFilms();
	allStarships();
	allCharacters();
})();

async function allFilms() {
	try {
		await fetch(`${URI}films/`)
			.then((response) => response.json())
			.then((data) => {
				const films = data.results;
				films.forEach((film) => {
					const filmBox = document.createElement("div");
					filmBox.classList.add("flex-box", "shadow", "grey-bg");
					
					filmBox.innerHTML = `
          	<h3>Title: <span>${film.title}</span></h3>
              <h4>Episode: <span >${film.episode_id}</span></h4>
							<h4 class="gold">Release year: <span class="year">${new Date(
								film.release_date
							).getFullYear()}</span></h4></a>`;
					filmList.appendChild(filmBox);

          filmBox.addEventListener("click", function () {
						displayFilmDetails(film);
					});
				});
			});
	} catch (error) {
		handleError(error, filmErrors);
	}
}


async function allStarships() {
	// 4 pages of starships in Star Wars API:
	for (let i = 1; i < 5; i++) {
		try {
			await fetch(`${URI}/starships/?page=${i}`)
				.then((response) => response.json())
				.then((data) => {
					const starships = data.results;
					starships.forEach((starship) => {
						displayItem(starship, starshipList);
					});
				});
		} catch (error) {
			handleError(error, starshipErrors);
		}
	}
}

async function allCharacters() {
	window.addEventListener("click", function () {
		characterList.innerHTML = "";
	});
	const searchInput = document.querySelector(".search");
	searchInput.addEventListener("input", showCharacters);

	// 8 pages of people in Star Wars API:
	for (let i = 1; i < 10; i++) {
		try {
			await fetch(`${URI}/people/?page=${i}`)
				.then((response) => response.json())
				.then((data) => {
					allPeople.push(...data.results);
				});
		} catch (error) {
			handleError(error, characterErrors);
		}
	}
}

// Display character names according to user search:
function showCharacters() {
	characterList.innerHTML = "";
	const matchedCharacters = allPeople.filter((character) => {
		const regex = new RegExp(this.value, "gi");
		return character.name.match(regex);
	});
	matchedCharacters.forEach((character) => {
		displayItem(character, characterList);
	});
}

function displayFilmDetails(filmInfo) {
	const filmDiv = document.getElementById("film-information");
	filmDiv.classList.add("shadow", "grey-bg");
	

	const filmDetails = document.querySelector(".film-details");
	filmDetails.innerHTML = `
        <p ><span class="gold">Title: </span> ${filmInfo.title} </p>
        <p><span  class="gold" >Episode: </span>${filmInfo.episode_id} </p>
        <p ><span class="gold">Release Year: </span>${new Date(
					filmInfo.release_date
				).getFullYear()} </p>
          <p ><span class="gold">Director: </span>${filmInfo.director}</p>
          <p ><span class="gold">Opening crawl: </span>"${
						filmInfo.opening_crawl
					}"</p>`;
          filmDiv.scrollIntoView();

  // Fetch character and starship data of the film:
  const charactersInFilm = document.querySelector(".character-list");
	getItemData(filmInfo.characters, charactersInFilm);

	const starshipsInFilm = document.querySelector(".starship-list");
	getItemData(filmInfo.starships, starshipsInFilm);
}

function getItemData(itemURLs, list) {
	document.querySelector(".film-characters").classList.add("display");
	document.querySelector(".film-starships").classList.add("display");
	document.querySelector(".character-starships").classList.add("display");
	document.querySelector(".character-films").classList.add("display");

	list.innerHTML = "";
	itemURLs.forEach(async (url) => {
		try {
			await fetch(url)
				.then((response) => response.json())
				.then((itemInfo) => {
					displayItem(itemInfo, list);
				});
		} catch (error) {
			handleError(error, list);
		}
	});
}

function handleError(error, DOMelement) {
	console.error(error);
	const err = document.createElement("p");
	err.textContent = "Error loading content";
	DOMelement.appendChild(err);
}

function displayItem(itemInfo, list) {
  
	const item = document.createElement("li");
	item.classList.add("list-item");
	item.textContent = `${itemInfo.name}`;
	list.appendChild(item);

	// Add event listeners to characters and starships
	if (itemInfo.url.includes("people")) {
		item.addEventListener("click", function () {
			displayCharacterDetails(itemInfo);
		});
	} else {
		item.addEventListener("click", function () {
			displayStarshipDetails(itemInfo);
		});
	}
}

function displayCharacterDetails(characterInfo) {
  const character = document.querySelector(".character-details");
	console.log(characterInfo);
  character.classList.add("display");
  character.innerHTML = `
  <p ><span class="gold">Name: </span> ${characterInfo.name} </p>
  <p><span  class="gold" >Gender: </span>${characterInfo.gender} </p>
  <p ><span class="gold">Birth Year: </span>${characterInfo.birth_year} </p>
  <p ><span class="gold">Height: </span>${characterInfo.height}</p>
  <p ><span class="gold">Eye Color: </span>"${characterInfo.eye_color}"</p>
  <p ><span class="gold">Skin Color: </span>"${characterInfo.skin_color}"</p>
  <p ><span class="gold">Hair Color: </span>"${characterInfo.hair_color}"</p>
  <p ><span class="gold">Mass: </span>"${characterInfo.mass}"</p>`;
  character.scrollIntoView();

  const starshipsWithCharacter = document.querySelector(".character-starship-list");
  getItemData(characterInfo.starships, starshipsWithCharacter);
  
}

function displayStarshipDetails(starshipInfo) {
	const starship = document.querySelector(".starship-details");
	starship.classList.add("display");
	starship.innerHTML = `
  <p ><span class="gold">Name: </span> ${starshipInfo.name} </p>
  <p><span  class="gold" >Model: </span>${starshipInfo.model} </p>
  <p ><span class="gold">Manufacturer: </span>${starshipInfo.manufacturer} </p>
  <p ><span class="gold">Class: </span>${starshipInfo.starship_class}</p>
  <p ><span class="gold">Length: </span>"${starshipInfo.length}"</p>
  <p ><span class="gold">Cargo Capacity: </span>${starshipInfo.cargo_capacity}</p>
  <p ><span class="gold">Hyperdrive Rating: </span>${starshipInfo.hyperdrive_rating}</p>
  <p ><span class="gold">Max Atmosphering Speed: </span>${starshipInfo.max_atmosphering_speed}</p>
  <p ><span class="gold">Passengers: </span>${starshipInfo.passengers}</p>
  <p ><span class="gold">Crew: </span>${starshipInfo.crew}</p>
  <p ><span class="gold">Consumables: </span>${starshipInfo.consumables}</p>
  `;
	starship.scrollIntoView();
}
