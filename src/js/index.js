

const container = document.querySelector(".portfolio__header");
const button = document.querySelector(".portfolio__button");

button.addEventListener("click", () => {
  container.classList.toggle("portfolio__header--collapsed");
});

