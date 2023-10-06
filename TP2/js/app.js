document.querySelector('#burger-btn').addEventListener('click', show);

function show() {
  document.querySelector('.navigation').classList.toggle('active');
};
document.querySelector('#category-icn').addEventListener('click', () => {
  document.querySelector('.categories').classList.toggle('hidden');
});


const btnsDesplegable = document.querySelectorAll('.botonDesplegable');
btnsDesplegable.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (e.target.nextSibling.nextSibling.style.display === 'block') {
      e.target.nextSibling.nextSibling.style.display = 'none';
    } else {
      e.target.nextSibling.nextSibling.style.display = 'block';
    }
  });
})

