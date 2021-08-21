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
			.then ((episodeInfo) => {
        console.log(episodeInfo)
        
        
           
        const characters = episodeInfo.characters;
   const characterParagraph = document.querySelector(".episode-characters");
         getNames(characters,characterParagraph);
    
       
        // const starships = episodeInfo.starships;
				//  getNames(starships);
  

        
        
        
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
          <p ><span class="gold">Opening crawl: </span>"${
            episodeInfo.opening_crawl
          }"</p>
          `;
          
          // episode.appendChild(characterParagraph)

			});
	} catch (error) {
		console.log(error);
		episodeErrors.textContent = `Something went wrong. Could not load data about the film.`;
	}
}

function getNames(objects,paragraph) {
 
objects.forEach((object)=>{
try {
		fetch(object)
			.then((response) => response.json())
			.then((data) => {
        displayObject(data.name, data.url, paragraph)
			});

	} catch (error) {
		console.log(error);
    displayObject("Could not load name", paragraph) 
	}
})
}


function displayObject(name, url="n/a", paragraph){
 console.log(paragraph)
  // const characterParagraph = document.querySelector(".episode-characters");
  paragraph.classList.add("display");

					const objectName = document.createElement("li");
					objectName.setAttribute("data-url", `${url}`);
					objectName.textContent=`${name}`;
       
          objectName.addEventListener("click", displayCharacterInfo);
          paragraph.appendChild(objectName);

          // return characterParagraph
				;
}

function displayCharacterInfo(){
  console.log("ir")

}