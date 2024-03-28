import { LazerLoader } from './lazer-loader.js';

const container = document.querySelector(".portfolio__header");
const button = document.querySelector(".portfolio__button");

button.addEventListener("click", () => {
  container.classList.toggle("portfolio__header--collapsed");
});



// // Into-Viewport Animation
const allLists = document.querySelectorAll('.portfolio__header');

if (allLists.length) {
  const Lazer = new LazerLoader({
    targets: allLists,
    config: {
      rootMargin: '0px',
      threshold: 0.01,
    },
    cb: (target, isAbove) => {
      !isAbove && target.classList.add('ani-in');
    },
  });

  Lazer.init();
}