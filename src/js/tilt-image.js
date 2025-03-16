export const TiltImage = function () {

	const root  = document.documentElement;
	const images = document.querySelectorAll('img');
	let ticking = false;

function resetImageTransform() {
	const mousePos = { x: 0, y: 0 };
  setImageTransform(mousePos);
}

function setImageTransform(mouseCoordinates) {
  root.style.setProperty("--transformX", mouseCoordinates.y);
  root.style.setProperty("--transformY", mouseCoordinates.x);
}

function getMouseCoordinates(event) {
  const xPos = event.clientX / document.body.clientWidth  * 100 - 50;
	const targetHeight = event.target.clientHeight;
  const yPos = event.clientY / targetHeight * 100 - 50;
	const mouseCoordinates = { x: xPos, y: yPos };
  return mouseCoordinates;
}


function updateAnimations(event) {
  setImageTransform(getMouseCoordinates(event));
  ticking = false;
}

images.length && images.forEach(image => {
	image.addEventListener('mousemove', (event) => {
		const container = event.target.closest('.tilt-image-container');
		container.classList.add('is-hovered');
		window.requestAnimationFrame(() => {
			updateAnimations(event)
		})
	})

	image.addEventListener('mouseout', (event) => {
		const container = event.target.closest('.tilt-image-container');
		container.classList.remove('is-hovered');
		resetImageTransform();
	})
})
}
