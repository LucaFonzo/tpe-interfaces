const nav = document.querySelector('nav');
const categories = document.querySelector('.categories');
const overlay = document.querySelector('.overlay');

document.querySelector('#burger-btn').addEventListener('click', showNav);
overlay.addEventListener('click', showNav);

function showNav() {
  nav.classList.toggle('active');
  categories.classList.remove('active');
  overlay.classList.toggle('active');
  setTimeout(() => {categories.classList.toggle('d-none');}, 500);
};

document.querySelector('#category-icn').addEventListener('click', () => {
  categories.classList.toggle('active');
});