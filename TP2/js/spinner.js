function redirectToAnotherPage() {
  // Display the loading animation
  const loader = document.querySelector('.loader');
  const percentage = document.querySelector('.progress-text span')
  loader.style.display = 'block';
  document.querySelector('.container-loader').style.display = 'block';
  document.querySelector('form').style.visibility = 'hidden';
  let progress = 0;
  const interval = setInterval(function () {
    progress++;
    percentage.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval); // Stop the interval when progress reaches 100%
      setTimeout(function () {
        loader.style.display = 'none'; // Hide the loading animation
        window.location.href = 'home.html'; // Redirect to another page
      }, 500); // Delay before redirecting (0.5 seconds in this example)
    }
  }, 20); // Adjust the interval and speed as needed
}

document.querySelector('#btn-login').addEventListener('click', (e) => {
  e.preventDefault();
  redirectToAnotherPage();
})