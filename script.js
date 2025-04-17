// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any interactive elements here
    initializeNavigation();
    initializeFormValidation();
});

// Form validation functionality
function initializeFormValidation() {
    const form = document.querySelector('.sign-in-form');
    const signInButton = document.querySelector('.sign-in-button');
    const wrongLogin = document.createElement('div');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email === 'test@test.com' && password === 'test123') {
                // Show the pop-up
                const popup = document.getElementById('popup');
                popup.style.display = 'flex';

                setTimeout(() => {
                    window.location.href = 'home.html'; // Redirect to home page
                }, 2000); // Delay of 2000 milliseconds (2 seconds)
            } else {
                // Create the error message element
                wrongLogin.innerHTML = `<div class='wrong-credentials'>Invalid credentials. Please try again.</div>`;
                // Insert the error message after the sign-in button
                signInButton.insertAdjacentElement('afterend', wrongLogin);

                // Trigger the fade-in effect
                setTimeout(() => {
                    wrongLogin.firstChild.classList.add('show'); // Add the show class
                }, 10); // Small timeout to allow the DOM to update

                // Set a timeout to remove the error message after 5 seconds
                setTimeout(() => {
                    wrongLogin.firstChild.classList.remove('show'); // Remove the show class for fade-out
                    setTimeout(() => {
                        wrongLogin.remove(); // Remove the error message from the DOM
                    }, 500); // Wait for the fade-out transition to complete
                }, 5000); // Delay of 5000 milliseconds (5 seconds)
            }
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    // Add mobile menu toggle functionality here
    const nav = document.querySelector('nav');
    if (nav) {
        // Add mobile menu functionality as needed
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 