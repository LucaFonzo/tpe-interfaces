
const slides = Array.from(document.querySelectorAll(".slide"));
const overlayGallery = document.querySelector('.overlay-gallery-container');

let currentIndexGallery = 0;

function showPrevImage() {
  currentIndexGallery--;
  if(currentIndexGallery < 0) currentIndexGallery = slides.length - 1;
  moveImages();
}

function showNextImage() {
  currentIndexGallery = currentIndexGallery + 1;
  if(currentIndexGallery >= slides.length) currentIndexGallery = 0;
  moveImages();
}

function moveImages(){
  for(let slide of slides){
    slide.style.transform = `translateX(-${currentIndexGallery * 105}%)`;
  }
}

document.querySelector('.overlay-gallery-container button.previous').addEventListener('click', showPrevImage);

document.querySelector('.overlay-gallery-container button.next').addEventListener('click', showNextImage);

document.querySelector('.image').addEventListener('click', () => overlayGallery.classList.add('active'));

document.querySelector('.close-button').addEventListener('click', () => {
  overlayGallery.classList.remove('active');
  currentIndexGallery = 0;
  moveImages();
});