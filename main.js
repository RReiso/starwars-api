import "./modules/toggle-hamnav.js";
import {
  fetchAllFilms,
  fetchAllCharacters,
  fetchAllStarships,
} from "./modules/fetch-all-models.js";

//--- START PROGRAM ---//

fetchAllFilms();
fetchAllStarships();
fetchAllCharacters();
