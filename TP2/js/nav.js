const nav = document.querySelector('nav');
const categories = document.querySelector('.categories');
const overlay = document.querySelector('.overlay');

const showNav = () => {
  nav.classList.toggle('active');
  categories.classList.remove('active');
  overlay.classList.toggle('active');
  setTimeout(() => {categories.classList.toggle('d-none');}, 500);
};

document.querySelector('#burger-btn').addEventListener('click', showNav);

document.querySelector('#category-icn').addEventListener('click', () => {
  categories.classList.toggle('active');
});

overlay.addEventListener('click', showNav);