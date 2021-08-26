//--- GLOBAL VARIABLES ---//

const URI = "https://swapi.dev/api/";

const filmList = document.querySelector(".all-films");
const starshipList = document.querySelector(".all-starships");
const characterList = document.querySelector(".all-characters");
const allPeople = [];

const filmErrors = document.querySelector(".film-errors");
const characterErrors = document.querySelector(".character-errors");
const starshipErrors = document.querySelector(".starship-errors");

//--- START PROGRAM ---//
fetchAllFilms();
fetchAllStarships();
fetchAllCharacters();

//--- FETCH LISTS OF ALL FILMS, ALL PEOPLE, ALL STARSHIPS ---//

async function fetchAllFilms() {
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
						<h4 class="gold">Release year: <span class="year">${new Date(film.release_date).getFullYear()}</span></h4>`;
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

async function fetchAllStarships() {
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

//--- FETCH DATA ABOUT INDIVIDUAL ITEMS: ---//

function getItemData(itemURLs, list) {
	list.innerHTML = "";

	if (itemURLs.length === 0) {
		itemInfo = { name: "This character has not piloted any starships", url: "n/a" };
		displayItem(itemInfo, list);
	}

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

function displayItem(itemInfo, list) {
	const item = document.createElement("li");
	item.classList.add("list-item");
	item.textContent = `${itemInfo.name || itemInfo.title}`;
	list.appendChild(item);

	// Add event listeners to individual films, characters and starships
	if (itemInfo.url.includes("people")) {
		item.addEventListener("click", function () {
			displayCharacterDetails(itemInfo);
		});
	} else if (itemInfo.url.includes("starships")) {
		item.addEventListener("click", function () {
			displayStarshipDetails(itemInfo);
		});
	} else if (itemInfo.url.includes("films")){
		item.addEventListener("click", function () {
			displayFilmDetails(itemInfo);
		});
	}
}

//--- FUNCTIONS TRIGERED BY CLICK EVENTS ---//

// Show character names according to the user search:
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

// Display details about a single film:
function displayFilmDetails(filmInfo) {
	const filmDiv = document.querySelector(".film-information");
	filmDiv.classList.add("shadow", "grey-bg", "display");
	filmDiv.scrollIntoView();

	const filmDetails = document.querySelector(".film-details");
	filmDetails.innerHTML = `
        <p ><span class="gold">Title: </span> ${filmInfo.title} </p>
        <p><span  class="gold" >Episode: </span>${filmInfo.episode_id} </p>
        <p ><span class="gold">Release Year: </span>${new Date(filmInfo.release_date).getFullYear()}</p>
        <p ><span class="gold">Director: </span>${filmInfo.director}</p>
        <p ><span class="gold">Opening crawl: </span>"${filmInfo.opening_crawl}"</p>`;

	// Fetch data about characters and starships associated with the film:
	const charactersInFilm = document.querySelector(".character-list");
	getItemData(filmInfo.characters, charactersInFilm);
	const starshipsInFilm = document.querySelector(".starship-list");
	getItemData(filmInfo.starships, starshipsInFilm);
}

// Display details about a single character:
function displayCharacterDetails(characterInfo) {
	const characterDiv = document.querySelector(".character-information");
	characterDiv.classList.add("shadow", "display", "white-bg");
	const character = document.querySelector(".character-details");
	character.innerHTML = `
    <p ><span class="dark-gold">Name: </span> ${characterInfo.name} </p>
    <p><span  class="dark-gold" >Gender: </span>${characterInfo.gender} </p>
    <p ><span class="dark-gold">Birth Year: </span>${characterInfo.birth_year} </p>
    <p ><span class="dark-gold">Height: </span>${characterInfo.height}</p>
    <p ><span class="dark-gold">Eye Color: </span>"${characterInfo.eye_color}"</p>
    <p ><span class="dark-gold">Skin Color: </span>"${characterInfo.skin_color}"</p>
    <p ><span class="dark-gold">Hair Color: </span>"${characterInfo.hair_color}"</p>
    <p ><span class="dark-gold">Mass: </span>"${characterInfo.mass}"</p>`;
	document.querySelector(".search-form").scrollIntoView(true);

	// Fetch data about films and starships associated with the character:
	const filmsWithCharacter = document.querySelector(".character-film-list");
	getItemData(characterInfo.films, filmsWithCharacter);
	const starshipsWithCharacter = document.querySelector(".character-starship-list");
	getItemData(characterInfo.starships, starshipsWithCharacter);
}

// Display details about a single starship:
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
  <p ><span class="gold">Consumables: </span>${starshipInfo.consumables}</p>`;
	starship.scrollIntoView();
}

//--- ERROR HANDLING ---//
function handleError(error, DOMelement) {
	console.error(error);
	const err = document.createElement("p");
	err.textContent = "Error loading content";
	DOMelement.appendChild(err);
}
