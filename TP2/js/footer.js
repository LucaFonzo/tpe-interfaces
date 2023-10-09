const dropdownBtns = document.querySelectorAll('.dropdown button');
const dropdownLists = document.querySelectorAll('.dropdown ul');
const arrows = document.querySelectorAll('.arrow-down-icn');

dropdownBtns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth >= 1024) {
      return;
    }

    const arrow = arrows[index];
    const dropdownList = dropdownLists[index];
    arrow.classList.toggle('active');
    dropdownList.classList.toggle('active');
  });
});