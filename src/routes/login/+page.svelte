<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
    function initializeFormValidation() {
    const form = document.querySelector('.sign-in-form');
    const signInButton = document.querySelector('.sign-in-button');
    const wrongLogin = document.createElement('div');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email === 'berrys@test.com' && password === 'Berrys@123!') {
                // Show the pop-up
                const popup = document.getElementById('popup');
                popup.style.display = 'flex';

                setTimeout(() => {
                    window.location.href = `${base}/home`;
                }, 2000); // Delay of 2000 milliseconds (2 seconds)
            } else {
                wrongLogin.innerHTML = `<div class='wrong-credentials'>Invalid credentials. Please try again.</div>`;
                signInButton.insertAdjacentElement('afterend', wrongLogin);

                // Trigger the fade-in effect
                setTimeout(() => {
                    wrongLogin.firstChild.classList.add('show'); 
                }, 10); // Small timeout to allow the DOM to update

                // Set a timeout to remove the error message after 5 seconds
                setTimeout(() => {
                    wrongLogin.firstChild.classList.remove('show'); 
                    setTimeout(() => {
                        wrongLogin.remove(); 
                    }, 500); 
                }, 5000); 
            }
        });
    }
}

onMount(()=>{

    // Initialize any interactive elements here
    initializeFormValidation();

});
</script>
<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
</svelte:head>
<div class="body-container">
    <main>
        <div class="content">
            <div class="sign-in-container">
                <form class="sign-in-form">
                    <p class="sign-in-title">Sign in to your account</p>
                    <div class="form-group">
                        <label for="email"> Your email</label>
                        <input type="email" id="email" name="email" placeholder="email@domain.com" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="•••••••••" required>
                    </div>
                    <div class="form-group below-password-container">
                        <label class="checkbox-container">
                            <input type="checkbox" name="remember">
                            <span class="checkmark"></span>
                            Remember me
                        </label>
                        <a href=" " class="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" class="sign-in-button">Sign In</button>
                    <div class="no-account">Don't have an account? <a class="sign-up-link" href="{base}/register">Sign up</a></div>
                </form>
                <div id="popup" class="popup" style="display: none;">
                    <div class="popup-content">
                        <p id="popup-message">✅ Logged in successfully.</p>
                        <div id="loading-indicator" class="loading-indicator" >
                            <p>Loading...</p>
                            <div class="spinner"></div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div> 
    </main>
</div>
    <footer>
         <img src="{base}/images/logo.png" alt="logo">
    </footer>

<style>
    :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        --background-color: #ffffff;
        --text-color: #000000;
        --font-family: 'Mulish';
        --font-size: 1rem;
        --gradient-start: #014B96;
        --gradient-end: #001338;
        --text-weight: 400;
        -webkit-text-size-adjust: 100%;
        font-feature-settings: normal;
        font-variation-settings: normal;
    }
    ::placeholder {
        font-size:0.875rem;
        color: #848484;
    }
    /* Reset and Base Styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .body-container {
        font-family: var(--font-family);
        line-height: 1.6;
        color: var(--text-color);
        background-color: var(--background-color);
        background-image: url('images/Sign-in-page.jpg');
        background-size:cover;
        background-repeat: no-repeat;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
    }
    
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 2rem 0;
    }
    
    
    /* Content Section */
    .content {
        padding: 2rem 0;
        padding-left: 10%;
    }
    
    /* Footer */
    footer {
        padding: 1.5rem 0;
        background: linear-gradient(to right, #001338, #014B96);
        color: white;
    }
    footer img {
        width:300px;
        height:78px;
        margin-left: 2%;
    }
    
    /* Responsive Design */
    @media (max-width: 900px) {
        
        .sign-in-container {
            padding: 1rem;
            justify-content: center;
        }
        
        .content {
            padding: 1rem 0;
        }
    }
    
    /* Sign In Form Styles */
    .sign-in-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 80vh;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding-right: 5%;
        flex: 1;
    }
    
    .sign-in-form {
        background: white;
        padding: clamp(1.5rem, 4vw, 2rem);
        padding-bottom: 0.25rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
    }
    
    .sign-in-form p.sign-in-title {
        background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: 1.25rem;
        white-space: nowrap;
        margin-bottom: 1.5rem;
        font-weight: 800;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    .form-group.below-password-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: RGB(115, 115, 115);
        font-size: 0.875rem;
        font-family: Inter;
    }
    
    .form-group input[type="email"],
    .form-group input[type="password"] {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        color: #848484;
        background-color: #EAF3FC;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus {
        outline: none;
        border-color: var(--gradient-end);
    }
    
    .form-group .checkbox-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 0.875rem;
        color:#737373;
    }
    .sign-up-link {
        color: var(--gradient-start);
        text-decoration: none;
    }
    
    .forgot-password {
        float: right;
        color: #014B96;
        text-decoration: none;
        font-size: 0.875rem;
        font-family: 'Inter';
    }
    
    .forgot-password:hover {
        text-decoration: underline;
    }
    
    .sign-in-button {
        width: 100%;
        padding: 0.75rem;
        background: #014B96;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: opacity 0.3s ease;
        margin-bottom: 1.5rem;
        text-transform: uppercase;
        font-weight: 700;
    }
    
    .sign-in-button:hover {
        background-color: #012F5E;
    }
    .no-account{
        font-size:0.875rem;
        font-family: 'Inter';
        margin-bottom: 1vh;
        color:#737373;
    }
    .popup {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .popup-content {
        background-color: white;
        padding: 2vh 2vw;
        border-radius: 5px;
        text-align: center;
        font-family : 'Mulish';
        white-space: nowrap;
    }
    :global(.wrong-credentials) {
        color: red;
        align-items: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    :global(.wrong-credentials.show) {
        opacity: 1;
    }
    /* Custom Checkbox Styles */
    .checkbox-container input[type="checkbox"] {
        display: none;
    }
    
    .checkmark {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 2px solid #ddd;
        border-radius: 3px;
        position: relative;
        background-color: #EAF3FC;
        transition: all 0.3s ease;
    }
    
    .checkbox-container input:checked + .checkmark {
        background-color: #014B96;
        border-color: #014B96;
    }
    
    .checkbox-container input:checked + .checkmark::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
    
    .loading-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }
    
    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3); /* Light border for the spinner */
        border-top: 4px solid #014B96; /* Top border color for the spinner */
        border-radius: 50%; /* Make it circular */
        width: 24px; /* Size of the spinner */
        height: 24px; /* Size of the spinner */
        animation: spin 1s linear infinite; /* Animation for spinning */
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); } /* Start at 0 degrees */
        100% { transform: rotate(360deg); } /* End at 360 degrees */
    }
</style>    