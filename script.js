const URI = "https://swapi.dev/api/";

(function () {
	allFilms();
	allStarships();
})();

async function allFilms() {
	const filmErrors = document.querySelector(".film-errors");
	filmErrors.textContent = "";
	try {
		await fetch(`${URI}films/`)
			.then((response) => response.json())
			.then((data) => {
				const films = document.querySelector(".flex-films");
				filmList = data.results;
				filmList.forEach((film) => {
					const flexBox = document.createElement("div");
					flexBox.classList.add("flex-box");
					flexBox.setAttribute("data-url", `${film.url}`);
					flexBox.addEventListener("click", displayFilmInfo);
					flexBox.innerHTML = `
          	<h3>Title: <span>${film.title}</span></h3>
              <h4>Episode: <span >${film.episode_id}</span></h4>
							<h4 class="gold">Release year: <span class="year">${new Date(
								film.release_date
							).getFullYear()}</span></h4></a>`;
					films.appendChild(flexBox);
				});
			});
	} catch (error) {
		console.log(error);
		filmErrors.textContent = `Something went wrong. Could not load films.`;
	}
}

async function allStarships() {
	const starshipList = document.querySelector(".all-starships");
	for (let i = 1; i < 5; i++) {
		try {
			await fetch(`${URI}/starships/?page=${i}`)
				.then((response) => response.json())
				.then((data) => {
					starships = data.results;
					starships.forEach((starship) => {
						displayObjectName(starship.name, starship.url, starshipList);
					});
				});
		} catch (error) {
			console.log(error);
			displayObjectName("Could not load starship", "n/a", starshipList);
		}
	}
}

async function displayFilmInfo() {
	document
		.getElementById("episode-information")
		.scrollIntoView({ behavior: "smooth" });
	const episodeErrors = document.querySelector(".episode-errors");
	episodeErrors.textContent = "";
	const url = this.getAttribute("data-url");

	try {
		await fetch(url)
			.then((response) => response.json())
			.then((episodeInfo) => {
				const characters = episodeInfo.characters;
				const characterParagraph = document.querySelector(".character-list");
				getObjectData(characters, characterParagraph);

				const starships = episodeInfo.starships;
				const starshipParagraph = document.querySelector(".starship-list");
				getObjectData(starships, starshipParagraph);

				const episode = document.querySelector(".episode");
				episode.innerHTML = `
        <p ><span class="gold">Title: </span> ${episodeInfo.title} </p>
        <p><span  class="gold" >Episode: </span>${episodeInfo.episode_id} </p>
        <p ><span class="gold">Release Year: </span>${new Date(
					episodeInfo.release_date
				).getFullYear()} </p>
          <p ><span class="gold">Director: </span>${episodeInfo.director}</p>
          <p ><span class="gold">Opening crawl: </span>"${
						episodeInfo.opening_crawl
					}"</p>
          `;
			});
	} catch (error) {
		console.log(error);
		episodeErrors.textContent = `Something went wrong. Could not load data about the film.`;
	}
}

function getObjectData(objects, paragraph) {
	document.querySelector(".episode-characters").classList.add("display");
	document.querySelector(".episode-starships").classList.add("display");
	paragraph.textContent = "";
	objects.forEach(async (object) => {
		try {
			await fetch(object)
				.then((response) => response.json())
				.then((data) => {
					displayObjectName(data.name, data.url, paragraph);
				});
		} catch (error) {
			console.log(error);
			displayObjectName("Could not load name", "n/a", paragraph);
		}
	});
}

function displayObjectName(name, url, paragraph) {
	const objectName = document.createElement("li");
	objectName.classList.add("object-list");
	objectName.setAttribute("data-url", `${url}`);
	objectName.textContent = `${name}`;
	objectName.addEventListener("click", displayObjectInfo);
	paragraph.appendChild(objectName);
}

function displayObjectInfo() {
	const url = this.getAttribute("data-url");
	if (url.includes("people")) {
		displayCharacterInfo(url);
	} else {
		displayStarshipInfo(url);
	}
}

async function displayStarshipInfo(url) {
	document
		.querySelector(".starship-details")
		.scrollIntoView({ behavior: "smooth" });
	const starship = document.querySelector(".starship-details");
  const starshipErrors = document.querySelector(".starship-errors");
	starship.innerHTML = "";
  starshipErrors.textContent="";
	try {
		await fetch(url)
			.then((response) => response.json())
			.then((starshipInfo) => {
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
			});
	} catch (error) {
		console.log(error);
    starshipErrors.textContent="Something went wrong. Could not load starship details."
	}
}
