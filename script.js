// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any interactive elements here
    initializeNavigation();
    initializeFormValidation();
});

// Form validation functionality
function initializeFormValidation() {
    const form = document.querySelector('.sign-in-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email === 'test@test.com' && password === 'test123') {
                alert('Login successful!');
                window.location.href = 'home.html'; // Redirect to home page
            } else {
                alert('Invalid credentials. Please try again.');
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