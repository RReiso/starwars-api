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
				const films = document.querySelector(".all-films");
				filmList = data.results;
				filmList.forEach((film) => {
    
					const filmBox = document.createElement("div");
					filmBox.classList.add("flex-box", "shadow", "grey-bg");
					filmBox.addEventListener("click",function(){
          displayFilmDetails(film);
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
						displayItem(starship, starshipList);
					});
				});
		} catch (error) {
		handleError(error,starshipErrors);
		}
	}
}

function displayFilmDetails(filmInfo) {
	const filmDiv = document.getElementById("film-information");
	filmDiv.classList.add("shadow", "grey-bg");
	filmDiv.scrollIntoView();
	


				const characters = filmInfo.characters;
				const characterList = document.querySelector(".character-list");
				getItemData(characters, characterList);

				const starships = filmInfo.starships;
				const starshipList = document.querySelector(".starship-list");
				getItemData(starships, starshipList);

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

function getItemData(itemURLs, list) {
  document.querySelector(".film-characters").classList.add("display");
	document.querySelector(".film-starships").classList.add("display");
	list.textContent = "";
	itemURLs.forEach(async (url) => {
    try {
      await fetch(url)
      .then((response) => response.json())
      .then((itemInfo) => {
					displayItem(itemInfo, list);
				});
		} catch (error) {
      handleError(error,list);
		}
	});
}

function handleError(error,DOMelement){
  console.error(error);
  const err = document.createElement("p");
  err.textContent = "Error loading some content";
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


function displayCharacterDetails(object){
  console.log("im in")
}

function displayStarshipDetails(starshipInfo) {
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


