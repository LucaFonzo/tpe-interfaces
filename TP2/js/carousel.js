const buttons = document.querySelectorAll('.carousel>button');
let currentStep = [];

buttons.forEach((button, index) => {
  if (index % 2 == 0) {
    button.id = `button-${index / 2}`;
    currentStep[index / 2] = 0;
  } else {
    button.id = `button-${(index - 1) / 2}`;
  }

  if (button.classList.contains('previous')) {
    button.addEventListener('click', moveBackward);
  }
  else if (button.classList.contains('next')) {
    button.addEventListener('click', moveForward);
  }
})

function moveForward(e) {
  if (e.target.classList.contains('disabled')) return;
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

  if (currentStep[index] > 0) {
    previous.classList.remove('disabled');
  }

  if (currentStep[index] >= cards.length / 3 - 1) {
    next.classList.add('disabled');
  }
}

function moveBackward(e) {
  if (e.target.classList.contains('disabled')) return;
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

  if (currentStep[index] == 0) {
    previous.classList.add('disabled');
  }

  if (currentStep[index] < 2) {
    next.classList.remove('disabled');
  }
}

document.querySelectorAll('#cart-icon, #cart-icon ~ span').forEach(elem => {
  elem.addEventListener('click', (e) => {
    const cartItems = document.querySelector('.cart-items');
    const dropdown = document.querySelector('.cart-dropdown');
    dropdown.classList.toggle('active');
    cartItems.classList.toggle('d-none');
    cartItems.classList.toggle('d-flex');
  });
});

let cart = [];
const cartItems = document.querySelector('.cart-items');

document.querySelectorAll('.card button:not(.card.free button').forEach(button => {
  button.addEventListener('click', (e) => {

    const overlay = button.parentElement.parentElement.firstElementChild.firstElementChild;
    overlay.classList.toggle('active');

    if (button.innerHTML == 'Agregar<br>al carrito') {
      cart.push({
        "name": e.target.closest('.card.sec-color-s2').querySelector('h3').textContent,
        "price": parseFloat(e.target.parentElement.firstChild.nextElementSibling.textContent.slice(1))
      })
      updateCart();
      button.innerHTML = 'Quitar<br>del carrito';
    } else {
      cart = cart.filter(i => i.name != e.target.closest('.card.sec-color-s2').querySelector('h3').textContent);
      updateCart();
      button.innerHTML = 'Agregar<br>al carrito';
    }
  });
});

function updateCart() {
  cartItems.textContent = "";
  let totalPrice = 0;
  const info = document.querySelector('#cart-icon ~ span');

  if (cart.length == 0) {
    const priceHTML = document.createElement('div');
    priceHTML.classList.add('total-price');
    const span = document.createElement('span');
    span.textContent = `El carrito está vacío.`;
    priceHTML.appendChild(span);
    cartItems.appendChild(priceHTML);
    info.classList.add('hidden');
    return;
  }

  const divCant = document.createElement('div');
  divCant.classList.add('total-elements')
  divCant.innerHTML = `<span> ${cart.length} ${cart.length === 1 ? 'elemento' : 'elementos'} en el carrito </span>`;
  cartItems.append(divCant);

  cart.forEach(i => {
    const name = document.createElement('span');
    name.textContent = i.name;
    const price = document.createElement('span');
    price.textContent = `$${i.price}`;
    const cross = document.createElement('svg');
    cross.classList.add('cross-icn');
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
  span.textContent = `Precio total: $${totalPrice}`;
  priceHTML.appendChild(span);
  cartItems.appendChild(priceHTML);
  info.classList.remove('hidden');
  info.innerHTML = cart.length;
}

function removeFromCart(e) {
  const name = e.target.parentElement.firstChild;
  const titles = document.querySelectorAll('h3');
  let elem = [];
  titles.forEach(e => {
    if (e.textContent == name.textContent) {
      elem.push(e);
    }
  });
  elem.forEach(elemnt => {
    const overlay = elemnt.parentElement.parentElement.firstChild.nextSibling.firstChild.nextElementSibling;
    const button = elemnt.parentElement.nextElementSibling.childNodes[2].nextElementSibling;
    button.innerHTML = 'Agregar<br>al carrito';
    overlay.classList.remove('active');
  });

  cart = cart.filter(i => i.name != name.textContent);
  updateCart();
}

updateCart();

document.querySelectorAll('.card.promo .card-footer').forEach(footer => {
  const h3 = footer.firstElementChild;
  const p = document.createElement('p');
  p.innerHTML = `$${parseInt(h3.textContent.substring(1)) * 2}`;
  footer.insertBefore(p, h3.nextElementSibling);
});

document.querySelectorAll('.card.free .card-footer').forEach(footer => {
  const btn = footer.querySelector('button');
  btn.innerHTML = 'Jugar';
  const a = document.createElement('a');
  a.href = 'game.html';
  a.appendChild(btn);
  footer.appendChild(a);
});

document.querySelectorAll('.card.unavailable button').forEach(button => {
  button.disabled = true;
  button.innerHTML = 'Jugar';
});