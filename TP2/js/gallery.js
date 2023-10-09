const images = document.querySelectorAll('.image');
const slides = document.querySelectorAll(".slide");
const overlay = document.querySelector('.overlay');
const expandedImage = document.querySelector('.expanded-image');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;

function openOverlay() {
  overlay.style.display = 'flex';
  showSlide(0);
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    console.log(100 * (i - index));
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

function closeOverlay() {
  overlay.style.display = 'none';
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

images.forEach((image, index) => {
  image.addEventListener('click', () => openOverlay(index));
});

closeButton.addEventListener('click', closeOverlay);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);