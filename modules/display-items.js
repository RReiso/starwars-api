import {
	displayFilmDetails,
	displayCharacterDetails,
	displayStarshipDetails,
} from "./display-model-details.js";
import { characterList, allPeople } from "./fetch-all-models.js";

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
	} else if (itemInfo.url.includes("films")) {
		item.addEventListener("click", function () {
			displayFilmDetails(itemInfo);
		});
	}
}

export { showCharacters, displayItem };
