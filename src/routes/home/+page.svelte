<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  let leftContainer;
  let middleContainer;
  let rightContainer;
  let leftArrow;
  let rightArrow;
  let dropdownMenu;
  let subHeaderProfile;
  let subHeaderCompany;

  // Function to swap content between containers
  function swapContent(container1, container2) {
    // Swap images
    const tempImgSrc = container1.querySelector('img').src;
    container1.querySelector('img').src = container2.querySelector('img').src;
    container2.querySelector('img').src = tempImgSrc;
    
    // Swap text
    const tempText = container1.querySelector('span').textContent;
    container1.querySelector('span').textContent = container2.querySelector('span').textContent;
    container2.querySelector('span').textContent = tempText;
  }

  // Function to move containers
  function moveContainers(direction) {
    if (direction === 'left') {
      // Swap left and middle, then left and right
      swapContent(leftContainer, middleContainer);
      swapContent(leftContainer, rightContainer);
    } else if (direction === 'right') {
      // Swap right and middle, then right and left
      swapContent(rightContainer, middleContainer);
      swapContent(rightContainer, leftContainer);
    }
  }

  // Function to toggle dropdown
  function toggleDropdown(event) {
    event.stopPropagation(); // Prevent the click from bubbling up
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  }

  // Page navigation functions
  function handleMiddleClick() {
    const middleImage = middleContainer.querySelector('img');
    const imageSrc = middleImage.getAttribute('src');
    
    // Determine which page to redirect to based on the current middle image
    if (imageSrc.includes('Truck_graphic')) {
      window.location.href = `${base}/vehicle-logging`;
    } else if (imageSrc.includes('Cross-drop')) {
      window.location.href = `${base}/cross-drops`;
    } else if (imageSrc.includes('Gas_station_graphic')) {
      window.location.href = `${base}/site-data`;
    }
  }

  function handleLeftClick() {
    const leftImage = leftContainer.querySelector('img');
    const leftImageSrc = leftImage.getAttribute('src');
    if (leftImageSrc.includes('Truck_graphic')) {
      window.location.href = `${base}/vehicle-logging`;
    } else if (leftImageSrc.includes('Cross-drop')) {
      window.location.href = `${base}/cross-drops`;
    } else if (leftImageSrc.includes('Gas_station_graphic')) {
      window.location.href = `${base}/site-data`;
    }
  }

  function handleRightClick() {
    const rightImage = rightContainer.querySelector('img');
    const rightImageSrc = rightImage.getAttribute('src');
    if (rightImageSrc.includes('Truck_graphic')) {
      window.location.href = `${base}/vehicle-logging`;
    } else if (rightImageSrc.includes('Cross-drop')) {
      window.location.href = `${base}/cross-drops`;
    } else if (rightImageSrc.includes('Gas_station_graphic')) {
      window.location.href = `${base}/site-data`;
    }
  }

  // Handle click outside dropdown
  function handleClickOutside() {
    dropdownMenu.style.display = 'none';
  }

  // Mobile menu functionality 
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

  onMount(() => {
    // Get references to DOM elements after component is mounted
    leftContainer = document.querySelector('.main-container-left');
    middleContainer = document.querySelector('.main-container-middle');
    rightContainer = document.querySelector('.main-container-right');
    leftArrow = document.querySelector('.left-arrow');
    rightArrow = document.querySelector('.right-arrow');
    dropdownMenu = document.getElementById('dropdownMenu');
    subHeaderProfile = document.querySelector('.sub-header-profile');
    subHeaderCompany = document.querySelector('.sub-header-company');

    // Set up event listeners
    leftArrow.addEventListener('click', () => moveContainers('left'));
    rightArrow.addEventListener('click', () => moveContainers('right'));
    subHeaderProfile.addEventListener('click', toggleDropdown);
    subHeaderCompany.addEventListener('click', toggleDropdown);
    document.addEventListener('click', handleClickOutside);

    // Set up mobile menu
    setupMobileMenu();

    // Clean up event listeners when component is destroyed
    return () => {
      leftArrow.removeEventListener('click', () => moveContainers('left'));
      rightArrow.removeEventListener('click', () => moveContainers('right'));
      subHeaderProfile.removeEventListener('click', toggleDropdown);
      subHeaderCompany.removeEventListener('click', toggleDropdown);
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>
  
  <svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <title>Home</title>
  </svelte:head>
  
  <header>
    <div class="header-container">
      <div class="top-header">
        <a class="top-header-link" href="https://berrys.com">berrys.com</a>
        <a class="top-header-link" href=" ">Contact Us</a>
      </div>
      <div class="header">
        <div class="header-background"></div>
        <div class="hamburger-menu" id="hamburger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a href="{base}/home">Home</a>
        <a href="{base}/vehicle-logging">Vehicle Logging</a>
        <a href="{base}/cross-drops">Cross-Drop Prevention</a>
        <a href="{base}/site-data">Site Data</a>
        <a href="{base}/inventory">Inventory</a>
        <a href="{base}/analytics">Analytics</a>
        <input type="text" placeholder="Search...">
        <img src="{base}/images/Midas_Link_logo.png" alt="Berrys Logo">
      </div>
    </div>
  </header>
  
  <!-- Mobile sidebar navigation -->
  <div class="mobile-sidebar" id="mobile-sidebar">
    <a href="{base}/home">Home</a>
    <a href="{base}/vehicle-logging">Vehicle Logging</a>
    <a href="{base}/cross-drops">Cross-Drop Prevention</a>
    <a href="{base}/site-data">Site Data</a>
    <a href="{base}/inventory">Inventory</a>
    <a href="{base}/analytics">Analytics</a>
  </div>
  
  <div class="overlay" id="overlay"></div>
  
  <div class="sub-header-container">
    <div class="sub-header">
      <div class="sub-header-profile">
        <img class="profile-pic" src="{base}/images/NicePng_gray.png" alt="profile-logo">
        <div class="sub-header-profile-name">Darren Keane</div>
      </div>
      <div class="sub-header-company">
        <img class="company-logo" src="{base}/images/circle-k-logo.png" alt="company-logo">
        <div class="sub-header-role">( Area Manager )</div>
      </div>
    </div>
    <div class="dropdown-menu" id="dropdownMenu">
      <a href="{base}/login" id="logout">Logout</a>
      <a href="{base}/manageAcc">Manage Account</a>
    </div>
  </div>
  
  <main>
    <div class="main-container">
      <img src="{base}/svg/left-arrow.svg" alt="left-arrow" class="left-arrow">
      <div class="main-container-left" on:click={handleLeftClick}>
        <img src="{base}/images/Truck_graphic.png" alt="Truck Graphic" />
        <span class="main-container-left-sub-title">Vehicle Logging</span>
      </div>
      
      <div class="main-container-middle" on:click={handleMiddleClick}>
        <img src="{base}/images/Cross-drop graphic.png" alt="Cross-drop" />
        <span class="main-container-middle-sub-title">Cross-Drop Prevention</span>
      </div>
      
      <div class="main-container-right" on:click={handleRightClick}>
        <img src="{base}/images/Gas_station_graphic.png" alt="Gas Station Graphic" />
        <span class="main-container-right-sub-title">Site Data</span>
      </div>
      <img src="{base}/svg/right-arrow.svg" alt="right-arrow" class="right-arrow">
    </div>
  </main>
  
  <footer>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
      <span style="font-size: 1rem; font-family: Mulish;">@copyrights Berrys Global Innovations</span>
      <img src="{base}/images/logo.png" alt="Berrys Logo">
    </div>
  </footer>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    main {
      flex: 1;
      display: flex;
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
      position: relative; /* Ensure these elements are above the background */
      z-index: 1;
    }
    .header a {
      color: #FFFFFF;
      text-decoration: none;
      font-family: 'Mulish', sans-serif;
      font-weight: 700;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    .header a:nth-child(3) {
      margin-left: 10%;
    }
    
    /* Mobile menu styles */
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
      left: -250px;
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
        display: block;
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
      .sub-header {
        padding-left: 1vh;
      }
      .sub-header img {
        width: 3vh !important;
        height: 3vh !important;
      }
      .sub-header .company-logo{
        width: 3vh !important;
        height: 4vh !important;
      }
      .sub-header-profile-name {
        font-size: 0.8rem;
      }
      .sub-header-role {
        font-size: 0.8rem;
      }
      * {
        font-size: 0.75rem !important;
      }
      .main-container {
        margin-top: 20vh !important;
      }
      img.left-arrow {
        width: 20% !important;
        height: 20% !important;
      }
      img.right-arrow {
        width: 20% !important;
        height: 20% !important;
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
      padding: 1vh 1.5vw 1vh 1.5vw;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      outline: none;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" viewBox="0 0 24 24"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>');
      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 0.5vh center;
      margin-left: 1.5vw;
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
    .sub-header {
      display: flex;
      background-color: #F5F5F5;
      gap: 1vw;
      padding-left: 2.5vw;
      padding-top: 2vh;
    }
    .sub-header div {
      text-align: center;
      padding-bottom: 1vh;
      font-family: 'Mulish', sans-serif;
      font-weight: 600;
    }
    .sub-header img {
      width: 5vh;   
      height: 5vh;
      display: block;
      margin: 0 auto;
    }
    .company-logo{
      height: 6vh !important;
    }
    .sub-header-profile-name {
      margin: 1vh auto 0vh auto;
    }
    .main-container {
      display: flex;  
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 2vh;
      margin-top: 9vh;
    }
    .main-container div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .main-container-left {
      margin-left : 2.5vh;
    }
    .main-container-right {
      margin-right: 2.5vh;
    }
    .main-container img {
      width: 50%;
      height: 50%;
    }
    .main-container-middle {
      position: relative;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .main-container-left {
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .main-container-right {
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .main-container-middle:hover {
      transform: scale(1.05);
    }
    .main-container-left:hover {
      transform: scale(1.05);
    }
    .main-container-right:hover {
      transform: scale(1.05);
    }
    .main-container-middle img {
      width: 75%;
      height: 75%;
    }
    .main-container span {
      font-family: 'Mulish', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      color: #747474;
      text-decoration: underline;
      text-transform: uppercase;
      text-align: center;
    }
    img.left-arrow {
      width:10%;
      height:10%;
      align-self: center;
      padding-left: 2vh;
      cursor: pointer;
    }
    img.right-arrow {
      width:10%;
      height:10%;
      align-self: center;
      padding-right: 2vh;
      cursor: pointer;
    }
    .sub-header-container {
      position: relative;
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 2vw;
      background-color: #014B96;
      border: 1px solid #ccc;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
    .dropdown-menu a {
      display: block;
      padding: 2vh 3vw 2vh 3vw;
      font-family: 'Mulish', sans-serif;
      font-size: 1rem;
      color: #FFFFFF;
      text-decoration: underline;
    }
    .dropdown-menu a:hover{
      background-color: #0961b9;
    }
    .sub-header-profile, .sub-header-company {
      cursor: pointer;
    }
  </style>