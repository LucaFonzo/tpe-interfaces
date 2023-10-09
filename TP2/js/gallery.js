const images = document.querySelectorAll('.image');
const overlay = document.querySelector('.overlay');
const expandedImage = document.querySelector('.expanded-image');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentImageIndex = 0;

function openOverlay(index) {
  expandedImage.src = images[index].querySelector('img').src;
  overlay.style.display = 'flex';
  currentImageIndex = index;
}

function closeOverlay() {
  overlay.style.display = 'none';
}

function showNextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  openOverlay(currentImageIndex);
}

function showPrevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  openOverlay(currentImageIndex);
}

images.forEach((image, index) => {
  image.addEventListener('click', () => openOverlay(index));
});

closeButton.addEventListener('click', closeOverlay);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);