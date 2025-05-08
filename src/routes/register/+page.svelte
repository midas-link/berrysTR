<script>
      import { base } from '$app/paths';

</script>
<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
</svelte:head>

    <main style="background-image: url({base}/images/Sign-in-page.jpg)">
        <div class="register-container">
            <form class="register-form">
                <p class="register-title">Register your account to view delivery logs</p>
                <div class="form-group solo-input">
                    <label for="name">Company name</label>
                    <input type="text" id="name" name="name" placeholder="Company name" required>
                </div>
                <div class="form-group coupled-inputs">
                    <div class="input-pair">
                        <label for="firstname">First name</label>
                        <input type="text" id="firstname" name="firstname" placeholder="John" required>
                    </div>
                    <div class="input-pair">
                        <label for="surname">Surname</label>
                        <input type="text" id="surname" name="surname" placeholder="Smith" required>
                    </div>
                </div>
                <div class="form-group coupled-inputs">
                    <div class="input-pair">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="email@domain.com" required>
                    </div>
                    <div class="input-pair">
                        <label for="phone">Phone number</label>
                        <input type="tel" id="phone" name="phone" placeholder="07123456789" required>
                    </div>
                </div>
                <div class="form-group coupled-inputs">
                    <div class="input-pair">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="•••••••••" required>
                    </div>
                    <div class="input-pair">
                        <label for="confirm-password">Confirm password</label>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="•••••••••" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="checkbox-container">
                        <input type="checkbox" id="terms" name="terms" required>
                        <span class="checkmark"></span>
                        I accept the <a href=" ">terms and conditions</a>
                    </label>
                </div>
                <div class="form-group">
                    <label class="checkbox-container">
                        <input type="checkbox" id="newsletter" name="newsletter">
                        <span class="checkmark"></span>
                        I would like to receive the Berrys Newsletter and updates?
                    </label>
                </div>
                <div class="button-signin-container">
                    <button type="submit" class="register-button">Register</button>
                    <div class="signin-container">Already registered? <a href="{base}/login" style="padding-left:0.1vw">Sign in</a></div>
                </div>
            </form>
        </div>
    </main>

    <footer>
        <img src="{base}/images/logo.png" alt="logo">
    </footer>



<style>
    /* CSS Variables */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --text-color: #000000;
    --font-family: 'Mulish';
    --font-size: 1rem;
    --gradient-start: #014B96;
    --gradient-end: #001338;
    --text-weight: 400;
}

::placeholder {
    font-size: 1rem;
    color: #848484;
    font-weight:500;
}
label {
    display: block;
    margin-bottom: 0.5rem;
    color: #505050;
    font-size: 0.875rem;
    font-family: Inter;
}
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}



main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    min-height: 100vh;
}

/* Register Form Styles */
.register-container {
    display: flex;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
    max-width: 1200px;
    margin: 0;
    padding-left: 5%;
    padding-right: 5%;
    flex: 1;
}

.register-form {
    background: white;
    padding: clamp(1.5rem, 4vw, 2rem);
    padding-bottom: 0.25rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
}

.register-title {
    background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 2rem;
    white-space: nowrap;
    margin-bottom: 1rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group.coupled-inputs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.input-pair {
    flex: 1;
}

/* Common input styles */
.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
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

/* Solo input container */
.solo-input {
    max-width: 50%;
}

.button-signin-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.button-signin-container div {
    color: #505050;
}

.signin-container {
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-family: Inter;
    font-size: 0.875rem;
}

.register-button {
    padding: 0.75rem 2rem;
    background: #014B96;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.25rem;
    cursor: pointer;
    transition: opacity 0.3s ease;
    text-transform: uppercase;
    font-weight: 700;
}

.register-button:hover {
    background-color: #012F5E;
}

/* Footer */
footer {
    padding: 1.5rem 0;
    background: linear-gradient(to right, #001338, #014B96);
    color: white;
}

footer img {
    width: 300px;
    height: 78px;
    margin-left: 2%;
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

/* Links */
a {
    color: var(--gradient-start);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1000px) {
    .form-group.coupled-inputs {
        flex-direction: column;
        gap: 1rem;
    }
    .register-title{
        font-size:1.25rem;
    }
    .register-container {
        padding: 1rem;
        max-width: 100vw;
        max-height: 100vh;
    }
    
    .register-form {
        padding: 1.5rem;
    }
    main{
        min-height: 100vh;
    }
    body {
        min-height: 100vh;
    }

}

.form-group .checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-family: 'Inter';
    color: #737373;
}

</style>