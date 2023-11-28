const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    //Simula el tiempo de carga de la página
    document.querySelector('#loader-container').addEventListener('wheel', preventScroll, { passive: false });
    let span = document.querySelector('#loader-container span');
    const info = setInterval(() => {
        let porc = parseInt(span.innerHTML.slice(0, -1));
        if (porc >= 100) {
            span.innerHTML = "100%";
            clearInterval(info);
        } else {
            span.innerHTML = `${porc + 1}%`;
        }

    }, 30)
    setTimeout(function () {
        document.getElementById("loader-container").style.display = "none";
    }, 5000);
});