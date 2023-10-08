const btnsDesplegable = document.querySelectorAll('.boton-desplegable');
const dropdownLists = document.querySelectorAll('.opciones-desplegable');
const arrows = document.querySelectorAll('.arrow-down-icn');
btnsDesplegable.forEach((btn,index) => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth >= 1024) {
      return;
    }
    const arrow = arrows[index];
    const dropdownList = dropdownLists[index];
    console.log(arrow);
    if (dropdownList.classList.contains('d-block')) {
      arrow.classList.remove('arrow-up-icn');
      arrow.classList.add('arrow-down-icn');
      dropdownList.classList.remove('d-block');
      dropdownList.classList.add('d-none');
    } else {
      arrow.classList.add('arrow-up-icn')
      arrow.classList.remove('arrow-down-icn');
      dropdownList.classList.add('d-block');
      dropdownList.classList.remove('d-none');
    }
  });
})