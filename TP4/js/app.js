const preventScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

//MAIN HEROS PARALLAX
const spiderWhite = document.querySelector('.spider-white');
const spiderNormal = document.querySelector('.spider-normal');
const spiderBlack = document.querySelector('.spider-black');
const spiderWeb1 = document.querySelector('.spider-web-1');
const spiderWeb2 = document.querySelector('.spider-web-2');
const background1 = document.querySelector('.image1');
const background2 = document.querySelector('.image2');
const background3 = document.querySelector('.image3');

window.addEventListener('scroll', function () {
  let y = window.scrollY;
  if (y < 700) {
    //SpidermanWhite
    spiderWhite.style.transform = `translateX(${y * -0.3}px)`;
    //Spiderman black
    spiderBlack.style.transform = `translateX(${y * 0.3}px)`;
    spiderWeb1.style.transform = `translateX(${y * 0.3}px)`;
    //Spiderman normal
    spiderNormal.style.transform = `translateY(${y * -0.3}px)`;
    spiderWeb2.style.transform = `translateY(${y * -0.3}px)`;
    //Background
    background1.style.transform = `translateX(${-y * 0.1}px)`;
    background3.style.transform = `translateX(${y * 0.1}px)`;

  }
});

//GOBLIN MOVEMENT
const greenGoblin = this.document.querySelector('.green-goblin');
window.addEventListener('scroll', function (e) {
  if (this.window.scrollY > 400 && this.window.scrollY < 700) {
    const nuevaPosicion = window.scrollY * 0.15;
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


//AVENGERS SECTION
const div = document.querySelector('.avengers-section').parentElement;
const images = [];

div.querySelectorAll('img').forEach(img => {
  let i = {
    img,
    depthX: img.getAttribute('data-depth-x'),
    depthY: img.getAttribute('data-depth-y')
  }
  images.push(i);
});

div.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  for(let img of images){
    img.img.style.transform = `translateX(${x * img.depthX}px) translateY(${y * img.depthY}px)`;
  }
});


window.addEventListener('scroll', function (e) {
  const section = this.document.querySelector('.spider-white-section');
  if (isElementInViewport(section)) {
    const divs = this.document.querySelectorAll('.spider-white-section .container div');
    divs.forEach((div, index) => {
      const y = window.scrollY;
      div.style.transform = `translateY(${(y) * 0.03}px)`;
    })
  }
})

/**Detecta si un elemento esta dentro del viewport */
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**MORE FRIENDS SECTION */
window.addEventListener('scroll', (e) => {
  /**
   * Le quito la clase show,que es la que muestra el contenido cambiando su opacity
   */
  function clearShow() {
    document.querySelectorAll('.image-container div img').forEach(img => {
      img.classList.remove('show');
    })
    document.querySelectorAll('information').forEach(text => {
      text.classList.remove('show');
    })
  }
  /**
   * Agrego la clase show segun la posicion del
   * scroll para que se muestre la imagen y el texto
  */
  if (window.scrollY >= 3500 && window.scrollY <= 3900) {
    clearShow();
    document.querySelector('#text-1').classList.add('show');
    document.querySelector('#mas-100-misiones').classList.add('show');
  }
  else if (window.scrollY >= 4000 && window.scrollY <= 4400) {
    clearShow();
    document.querySelector('#text-2').classList.add('show');
    document.querySelector('#escenas-deslumbrantes').classList.add('show');
  } else if (window.scrollY >= 4450 && window.scrollY <= 4700) {
    clearShow();
    document.querySelector('#text-3').classList.add('show');
    document.querySelector('#cada-mision-puntos').classList.add('show');
  } else if (window.scrollY >= 4750) {
    clearShow();
    document.querySelector('#derrota-villanos-diviertete').classList.add('show');
    document.querySelector('#text-4').classList.add('show');
  }
})

document.querySelectorAll(".three-spiders-section img").forEach(img => {
  /**
   * Selecciono todas las imaganes
   * de los spider-mans y segun donde
   * hace hover añado el blur a las imagenes
   * en las que no este el mouse encima y
   * a la que si le agrego un show que
   * agranda su tamaño
   */
  img.addEventListener("mouseover", (e) => {
    if (img.alt == "spider-white") {
      img.classList.add("show");
      const spiderNormal = img.nextElementSibling;
      const spiderBlack = spiderNormal.nextElementSibling;
      spiderNormal.classList.add("blur");
      spiderBlack.classList.add("blur");
      document.querySelector('.background-spider-pink').classList.add('show');
    } else if (img.alt == "spider-normal") {
      img.classList.add("show");
      const spiderWhite = img.previousElementSibling;
      const spiderBlack = img.nextElementSibling;
      spiderWhite.classList.add("blur");
      spiderBlack.classList.add("blur");
      document.querySelector('.background-spider-normal').classList.add('show');
    } else if (img.alt == "spider-black") {
      img.classList.add("show");
      const spiderNormal = img.previousElementSibling;
      const spiderWhite = spiderNormal.previousElementSibling;
      spiderNormal.classList.add("blur");
      spiderWhite.classList.add("blur");
      document.querySelector('.background-spider-black').classList.add('show');
    }
  });
  img.addEventListener("mouseout", (e) => {
    img.classList.remove("show");
    if (img.alt == "spider-white") {
      const spiderNormal = img.nextElementSibling;
      const spiderBlack = spiderNormal.nextElementSibling;
      spiderNormal.classList.remove("blur");
      spiderBlack.classList.remove("blur");
      document.querySelector('.background-spider-pink').classList.remove('show');
    } else if (img.alt == "spider-normal") {
      const spiderWhite = img.previousElementSibling;
      const spiderBlack = img.nextElementSibling;
      spiderWhite.classList.remove("blur");
      spiderBlack.classList.remove("blur");
      document.querySelector('.background-spider-normal').classList.remove('show');
    } else if (img.alt == "spider-black") {
      const spiderNormal = img.previousElementSibling;
      const spiderWhite = spiderNormal.previousElementSibling;
      spiderNormal.classList.remove("blur");
      spiderWhite.classList.remove("blur");
      document.querySelector('.background-spider-black').classList.remove('show');
    }
  });

  img.addEventListener("click", (e) => {
    if (img.alt == "spider-normal") {
      document.querySelector('#infoPeter').classList.add('active');
    } else if (img.alt == "spider-white") {
      document.querySelector('#infoGwen').classList.add('active');
    } else if (img.alt == "spider-black") {
      document.querySelector('#infoMiles').classList.add('active');
    }
  })
})


document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.parentElement.classList.remove('active');
  })
})