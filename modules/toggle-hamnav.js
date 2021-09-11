const nav = document.querySelector(".nav");
const hamburger = document.querySelector("#hamburger");
const menuItems = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", toggleHamburger);
menuItems.forEach((item) => {
	item.addEventListener("click", toggleHamburger);
});

function toggleHamburger() {
	nav.classList.toggle("showNav");
	if (hamburger.getAttribute("aria-expanded") == "false") {
		hamburger.setAttribute("aria-expanded", "true");
	} else {
		hamburger.setAttribute("aria-expanded", "false");
	}
}

export {toggleHamburger};
