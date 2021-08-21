const URI = "https://swapi.dev/api/";

(function(){
  getMovieList();
})();

async function getMovieList() {
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
              <h4>Episode: <span >${
								film.episode_id
							}</span></h4>
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
			.then ( async(episodeInfo) => {
				console.log(episodeInfo)
        const episode = document.querySelector(".episode");
        episode.innerHTML = `
        <p ><span class="gold">Title: </span> ${episodeInfo.title} </p>
            <p><span  class="gold" >Episode: </span>${
							episodeInfo.episode_id
						} </p>
            <p ><span class="gold">Release Year: </span>${new Date(
							episodeInfo.release_date
						).getFullYear()} </p>
            <p ><span class="gold">Director: </span>${episodeInfo.director}</p>
            <p ><span class="gold">Opening crawl: </span>"${episodeInfo.opening_crawl}"</p>`;
           
        const characters = episodeInfo.characters;
        const characterNames= await getInfo(characters);
        console.log(characterNames);

			});
	} catch (error) {
		console.log(error);
		episodeErrors.textContent = `Something went wrong. Could not load data about the film.`;
	}
}

async function getCharacters(characters) {
  let episodeCharacters=[];
await characters.forEach(async(character)=>{

	try {
		await fetch(character)
			.then((response) => response.json())
			.then((characterInfo) => {
				episodeCharacters.push(characterInfo.name)
			});
	} catch (error) {
		console.log(error);
    episodeCharacters.push("Could not load character name")
	}
})
return episodeCharacters;
}