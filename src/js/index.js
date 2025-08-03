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
import Accordion from './accordion.js';

//  INTO-VIEWPORT ANIMATION

const allLists = document.querySelectorAll('.header');

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
const SCROLL_TRESHOLD = 3500;

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

  const slides = gsap.utils.toArray('.slider__item');
  if (slides.length === 0) return;

  gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.slider__list',
      pin: '.slider__list',
      pinSpacing: true,
      start: 'top 100px',
      end: () => `+=${slides.length * 1000}`, // Dynamic end calculation
      scrub: 1,
      anticipatePin: 1,
    },
  });
});

// ACCORDION

const listContainerAccordions = document.querySelectorAll('.accordion');

const initializeAccordion = (containerAccordion) => {
  const handler = containerAccordion.querySelector('.accordion___button');
  const target = containerAccordion.querySelector('.accordion___panel');
  const accordionInstances = [];

  // initialize accordion with options
  if (!handler || !target) return;
  const accordionInstance = new Accordion({
    target,
    handler,
    easing: 'easeInOutQuart',
    duration: 400,
    initOpened: false,
    openClassName: 'is-open',
    closeInstances: [
      /* array of other accordion instances */
    ],
    toggleStart: (element, state, isOpen) => {
      // do something after animation started
    },
    toggleEnd: (element, state, isOpen) => {
      // do something after animation completes
    },
  });

  accordionInstance.init();
  accordionInstances.push(accordionInstance);
};

if (listContainerAccordions.length) {
  listContainerAccordions.forEach((containerAccordion) => {
    initializeAccordion(containerAccordion);
  });
}
