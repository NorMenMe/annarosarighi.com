/**
 * Returns element by selector
 * @param {string} selector - CSS selector
 * @param {HTMLElement|Document} [root=document] - Root element to search within
 * @returns {HTMLElement|null} Found element or null
 */
export const $ = (selector, root = document) => root.querySelector(selector);

/**
 * Returns array of elements by selector
 * @param {string} selectors - CSS selectors
 * @param {HTMLElement|Document} [root=document] - Root element to search within
 * @returns {HTMLElement[]} Array of found elements
 */
export const $$ = (selectors, root = document) =>
  Array.from(root.querySelectorAll(selectors));

/**
 * Adds multiple attributes at once
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Object with attribute key-value pairs
 */
export const setAttributes = (element, options) => {
  if (!element || !options) return;

  Object.entries(options).forEach(([attr, value]) => {
    element.setAttribute(attr, value);
  });
};

/**
 * Shorter version for native insertBefore method
 * @param {HTMLElement} newElement - Element to insert
 * @param {HTMLElement} reference - Reference element
 * @returns {boolean} Success status
 */
export const insertNodeBefore = (newElement, reference) => {
  if (!newElement || !reference || !reference.parentNode) return false;

  reference.parentNode.insertBefore(newElement, reference);
  return true;
};

/**
 * Workaround for missing insertAfter method
 * @param {HTMLElement} newElement - Element to insert
 * @param {HTMLElement} reference - Reference element
 * @returns {boolean} Success status
 */
export const insertNodeAfter = (newElement, reference) => {
  if (!newElement || !reference || !reference.parentNode) return false;

  reference.parentNode.insertBefore(newElement, reference.nextSibling);
  return true;
};

/**
 * Find the closest element by selector
 * @param {HTMLElement} element - Starting element
 * @param {string} selector - CSS selector to match
 * @param {boolean} [checkSelf=true] - Whether to check the element itself
 * @returns {HTMLElement|null} Matching ancestor element or null
 */
export const closest = (element, selector, checkSelf = true) => {
  if (!element || !selector) return null;

  // Use native closest method if available and checkSelf is true
  if (checkSelf && element.closest) {
    return element.closest(selector);
  }

  let parent = checkSelf ? element : element.parentElement;

  while (parent && parent.nodeType === Node.ELEMENT_NODE) {
    if (parent.matches && parent.matches(selector)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
};

/**
 * Get an element's top position relative to the document
 * @param {HTMLElement} node - Target element
 * @returns {number} Top position in pixels
 */
export const getTopPosition = (node) => {
  if (!node) return 0;

  const rect = node.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

/**
 * Get next sibling element that matches the selector
 * @param {HTMLElement} target - Starting element
 * @param {string} [selector='*'] - CSS selector to match
 * @returns {HTMLElement|null} Matching next sibling element or null
 */
export const getNextSibling = (target, selector = '*') => {
  if (!target) return null;

  let sibling = target.nextElementSibling;

  while (sibling) {
    if (sibling.matches && sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }

  return null;
};

/**
 * Get previous sibling element that matches the selector
 * @param {HTMLElement} target - Starting element
 * @param {string} [selector='*'] - CSS selector to match
 * @returns {HTMLElement|null} Matching previous sibling element or null
 */
export const getPrevSibling = (target, selector = '*') => {
  if (!target) return null;

  let sibling = target.previousElementSibling;

  while (sibling) {
    if (sibling.matches && sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.previousElementSibling;
  }

  return null;
};

/**
 * Detect the correct transition end event name for the current browser
 * @returns {string|undefined} Transition end event name or undefined
 */
export const whichTransitionEvent = () => {
  if (typeof document === 'undefined') return undefined;

  const el = document.createElement('div');
  const transitions = {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd',
  };

  for (const [property, event] of Object.entries(transitions)) {
    if (el.style[property] !== undefined) {
      return event;
    }
  }

  return undefined;
};

/**
 * Detect the correct animation end event name for the current browser
 * @returns {string|undefined} Animation end event name or undefined
 */
export const whichAnimationEvent = () => {
  if (typeof document === 'undefined') return undefined;

  const el = document.createElement('div');
  const animations = {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'animationend',
    OAnimation: 'oAnimationEnd',
  };

  for (const [property, event] of Object.entries(animations)) {
    if (el.style[property] !== undefined) {
      return event;
    }
  }

  return undefined;
};

/**
 * Insert HTML string into DOM at specified position
 * @param {HTMLElement} node - Target element
 * @param {string} position - Position relative to target ('beforebegin'|'afterbegin'|'beforeend'|'afterend')
 * @param {string} htmlString - HTML string to insert
 * @returns {boolean} Success status
 */
export const insertHTML = (node, position, htmlString) => {
  if (!node || !position || typeof htmlString !== 'string') return false;

  const validPositions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
  if (!validPositions.includes(position)) return false;

  try {
    node.insertAdjacentHTML(position, htmlString);
    return true;
  } catch (error) {
    console.error('Error inserting HTML:', error);
    return false;
  }
};
