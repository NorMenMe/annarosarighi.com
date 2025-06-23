export default class TiltImage {
  constructor(params) {
    this.root = document.documentElement;
    this.containerTarget = params.containerTarget;
    this.images = params.images;
    this.ticking = false;
  }

  resetImageTransform = () => {
    const mousePos = { x: 0, y: 0 };
    this.setImageTransform(mousePos);
  };

  resetTiltEffect = () => {
    this.containerTarget.classList.remove('is-hovered');
    this.resetImageTransform();
  };

  getMouseCoordinates = (event) => {
    const xPos = (event.clientX / document.body.clientWidth) * 100 - 50;
    const targetHeight = event.target.clientHeight;
    const yPos = (event.clientY / targetHeight) * 100 - 50;
    const mouseCoordinates = { x: xPos, y: yPos };
    return mouseCoordinates;
  };

  setImageTransform = (mouseCoordinates) => {
    this.root.style.setProperty('--transformX', mouseCoordinates.y);
    this.root.style.setProperty('--transformY', mouseCoordinates.x);
  };

  updateAnimations = (event) => {
    this.setImageTransform(this.getMouseCoordinates(event));
    this.ticking = false;
  };

  setTiltEffect = (event) => {
    this.containerTarget.classList.add('is-hovered');
    window.requestAnimationFrame(() => {
      this.updateAnimations(event);
    });
  };

  bindEvents = () => {
    this.images.forEach((image) => {
      image.addEventListener('mousemove', this.setTiltEffect);
      image.addEventListener('mouseout', this.resetTiltEffect);
    });
  };

  init = () => {
    if (!this.images.length) return;
    this.bindEvents();
  };
}
