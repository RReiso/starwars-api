import { fetchAssociatedData } from "./fetch-item-data.js";

// Display details about a single film:
function displayFilmDetails(filmInfo) {
	const filmDiv = document.querySelector(".film-information");
	filmDiv.classList.add("shadow", "grey-bg", "display");
	filmDiv.scrollIntoView();

	const filmDetails = document.querySelector(".film-details");
	filmDetails.innerHTML = `
        <p><span class="gold">Title: </span> ${filmInfo.title} </p>
        <p><span class="gold">Episode: </span>${filmInfo.episode_id} </p>
        <p><span class="gold">Release Year: </span>${new Date(
					filmInfo.release_date
				).getFullYear()}</p>
        <p><span class="gold">Director: </span>${filmInfo.director}</p>
        <p><span class="gold">Opening crawl: </span>"${
					filmInfo.opening_crawl
				}"</p>`;

	// Fetch data about characters and starships associated with the film:
	const characters = filmInfo.characters;
	const starships = filmInfo.starships;
	fetchAssociatedData(".character-list", characters);
	fetchAssociatedData(".starship-list", starships);
}

// Display details about a single character:
function displayCharacterDetails(characterInfo) {
	const characterDiv = document.querySelector(".character-information");
	characterDiv.classList.add("shadow", "display", "white-bg");
	const character = document.querySelector(".character-details");
	character.innerHTML = `
    <p><span class="dark-gold">Name: </span> ${characterInfo.name} </p>
    <p><span class="dark-gold">Gender: </span>${characterInfo.gender} </p>
    <p><span class="dark-gold">Birth Year: </span>${characterInfo.birth_year} </p>
    <p><span class="dark-gold">Height: </span>${characterInfo.height}</p>
    <p><span class="dark-gold">Eye Color: </span>"${characterInfo.eye_color}"</p>
    <p><span class="dark-gold">Skin Color: </span>"${characterInfo.skin_color}"</p>
    <p><span class="dark-gold">Hair Color: </span>"${characterInfo.hair_color}"</p>
    <p><span class="dark-gold">Mass: </span>"${characterInfo.mass}"</p>`;
	document.querySelector(".search-form").scrollIntoView(true);

	// Fetch data about films and starships associated with the character:
	const films = characterInfo.films;
	const starships = characterInfo.starships;
	fetchAssociatedData(".character-film-list", films);
	fetchAssociatedData(".character-starship-list", starships);
}

// Display details about a single starship:
function displayStarshipDetails(starshipInfo) {
	const starship = document.querySelector(".starship-details");
	starship.classList.add("display");
	starship.innerHTML = `
  <p><span class="gold">Name: </span> ${starshipInfo.name} </p>
  <p><span class="gold">Model: </span>${starshipInfo.model} </p>
  <p><span class="gold">Manufacturer: </span>${starshipInfo.manufacturer} </p>
  <p><span class="gold">Class: </span>${starshipInfo.starship_class}</p>
  <p><span class="gold">Length: </span>"${starshipInfo.length}"</p>
  <p><span class="gold">Cargo Capacity: </span>${starshipInfo.cargo_capacity}</p>
  <p><span class="gold">Hyperdrive Rating: </span>${starshipInfo.hyperdrive_rating}</p>
  <p><span class="gold">Max Atmosphering Speed: </span>${starshipInfo.max_atmosphering_speed}</p>
  <p><span class="gold">Passengers: </span>${starshipInfo.passengers}</p>
  <p><span class="gold">Crew: </span>${starshipInfo.crew}</p>
  <p><span class="gold">Consumables: </span>${starshipInfo.consumables}</p>`;
	starship.scrollIntoView();
}

export { displayCharacterDetails, displayFilmDetails, displayStarshipDetails };
