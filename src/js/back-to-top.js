export default class BackToTop {
  constructor(params) {
    this.breakpointBacktotop = params.BREAKPOINT_BACKTOTOP;
    this.scrollTreshold = params.SCROLL_TRESHOLD;
    this.handler = params.buttonBackToTop;
  }

  scrollOnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  showBackToTop = () => {
    this.handler.classList.remove('hidden');
  };

  handleOnScroll = () => {
    if (window.scrollY > this.scrollTreshold) {
      this.showBackToTop();
    } else {
      this.hideBackToTop();
    }
  };

  // throttle request animation frame enhancing performance, matching browser's display rate of 60fps
  throttleRAF = (fn) => {
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

  bindEvents = () => {
    document.addEventListener('scroll', this.throttleRAF(this.handleOnScroll));
    this.handler.addEventListener('click', this.scrollOnClick);
  };

  hideBackToTop = () => {
    if (window.innerWidth >= this.breakpointBacktotop) {
      // default buttonBackToTop is hidden
      this.handler.classList.add('hidden');
    }
  };

  init = () => {
    this.hideBackToTop();
    this.bindEvents();
  };
}
