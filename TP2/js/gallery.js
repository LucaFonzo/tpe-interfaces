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
  showSlide(0);
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    console.log(100 * (i - index));
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

function closeOverlay() {
  overlayGallery.style.display = 'none';
}

function showNextImage() {
  currentIndexGallery = (currentIndexGallery + 1) % slides.length;
  showSlide(currentIndexGallery);
}

function showPrevImage() {
  currentIndexGallery = (currentIndexGallery - 1 + slides.length) % slides.length;
  showSlide(currentIndexGallery);
}

images.forEach((image, index) => {
  image.addEventListener('click', () => openOverlay(index));
});

closeButton.addEventListener('click', closeOverlay);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);