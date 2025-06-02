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

// Back-to-top Button

const BREAKPOINTDESKTOP = 1200;
const TRESHOLD = -1500;
const backToTop = document.querySelector('.back-to-top__button');


const hideBackToTop = (params) => {
  backToTop.classList.add('hidden');
}

const showBackToTop = (params) => {
    backToTop.classList.remove('hidden');
}

const handleOnScroll = ( ) => {
  const targetElement = document.querySelector('body');

  if (targetElement) {
    const distanceFromWindowTop = targetElement.getBoundingClientRect().y;

    if (Math.sign(distanceFromWindowTop) === -1 && distanceFromWindowTop < TRESHOLD) {
      showBackToTop();
    } else {
      hideBackToTop();
    }
  }
}

const scrollOnClick = () => {
  window.scrollTo({
  top: 0,
  behavior: "smooth",
  });
}

const bindEvents = ( ) => {
  document.addEventListener('scroll', handleOnScroll);
  backToTop.addEventListener('click', scrollOnClick);
}

const hideOnDesktop = ( ) => {
 window.innerWidth >= BREAKPOINTDESKTOP 
    ? hideBackToTop()
    : '';
}

if ( backToTop ) {
  hideOnDesktop();
  bindEvents();
}
