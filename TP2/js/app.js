const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  console.log(currentIndex)
  if (currentIndex == 2) {
    return;
  }
  if (currentIndex < carousel.children.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Función para actualizar la posición del carrusel
function updateCarousel() {
  if (window.innerWidth < 1024) {
    const translateX = -currentIndex * 280; // 280px es el ancho de cada tarjeta
    carousel.style.transform = `translateX(${translateX}px)`;
  } else {
    const translateX = -currentIndex * (280 * 3); // 280px es el ancho de cada tarjeta
    carousel.style.transform = `translateX(${translateX}px)`;
  }
}

