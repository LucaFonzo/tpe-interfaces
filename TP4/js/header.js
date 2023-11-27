/**HEADER TITLE BEHAVIOUR */
const title = this.document.querySelector('.title-img');
window.addEventListener('scroll', () => {

  let translateY = `translateY(0px)`;
  if (180 - window.scrollY * 0.8 > 0) {
    translateY = `translateY(${180 - window.scrollY * 0.8}px)`;
  }

  let scale = `scale(0.2254)`;
  if (1 - window.scrollY * 0.004 > 0.2254) {
    scale = `scale(${1 - window.scrollY * 0.004})`;
  }

  let transform = `${translateY} ${scale}`;
  title.style.transform = transform;

});

/**HAMBURGER MENU ANIMATION*/
document.querySelector('.hamburger-btn').addEventListener('click', function () {
  this.classList.toggle('active');
  this.querySelectorAll('span').forEach(span => {
    span.classList.toggle('blue-shadow');
  });
  document.querySelector('.side-bar').classList.toggle('active');
});