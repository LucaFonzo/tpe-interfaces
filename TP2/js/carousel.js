const buttons = document.querySelectorAll('.carousel>button');
let currentStep = [];

buttons.forEach((button, index) => {
    if(index % 2 == 0){
        button.id = `button-${index/2}`;
        currentStep[index/2] = 0;
    } else {
        button.id = `button-${(index-1)/2}`;
    }

    if(button.classList.contains('previous')){
        button.addEventListener('click', moveBackward);
    }
    else if(button.classList.contains('next')){
        button.addEventListener('click', moveForward);
    }
})

function moveForward(e){
    if(e.target.classList.contains('disabled')) return;
    const index = e.target.id.split('-')[1];
    const carousel = e.target.parentElement;
    const previous = carousel.querySelector('.previous');
    const next = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.carousel-body .card');

    carousel.parentElement.querySelector(`.radio-${currentStep[index]}`).classList.remove('active');
    currentStep[index]++;
    carousel.parentElement.querySelector(`.radio-${currentStep[index]}`).classList.add('active');
    
    cards.forEach(card => {
        card.classList.add(`move-left-${currentStep[index]}`);
    });

    if(currentStep[index] > 0){
        previous.classList.remove('disabled');
    }

    if(currentStep[index] >= cards.length/3 - 1){
        next.classList.add('disabled');
    }
}

function moveBackward(e){
    if(e.target.classList.contains('disabled')) return;
    const index = e.target.id.split('-')[1];
    const carousel = e.target.parentElement;
    const previous = carousel.querySelector('.previous');
    const next = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.carousel-body .card');
    
    cards.forEach(card => {
        card.classList.remove(`move-left-${currentStep[index]}`);
    });

    carousel.parentElement.querySelector(`.radio-${currentStep[index]}`).classList.remove('active');
    currentStep[index]--;
    carousel.parentElement.querySelector(`.radio-${currentStep[index]}`).classList.add('active');

    if(currentStep[index] == 0){
        previous.classList.add('disabled');
    }

    if(currentStep[index] < 2){ 
        next.classList.remove('disabled');
    }
}