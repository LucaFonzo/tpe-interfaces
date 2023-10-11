const buttons = document.querySelectorAll('.carousel>button');
let currentStep = 0;

buttons.forEach(button => {
    if(button.classList.contains('previous')){
        button.addEventListener('click', moveBackward);
    }
    else if(button.classList.contains('next')){
        button.addEventListener('click', moveForward);
    }
})

function moveForward(e){
    if(e.target.classList.contains('disabled')) return;
    const carousel = e.target.parentElement;
    const previous = carousel.querySelector('.previous');
    const next = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.carousel-body .card');

    carousel.parentElement.querySelector(`#radio-${currentStep}`).classList.remove('active');
    currentStep++;
    carousel.parentElement.querySelector(`#radio-${currentStep}`).classList.add('active');

    cards.forEach(card => {
        card.classList.add(`move-left-${currentStep}`);
    });

    if(currentStep > 0){
        previous.classList.remove('disabled');
    }

    if(currentStep >= cards.length/3 - 1){
        next.classList.add('disabled');
    }
}

function moveBackward(e){
    if(e.target.classList.contains('disabled')) return;
    const carousel = e.target.parentElement;
    const previous = carousel.querySelector('.previous');
    const next = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.carousel-body .card');
    
    cards.forEach(card => {
        card.classList.remove(`move-left-${currentStep}`);
    });

    carousel.parentElement.querySelector(`#radio-${currentStep}`).classList.remove('active');
    currentStep--;
    carousel.parentElement.querySelector(`#radio-${currentStep}`).classList.add('active');

    if(currentStep == 0){
        previous.classList.add('disabled');
    }

    if(currentStep < 2){ 
        next.classList.remove('disabled');
    }
}