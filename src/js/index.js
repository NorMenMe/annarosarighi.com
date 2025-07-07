/*
  <portfolio of Annarosa Righi>
  Copyright (C) 2025 by Norman Metz

  Web:    www.normanmetz.com
  Email:  info@normanmetz.com

  Permission granted to use the files associated with this
  website only on your webserver.

  Changes to these files are PROHIBITED due to license restrictions.
*/

import LazerLoader from './lazer-loader.js';
import BackToTop from './back-to-top.js';

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

// BUTTON BACK TO TOP

const buttonBackToTop = document.querySelector('.back-to-top__button');
const BREAKPOINT_BACKTOTOP = 1249;
const SCROLL_TRESHOLD = 1500;

if (buttonBackToTop) {
  const backToTopInstance = new BackToTop({
    SCROLL_TRESHOLD,
    BREAKPOINT_BACKTOTOP,
    buttonBackToTop,
  });
  backToTopInstance.init();

  const backToTopInstances = [];
  backToTopInstances.push(backToTopInstance);
}

// SLIDER

document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger);

  let slides = gsap.utils.toArray('.slider__item');

  gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.slider_list',
      pin: '#main-content',
      pinSpacing: true,
      start: 'top 100px',
      scrub: 1,
      end: '+=3000',
    },
  });

  gsap.to('.portfolio', {
    scrollTrigger: {
      trigger: '.portfolio',
      pinnedContainer: '#main-content',
      start: 'top 50%',
      toggleActions: 'play none reset none',
    },
  });
});
