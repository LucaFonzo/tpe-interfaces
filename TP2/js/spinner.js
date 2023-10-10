const overlay = document.querySelector('.overlay');
const loader = document.querySelector('.loader');
const percentage = document.querySelector('.progress-text span');

document.querySelector('#btn-login').addEventListener('click', (e) => {
  e.preventDefault();
  redirectToAnotherPage();
})


const redirectToAnotherPage = () => {
  // Display the loading animation
  overlay.classList.add('active');
  overlay.addEventListener('wheel', preventScroll, { passive: false });

  let progress = 0;

  const interval = setInterval(() => {
    progress++;
    percentage.innerHTML = `Iniciando sesión...<br>${progress}%`;

    if (progress === 100) {
  clearInterval(interval);

      redirect();
    }
  }, 20);
}

const redirect = () => {
  setTimeout(() => {
    percentage.innerHTML += '<br>Bienvenido, Luca!';
  }, 1200);

  setTimeout(() => {
    window.location.href = 'home.html'; // Redirect to another page
  }, 2000);
}

const preventScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
}