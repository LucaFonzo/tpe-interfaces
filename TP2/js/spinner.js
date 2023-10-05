function redirectToAnotherPage() {
  // Display the loading animation
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
  document.querySelector('form').style.visibility = 'hidden';

  // Simulate a delay (you can replace this with your actual loading process)
  setTimeout(function () {
    // Hide the loading animation
    loader.style.display = 'none';

    // Redirect to another page
    window.location.href = 'home.html'; // Replace with the URL of the other page
  }, 2000); // Adjust the delay as needed (2 seconds in this example)
}

document.querySelector('#btn-login').addEventListener('click', (e) => {
  e.preventDefault();
  redirectToAnotherPage();
})