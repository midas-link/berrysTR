<script>
  import { onMount } from "svelte";

     function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('overlay');
    
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    });
    
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
    });
    
    // Close the sidebar when clicking on a link
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
      });
    });
  }
  onMount(() =>{
setupMobileMenu();
  });
</script>
<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <title>Manage Account</title>
</svelte:head>

    <header>
        <div class="header-container">
            <div class="top-header">
                <a class="top-header-link" href="https://berrys.com">berrys.com</a>
                <a class="top-header-link" href="contact.html">Contact Us</a>
            </div>
            <div class="header">
                <div class="header-background"></div>
                <div class="hamburger-menu" id="hamburger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                <a href="/home">Home</a>
                <a href="/cross-drops">Cross-drop</a>
                <a href="/vehicle-logging">Vehicle Logging</a>
                <a href="/site-data">Site Data</a>
                <a href="/inventory">Inventory</a>
                <a href="/analytics">Analytics</a>
                <input type="text" placeholder="Search...">
                <img src="images/Midas_Link_logo.png" alt="Berrys Logo">
            </div>
        </div>
    </header>
    <div class="mobile-sidebar" id="mobile-sidebar">
        <a href="/home">Home</a>
        <a href="/vehicle-logging">Vehicle Logging</a>
        <a href="/cross-drops">Cross-Drop Prevention</a>
        <a href="/site-data">Site Data</a>
        <a href="/inventory">Inventory</a>
        <a href="/analytics">Analytics</a>
      </div>
      <div class="overlay" id="overlay"></div>
    <div class="sub-header-container">
        <div class="sub-header">
                <h1> Manage Account </h1>
                <span> Change your password, your new password will be assigned to the email address you used to sign in. </span>
              
        </div>
        <div class="breadcrumb">
            <a href="/home">Home</a> / <span>Manage Account</span>
        </div> 
    </div>
    <main>
        <div class="main-container">
            <div class="profile-details">
                <div class="header-profile">
                    <img src="images/NicePng_gray.png" alt="profile-logo">
                    <div class="header-profile-name">Darren Keane</div>
                </div>
                <div class="header-company">
                    <img class="company-logo" src="images/circle-k-logo.png" alt="company-logo">
                    <div class="header-role">(Area Manager)</div>
                </div>
            </div>
            <div class="form-container">
                <form action="">
                    <div class="form-row">
                        <label for="change-password">Change Password:</label>
                        <input type="password" id="change-password" name="change-password">
                    </div>
                    <div class="form-row">
                        <label for="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password">
                    </div>
                    <button type="submit">Reset</button>
                </form>
            </div>
        </div>
    </main>
    
    <footer>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
            <span style="font-size: 1rem; font-family: Mulish;">@copyrights Berrys Global Innovations</span>
            <img src="images/logo.png" alt="Berrys Logo" >
        </div>
    </footer>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        main {
            flex: 1; /* Allow main to grow and fill the space */
            background-color: #F9BC39;
            flex-direction: column;
            margin-bottom: 5vh;
        }
        ::placeholder {
            color: #FFFFFF;
        }
        .header-container {
            width: 100%;
            background: linear-gradient(to bottom, #001338 0%, #014B96 44%);
            position: relative;
            z-index: 1;
        }
        .top-header {
            display: flex;
            justify-content: flex-end;
            padding: 1vh 2vw;
        }
        .top-header-link {
            font-size: 0.875rem;
            font-family: 'Mulish', sans-serif;
            color: #AAAAAA;
            font-style: bold;
            margin-right: 2.5vw;
            text-decoration:none;
        }
        .top-header-link:last-child {
            margin-right: 20%;
        }
        .header {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2vw;
        }
        .header-background {
            position: absolute;
            top: 40%;
            left: 0;
            width: 100%;
            height: 70%;
            background: url('svg/Vector_1.svg') no-repeat left center;
            background-size: contain;
            mask-image: url('svg/Vector_1.svg');
            -webkit-mask-image: url('svg/Vector_1.svg');
            z-index: -1;
            opacity: 1;
        }
        .header img {
            width:225px;
            height:99px;
            scale:1.1;
            padding-bottom: 2vh;
            padding-right:0.5vw;
        }
        .header a, .header input, .header img {
            position: relative; 
            z-index: 1;
        }

        .header a {
            color: #FFFFFF;
            text-decoration: none;
            font-family: 'Mulish', sans-serif;
            font-weight: 700;
            transition: all 0.3s ease;
        }
        .header a:nth-child(3) {
            margin-left: 30%;
        }
        
        @media (max-width: 1000px) {    
            .header a:nth-child(2) {
        margin-left: 5%;
      }
      .header img {
        max-height: 6vh; /* Maintain height relative to viewport */
        max-width: 100%; /* Ensure it doesn't exceed the width of its container */
        height: auto; /* Maintain aspect ratio */
        width: auto;
        scale:1.1;
        margin-left:auto;
      }
      .header-background {
        top: 50%;
        height: 90%;
      }
      .header a {
        display:none;
      }
      .header input {
        display:none;
      }
      .hamburger-menu {
        display: block !important;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
  
      .sub-header {
        padding-left: 1vh;
      }
      * {
        font-size: 0.75rem !important;
      }

      footer img { 
        max-height: 6vh; /* Maintain height relative to viewport */
        max-width: 20%; /* Ensure it doesn't exceed the width of its container */
        height: auto; /* Maintain aspect ratio */
        width: auto !important;
      }
        }

        .header a:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }
        .header input {
            width: 8vw;
        }
        .header input[type="text"] {
            padding: 1vh 3vh 1vh 3vh;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(255, 255, 255, 0.1);
            color: white;
            outline: none;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" viewBox="0 0 24 24"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>');
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 0.5vh center;
        }
        @media (max-width: 900px) {
            .header input[type="text"] {
                width: 40%;
            }
        }
        .header input[type="text"]::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        footer {
            padding: 1.5rem 0;
            background: linear-gradient(to right, #001338, #014B96);
            color: white;
            width: 100%;
        }
        footer img {
            width: 10%;
            margin-left: 2%;
        }
        .sub-header-container {
            height: fit-content;
            position: relative;
            background-color: #F5F5F5;
            z-index: 1;
        }
        .sub-header {
            display: flex;
            align-items: center;
            padding-left: 5vh;
            padding-top: 2vh;
        }
        .sub-header span {
            padding-left: 10%;
            font-family: 'Mulish', sans-serif;
        }
        .sub-header h1 {
            color: #014B96;
            font-family: 'Mulish', sans-serif;
            white-space: nowrap;
            font-weight: 400;
            }
        .breadcrumb {
        margin-top:2vh;
        padding: 0.5vh 2vh 0.5vh 3vh;
        color: #014B96;
        background-color: #F9BC39;
        width: fit-content;
        border-radius: 20px;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
        }
        .breadcrumb span,
        .breadcrumb a {
        font-family: 'Mulish', sans-serif;
        text-decoration: none;
        color: #014B96;
        font-size: 0.875rem;
        font-weight: 700;
        font-style: bold;
        }
        .breadcrumb a:hover {
        text-decoration: underline;
        }
        .hamburger-menu {
        display: none;
        cursor: pointer;
        z-index: 1000;
        }
    
        .hamburger-menu span {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px 0;
        background-color: white;
        border-radius: 3px;
        transition: 0.3s;
        }
        
        .mobile-sidebar {
        position: fixed;
        top: 0;
        left:-250px;
        width: 250px;
        height: 100vh;
        background: linear-gradient(to bottom, #001338 0%, #014B96 100%);
        z-index: 999;
        transition: left 0.3s ease;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        padding-top: 60px;
        overflow-y: auto;
        }
        :global(.mobile-sidebar.active) {
        left: 0;
        }
    
    .mobile-sidebar a {
      display: block;
      padding: 15px 20px;
      font-family: 'Mulish', sans-serif;
      font-weight: 600;
      color: white;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .mobile-sidebar a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 998;
      display: none;
    }
    
        .main-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 4vh;
            border-top-left-radius: 20px;
            background-color: white;
            height: 100%;
        }
        .header-role,
        .header-profile-name {
            text-align: center;
            padding-top: 1vh;
            padding-left: 1vh;
            padding-bottom: 1vh;
            font-size: 1rem;
            font-family: Mulish;
            font-weight: 600;  
        }
        .header-profile img{
            width: 6vh;   
            height: 6vh;
            display: block;
            margin: 0 auto;
        }
        .header-company img {
            width: 5vh;
            height: 6vh;
            display: block;
            margin: 0 auto;
        }
        .profile-details {
            display: flex;
            flex-direction: row; /* Align children in a row */
            justify-content: space-between; /* Optional: space them out evenly */
            align-items: center; /* Optional: center them vertically */
        }
        .form-container {
            border-radius: 25px;
            background-color: #FAFAFA;
            font-family: 'Mulish', sans-serif;
            font-weight: 500;
            font-size: 1rem;
            display: flex;        
            justify-content: center;
            align-items: center;
            padding: 4vh 4vh 4vh 4vh;
            width: fit-content;
            margin-top: 2vh;
        }
        .form-container input {
            padding: 0.5vh 0.5vh 0.5vh 0.5vh;
            border-radius: 2px;
            border:0px;
            background-color: #EAF3FC;
        }
        .form-row {
            display: flex;
            align-items: center; /* Align items vertically centered */
            margin-bottom: 4vh; /* Add some space between rows */
        }
        .form-row label {
            margin-right: 3vh; /* Add space between label and input */
        }
        .form-container form {
            display: flex;
            flex-direction: column; /* Stack children vertically */
            align-items: center; /* Center children horizontally */
        }
        .form-container button {
            background-color: #014B96;
            color: white;
            border-radius: 15px;
            text-align: center;
            padding: 0.5vh 7vh 0.5vh 7vh;
            font-family: 'Mulish', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            margin-top: 1vh; 
        }
        .form-container button:hover {
            background-color: #012F5E;
        }

    </style>