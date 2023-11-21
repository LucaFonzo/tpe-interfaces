document.addEventListener("DOMContentLoaded", function () {
  // Simula el tiempo de carga de la página
  document.querySelector('#loader-container').addEventListener('wheel', preventScroll, { passive: false });
  console.log(document.querySelector('#loader-container'));
  setTimeout(function () {
    document.getElementById("loader-container").style.display = "none";
  }, 5000);
});

const preventScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
}


document.querySelector('.hamburger-btn').addEventListener('click', function () {
  this.classList.toggle('active');
  console.log(document.querySelector('.side-bar'));
  document.querySelector('.side-bar').classList.toggle('active');
});
window.addEventListener('scroll', function () {
  const spiderWhite = document.querySelector('.spider-white');
  const spiderNormal = document.querySelector('.spider-normal');
  const spiderBlack = document.querySelector('.spider-black');
  const spiderWeb1 = document.querySelector('.spider-web-1');
  const spiderWeb2 = document.querySelector('.spider-web-2');
  //I take the y to move the elements
  let y = window.scrollY;
  //SpidermanWhite
  spiderWhite.style.transform = `translateX(${y * -0.3}px)`;
  //Spiderman black
  spiderBlack.style.transform = `translateX(${y * 0.3}px)`;
  spiderWeb1.style.transform = `translateX(${y * 0.3}px)`;
  //Spiderman normal
  spiderNormal.style.transform = `translateY(${y * -0.3}px)`;
  spiderWeb2.style.transform = `translateY(${y * -0.3}px)`;
});
//Move of goblin
window.addEventListener('scroll', function (e) {
  const greenGoblin = this.document.querySelector('.green-goblin');
  if (this.window.scrollY > 400 && this.window.scrollY < 700) {
    const nuevaPosicion = window.scrollY * 0.1;
    // Aplica la nueva posición al elemento
    greenGoblin.style.top = nuevaPosicion + 'px';
  }
})
//FADE IMAGES
window.addEventListener('scroll', function (e) {
  const cards = this.document.querySelectorAll('.card');
  cards.forEach(c => {
    if (isElementInViewport(c)) {
      c.classList.remove("card-hidden");
      c.classList.add("card-visible");
    }
  })
})
window.addEventListener('scroll', function () {
  if (this.window.scrollY > 10) {
    this.document.querySelector('header').classList.add('header-sticky');
    this.document.querySelector('header img').classList.remove('hidden');
  } else {
    this.document.querySelector('header').classList.remove('header-sticky');
    this.document.querySelector('header img').classList.add('hidden');
  }
});

window.addEventListener('scroll', function (e) {
  const section = this.document.querySelector('.spider-white-section');
  if (isElementInViewport(section)) {
    const images = this.document.querySelectorAll('.spider-white-section .container img');
    images.forEach((image, index) => {
      //image.style.transform = `translateY(${y - 10}px)`;
    })
  }
})

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}



document.addEventListener("scroll", function () {
  
});