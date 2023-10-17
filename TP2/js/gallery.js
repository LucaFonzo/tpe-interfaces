const images = document.querySelectorAll('.image');
const slides = document.querySelectorAll(".slide");
const overlayGallery = document.querySelector('.overlay-gallery-container');
const expandedImage = document.querySelector('.expanded-image');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndexGallery = 0;

function openOverlay() {
  overlayGallery.style.display = 'flex';
  showSlide();
}
function showSlide() {
  slides.forEach((slide, i) => {
    console.log(slide.style.transform);
    slide.style.transform = `translateX(${600 * i}px)`;
  });
}

function closeOverlay() {
  overlayGallery.style.display = 'none';
}

function showNextImage() {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${-600}px)`;
  });
}

function showPrevImage() {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${0}px)`;
  });
}

images.forEach((image, index) => {
  image.addEventListener('click', () => openOverlay(index));
});

closeButton.addEventListener('click', closeOverlay);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);