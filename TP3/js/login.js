const overlay = document.querySelector('.overlay');
const loader = document.querySelector('.loader');
const percentage = document.querySelector('.progress-text span');
const anchors = document.querySelectorAll('a');
const btnLogin = document.querySelector('#btn-login');

const login = () => {
    // Display the loading animation
    overlay.classList.add('active');
    loader.classList.remove('d-none');
    percentage.parentNode.classList.remove('d-none');
    overlay.addEventListener('wheel', preventScroll, { passive: false });

    let progress = 0;

    const interval = setInterval(() => {
        progress++;
        percentage.innerHTML = `Iniciando sesión...<br>${progress}%`;


        if (progress === 100) {
            clearInterval(interval);

            setTimeout(() => {
                percentage.innerHTML += '<br>Bienvenido, Luca!';
            }, 1200);

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        }
    }, 20);
}

const redirect = (href) => {
    overlay.classList.add('active');
    loader.classList.remove('d-none');

    setTimeout(() => {
        window.location.href = href;
    }, 500);
}

const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

// EVENT LISTENERS


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    login();
});


anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        redirect(anchor.getAttribute('href'));
    })
});