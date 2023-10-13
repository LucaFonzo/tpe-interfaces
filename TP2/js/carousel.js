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

document.querySelector('#cart-icon').addEventListener('click', (e) => {
  const cartItems = document.querySelector('.cart-items');
  cartItems.classList.toggle('d-none');
})

let cart = [];

document.querySelectorAll('.card button').forEach(button => {
  button.addEventListener('click', (e) => {
    if (button.innerHTML == 'Agregar<br>al carrito') {
      const overlay = button.parentElement.parentElement.firstElementChild.firstElementChild;
      console.log(parseFloat(e.target.parentElement.firstChild.nextElementSibling.textContent.slice(1)));
      cart.push({
        "name": e.target.closest('.card.sec-color-s2').querySelector('h3').textContent,
        "price": parseFloat(e.target.parentElement.firstChild.nextElementSibling.textContent.slice(1))
      })
      console.log(cart);
      updateCart();
      overlay.classList.add('active');
      button.innerHTML = 'Quitar<br>del carrito';
    } else {
      const overlay = button.parentElement.parentElement.firstElementChild.firstElementChild;
      overlay.classList.remove('active');
      button.innerHTML = 'Agregar<br>al carrito';
    }
  });
});

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.textContent = "";
  let totalPrice = 0;
  try {
    if (cart.length == 0) {
      const priceHTML = document.createElement('div');
      priceHTML.classList.add('total-price');
      const span = document.createElement('span');
      span.textContent = `El carrito esta vacio`;
      priceHTML.appendChild(span);
      cartItems.appendChild(priceHTML);
      return;
    }
    const divCant = document.createElement('div');
    divCant.innerHTML = `<span>Cantidad de elementos: ${cart.length} </span>`;
    cartItems.append(divCant);
    cart.forEach(i => {
      const name = document.createElement('span');
      name.textContent = i.name;
      const price = document.createElement('span');
      price.textContent = `$${i.price}`;
      const cross = document.createElement('svg');
      cross.classList.add('cross-icon');
      cross.classList.add('icon');
      cross.addEventListener('click', removeFromCart);
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.appendChild(name);
      div.appendChild(price);
      div.appendChild(cross);
      cartItems.appendChild(div);
      totalPrice += parseFloat(i.price);
    })
    const priceHTML = document.createElement('div');
    priceHTML.classList.add('total-price');
    const span = document.createElement('span');
    span.textContent = `Precio total: ${totalPrice}`;
    priceHTML.appendChild(span);
    cartItems.appendChild(priceHTML);
  } catch (error) {
    console.log(error);
  }
}

function removeFromCart(e) {
  try {
    const name = e.target.parentElement.firstChild;
    cart = cart.filter(i => i.name != name.textContent);
    updateCart();
  } catch (error) {
    console.log(error);
  }
}

updateCart();
