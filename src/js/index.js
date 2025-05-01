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

// Dropdown 

// listen on mousedown
// on fire change the cursor style from grab to grabbing
 // on button listen on mousedown
  // if mousedown change cursor

const buttons = document.querySelectorAll('.header__button');

const handleOnClick = (event) => {
  const currentClickedButton = event.currentTarget;
  const container = currentClickedButton.closest('.header');

  let isCollapsed = currentClickedButton.getAttribute('aria-expanded') === 'true';
  isCollapsed = !isCollapsed;
  currentClickedButton.setAttribute('aria-expanded', isCollapsed);

  isCollapsed ? container.classList.add('is-collapsed') : container.classList.remove('is-collapsed');
}

const handleOnMouseDown = (event) => {
  const currentClickedButton = event.currentTarget;
  currentClickedButton.style.cursor = 'grabbing';
}

const handleOnMouseUp = (event) => {
  const currentClickedButton = event.currentTarget;
  currentClickedButton.style.cursor = 'pointer';
}

buttons.length && buttons.forEach( button => {
  button.addEventListener('click', handleOnClick)
  button.addEventListener('mousedown', handleOnMouseDown);
  button.addEventListener('mouseup', handleOnMouseUp);
})

TiltImage();
