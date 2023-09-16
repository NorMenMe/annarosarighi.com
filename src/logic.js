const container = document.querySelector('.portfolio__heading');
const button = document.querySelector('.portfolio__button');

button.addEventListener('click', () => {
	container.classList.toggle('portfolio__heading--collapsed')
})