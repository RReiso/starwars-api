const URI = "https://swapi.dev/api/";

(function init () {
	allFilms();
	allStarships();
  // allCharacters();
})();

async function allFilms() {
	const filmErrors = document.querySelector(".film-errors");
	try {
		await fetch(`${URI}films/`)
			.then((response) => response.json())
			.then((data) => {
				const films = document.querySelector(".flex-films");
				filmList = data.results;
				filmList.forEach((film) => {
    
					const filmBox = document.createElement("div");
					filmBox.classList.add("flex-box", "shadow", "grey-bg");
					filmBox.addEventListener("click",function(){
          displayFilmInfo(film);
          });
					filmBox.innerHTML = `
          	<h3>Title: <span>${film.title}</span></h3>
              <h4>Episode: <span >${film.episode_id}</span></h4>
							<h4 class="gold">Release year: <span class="year">${new Date(
								film.release_date).getFullYear()}</span></h4></a>`;
					films.appendChild(filmBox);
				});
			});
	} catch (error) {
		handleError(error,filmErrors);
	}
}

async function allStarships() {
	const starshipList = document.querySelector(".all-starships");
	const starshipErrors = document.querySelector(".starship-errors");

  //There are 4 pages of starships in Star Wars API:
	for (let i = 1; i < 5; i++) {
		try {
			await fetch(`${URI}/starships/?page=${i}`)
				.then((response) => response.json())
				.then((data) => {
					starships = data.results;
					starships.forEach((starship) => {
						displayObjectName(starship, starshipList);
					});
				});
		} catch (error) {
		handleError(error,starshipErrors);
		}
	}
}

function displayFilmInfo(filmInfo) {
	const filmDiv = document.getElementById("film-information");
	filmDiv.classList.add("shadow", "grey-bg");
	filmDiv.scrollIntoView();
	


				const characters = filmInfo.characters;
				const characterParagraph = document.querySelector(".character-list");
				getObjectData(characters, characterParagraph);

				const starships = filmInfo.starships;
				const starshipParagraph = document.querySelector(".starship-list");
				getObjectData(starships, starshipParagraph);

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
					}"</p>
          `;
	
}

function getObjectData(objects, paragraph) {
  document.querySelector(".film-characters").classList.add("display");
	document.querySelector(".film-starships").classList.add("display");
	paragraph.textContent = "";
	objects.forEach(async (object) => {
    try {
      await fetch(object)
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
					displayObjectName(data, paragraph);
				});
		} catch (error) {
      handleError(error,paragraph);
		}
	});
}

function handleError(error,paragraph){
  console.error(error);
  const err = document.createElement("p");
  err.textContent = "Error loading some content";
	paragraph.appendChild(err);
  }

function displayObjectName(object, paragraph) {
  const objectName = document.createElement("li");
	objectName.classList.add("list-item");
	objectName.textContent = `${object.name}`;
  paragraph.appendChild(objectName);
    objectName.addEventListener("click", function(){
      displayObjectInfo(object);
    });
}

function displayObjectInfo(object) {
	const url = object.url;
	if (url.includes("people")) {
		displayCharacterInfo(object);
	} else {
		displayStarshipInfo(object);
  }
}

function displayCharacterInfo(object){
  console.log("im in")
}

function displayStarshipInfo(starshipInfo) {
	const starship = document.querySelector(".starship-details");
  starship.classList.add("display");
	starship.innerHTML = "";
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
};


