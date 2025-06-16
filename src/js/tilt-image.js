export const TiltImage = () => {
  const root = document.documentElement;
  const containerTarget = document.querySelector('.tilt-image-container');
  const images = containerTarget.querySelectorAll('img');
  let ticking = false;

  const resetImageTransform = () => {
    const mousePos = { x: 0, y: 0 };
    setImageTransform(mousePos);
  };

  const resetTiltEffect = () => {
    containerTarget.classList.remove('is-hovered');
    resetImageTransform();
  };

  const setImageTransform = (mouseCoordinates) => {
    root.style.setProperty('--transformX', mouseCoordinates.y);
    root.style.setProperty('--transformY', mouseCoordinates.x);
  };

  const getMouseCoordinates = (event) => {
    const xPos = (event.clientX / document.body.clientWidth) * 100 - 50;
    const targetHeight = event.target.clientHeight;
    const yPos = (event.clientY / targetHeight) * 100 - 50;
    const mouseCoordinates = { x: xPos, y: yPos };
    return mouseCoordinates;
  };

  const updateAnimations = (event) => {
    setImageTransform(getMouseCoordinates(event));
    ticking = false;
  };

  const setTiltEffect = (event) => {
    containerTarget.classList.add('is-hovered');
    window.requestAnimationFrame(() => {
      updateAnimations(event);
    });
  };

  const bindEvents = () => {
    images.forEach((image) => {
      image.addEventListener('mousemove', setTiltEffect);
      image.addEventListener('mouseout', resetTiltEffect);
    });
  };

  if (!images.length) return;
  bindEvents();
};
