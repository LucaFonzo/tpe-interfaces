const nav = document.querySelector('nav');
const categories = document.querySelector('.categories');
const overlay = document.querySelector('.overlay');
const loader = document.querySelector('.loader');
const anchors = document.querySelectorAll('a');

const showNav = () => {
  nav.classList.toggle('active');
  categories.classList.remove('active');
  overlay.classList.toggle('active');
  setTimeout(() => {categories.classList.toggle('d-none');}, 500);
};

const redirect = (href) => {
  overlay.addEventListener('wheel', preventScroll, { passive: false });
  overlay.removeEventListener('click', showNav);
  overlay.classList.add('active');
  overlay.classList.add('loader-container')
  loader.classList.remove('d-none');
  
  setTimeout(() => {
    window.location.href = href;
  }, 500);
}

const preventScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

document.querySelector('#burger-btn').addEventListener('click', showNav);

document.querySelector('#category-icn').addEventListener('click', () => {
  categories.classList.toggle('active');
});

anchors.forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    redirect(anchor.getAttribute('href'));
  })
});

overlay.addEventListener('click', showNav);