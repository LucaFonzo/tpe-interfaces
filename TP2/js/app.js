function show() {
  document.querySelector('.navigation').classList.toggle('active');
};
document.querySelector('#category-icn').addEventListener('click', () => {
  document.querySelector('.categories').classList.toggle('hidden');
});