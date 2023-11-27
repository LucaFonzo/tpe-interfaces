document.addEventListener("DOMContentLoaded", function () {
    //Simula el tiempo de carga de la página
    document.querySelector('#loader-container').addEventListener('wheel', preventScroll, { passive: false });
    setTimeout(function () {
        document.getElementById("loader-container").style.display = "none";
    }, 3000);
});