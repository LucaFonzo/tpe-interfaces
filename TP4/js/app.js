document.querySelector('.hamburger-btn').addEventListener('click', function () {
  this.classList.toggle('active');
});

window.addEventListener('scroll', function() {
  if (this.window.scrollY > 10) {
    this.document.querySelector('header').classList.add('header-sticky');
    this.document.querySelector('header img').classList.remove('hidden');
  } else {
    this.document.querySelector('header').classList.remove('header-sticky');
    this.document.querySelector('header img').classList.add('hidden');
  }
})

const spiderWhite = document.querySelector('.spider-white');
const spiderNormal = document.querySelector('.spider-normal');
const spiderBlack = document.querySelector('.spider-black');
const spiderWeb1 = document.querySelector('.spider-web-1');
const spiderWeb2 = document.querySelector('.spider-web-2');
window.addEventListener('scroll', function () {
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
})