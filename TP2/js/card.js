document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerHTML == 'Agregar<br>al carrito') {
            const overlay = button.parentElement.parentElement.firstElementChild.firstElementChild;
            overlay.classList.add('active');
            button.innerHTML = 'Quitar<br>del carrito';
        } else {
            const overlay = button.parentElement.parentElement.firstElementChild.firstElementChild;
            overlay.classList.remove('active');
            button.innerHTML = 'Agregar<br>al carrito';
        }
    });
});