//--- ERROR HANDLING ---//

export function handleError(error, DOMelement) {
  console.error(error);
  const err = document.createElement("p");
  err.textContent = "Error loading content";
  DOMelement.appendChild(err);
}
