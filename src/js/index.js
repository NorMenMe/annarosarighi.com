import { LazerLoader } from './lazer-loader.js';
import { TiltImage } from './tilt-image.js';

//  INTO-VIEWPORT ANIMATION

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

// DROPDOWN

const buttons = document.querySelectorAll('.header__button');

const handleOnClick = (event) => {
  const currentClickedButton = event.currentTarget;
  const container = currentClickedButton.closest('.header');

  let isCollapsed =
    currentClickedButton.getAttribute('aria-expanded') === 'true';
  isCollapsed = !isCollapsed;
  currentClickedButton.setAttribute('aria-expanded', isCollapsed);

  isCollapsed
    ? container.classList.add('is-collapsed')
    : container.classList.remove('is-collapsed');
};

const handleOnMouseDown = (event) => {
  const currentClickedButton = event.currentTarget;
  currentClickedButton.style.cursor = 'grabbing';
};

const handleOnMouseUp = (event) => {
  const currentClickedButton = event.currentTarget;
  currentClickedButton.style.cursor = 'pointer';
};

buttons.length &&
  buttons.forEach((button) => {
    button.addEventListener('click', handleOnClick);
    button.addEventListener('mousedown', handleOnMouseDown);
    button.addEventListener('mouseup', handleOnMouseUp);
  });

// TILT-IMAGE EFFECT

TiltImage();

// BACK TO BUTTON

const BREAKPOINT_BACKTOTOP = 1249;
const SCROLL_TRESHOLD = 1500;
const backToTop = document.querySelector('.back-to-top__button');

const showBackToTop = () => {
  backToTop.classList.remove('hidden');
};

const hideBackToTop = () => {
  if (window.innerWidth >= BREAKPOINT_BACKTOTOP) {
    // default backToTop is hidden
    backToTop.classList.add('hidden');
  }
};

const scrollOnClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// throttle request animation frame enhancing performance, matching browser's display rate of 60fps
const throttleRAF = (fn) => {
  let rafId = null;
  let isWaiting = false;

  return (...args) => {
    if (isWaiting) return;

    isWaiting = true;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      isWaiting = false;
    });
  };
};

const handleOnScroll = () => {
  if (window.scrollY > SCROLL_TRESHOLD) {
    showBackToTop();
  } else {
    hideBackToTop();
  }
};

const bindEvents = () => {
  document.addEventListener('scroll', throttleRAF(handleOnScroll));
  backToTop.addEventListener('click', scrollOnClick);
};

if (backToTop) {
  hideBackToTop();
  bindEvents();
}
