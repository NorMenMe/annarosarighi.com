/*
  <portfolio of Annarosa Righi>
  Copyright (C) 2025 by Norman Metz

  Web:    www.normanmetz.com
  Email:  info@normanmetz.com

  Permission granted to use the files associated with this
  website only on your webserver.

  Changes to these files are PROHIBITED due to license restrictions.
*/

import { LazerLoader } from './lazer-loader.js';

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
