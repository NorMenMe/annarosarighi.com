import { LazerLoader } from './lazer-loader.js';
import { TiltImage } from './tilt-image.js';

//  Into-Viewport Animation
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

// dropdown logic

const buttons = document.querySelectorAll('.header__button');

buttons.length && buttons.forEach( button => {
  button.addEventListener('click', () => {
    let isCollapsed = button.getAttribute('aria-expanded') === 'true';
    isCollapsed = !isCollapsed;
    button.setAttribute('aria-expanded', isCollapsed);
    isCollapsed ? button.parentElement.classList.add('is-collapsed') : button.parentElement.classList.remove('is-collapsed');
  })
})

TiltImage();