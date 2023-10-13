document.addEventListener('DOMContentLoaded', init);

function init() {
    const stars = Array.from(document.querySelectorAll('.new-comment-footer svg'));
    const group = stars[0].parentElement;

    stars.forEach(star => star.addEventListener('mousemove', starHover));
    group.addEventListener('mouseenter', () => { group.addEventListener('mouseleave', reset) });
    stars.forEach(star => star.addEventListener('click', () => { group.removeEventListener('mouseleave', reset) }));
    

    function starHover(e) {
        const starRectangle = e.target.getBoundingClientRect();
        const index = stars.indexOf(e.target);
        for (let i = 0; i < index; i++) {
            stars[i].classList.remove('empty-star-icn');
            stars[i].classList.remove('half-star-icn')
            stars[i].classList.add('full-star-icn');
        }
        e.target.classList.remove('empty-star-icn');
        e.target.classList.remove('half-star-icn');
        if (e.clientX < starRectangle.left + starRectangle.width / 2) {
            e.target.classList.add('half-star-icn');
        } else {
            e.target.classList.add('full-star-icn');
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove('full-star-icn');
            stars[i].classList.remove('half-star-icn');
            stars[i].classList.add('empty-star-icn');
        }
    }

    function reset() {
        stars.forEach(star => {
            star.classList.remove('full-star-icn');
            star.classList.remove('half-star-icn');
            star.classList.add('empty-star-icn');
        });
    }

}