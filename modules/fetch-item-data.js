import { handleError } from "./error-handling.js";
import { displayItem } from "./display-items.js";

//--- FETCH DATA ABOUT INDIVIDUAL ITEMS: ---//

function getItemData(itemURLs, list) {
  list.innerHTML = "";
  if (itemURLs.length === 0) {
    const itemInfo = {
      name: "This character has not piloted any starships",
      url: "n/a",
    };
    displayItem(itemInfo, list);
  }

  itemURLs.forEach(async (url) => {
    try {
      const response = await fetch(url);
      const itemInfo = await response.json();
      displayItem(itemInfo, list);
    } catch (error) {
      handleError(error, list);
    }
  });
}

function fetchAssociatedData(string, itemURLs) {
  const listElement = document.querySelector(string);
  getItemData(itemURLs, listElement);
}

export { fetchAssociatedData };
