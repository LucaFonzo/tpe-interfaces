document.addEventListener('DOMContentLoaded', init);

function init() {
    /*Star behaviour*/
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

    /*Comment submit*/
    const textArea = document.querySelector('.new-comment-body textarea');
    const submit = document.querySelector('.new-comment-footer button');
    textArea.addEventListener('input', () => { submit.disabled = textArea.value.length <= 10 });
    submit.addEventListener('click', submitComment);

    function submitComment(e) {
        let newComment = textArea.value;
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = 
        `<img src="assets/img/profile-pictures/profile-pic.jpg" alt="Profile picture">
        <div class="comment-userdate">
          <h3>PanchoKpo1997 (Tú)</h3>
          <p>en este momento</p>
        </div>`;
        const starsBox = document.createElement('div');
        starsBox.classList.add('comment-stars');
        stars.forEach(star => {
            const starClone = star.cloneNode(true);
            starsBox.appendChild(starClone);
        });
        comment.appendChild(starsBox);
        const commentText = document.createElement('p');
        commentText.innerText = newComment;
        comment.appendChild(commentText);
        const commentsContainer = document.querySelector('.comments-container');
        commentsContainer.insertBefore(comment, commentsContainer.firstChild.nextElementSibling.nextElementSibling.nextElementSibling);
    }
}