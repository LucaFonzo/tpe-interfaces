document.querySelector('#burger-btn').addEventListener('click', show);

function show() {
  document.querySelector('.navigation').classList.toggle('active');
};
document.querySelector('#category-icn').addEventListener('click', () => {
  document.querySelector('.categories').classList.toggle('hidden');
});


const btnsDesplegable = document.querySelectorAll('.botonDesplegable');
const dropdownLists = document.querySelectorAll('.opcionesDesplegable');
const arrows = document.querySelectorAll('.arrow-down-icn');
btnsDesplegable.forEach((btn,index) => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth >= 1024) {
      return;
    }
    const arrow = arrows[index];
    const dropdownList = dropdownLists[index];
    console.log(arrow);
    if (dropdownList.style.display === 'block') {
      arrow.classList.remove('arrow-up-icn')
      arrow.classList.add('arrow-down-icn');
      dropdownList.style.display = 'none';
    } else {
      arrow.classList.add('arrow-up-icn')
      arrow.classList.remove('arrow-down-icn');
      dropdownList.style.display = 'block';
    }
  });
})

