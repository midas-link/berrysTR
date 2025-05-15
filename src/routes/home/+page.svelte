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
  let mainSwipeContainer;

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50; 

  function swapContent(container1, container2) {
    if (!container1 || !container2) return; 
    container1.classList.add('transitioning');
    container2.classList.add('transitioning');

    const img1 = container1.querySelector('img');
    const span1 = container1.querySelector('span');
    const img2 = container2.querySelector('img');
    const span2 = container2.querySelector('span');

    setTimeout(() => {
    if (img1 && img2) {
      const tempImgSrc = img1.src;
      img1.src = img2.src;
      img2.src = tempImgSrc;
    }
    
    if (span1 && span2) {
      const tempText = span1.textContent;
      span1.textContent = span2.textContent;
      span2.textContent = tempText;
    }
    setTimeout(() => {
      container1.classList.remove('transitioning')
      container2.classList.remove('transitioning')
    }, 100);
  },100);
  }

  function moveContainers(direction) {
    if (leftArrow) leftArrow.style.pointerEvents = 'none';
    if (rightArrow) rightArrow.style.pointerEvents = 'none';
    if (direction === 'left') {

      swapContent(leftContainer, middleContainer);
      swapContent(leftContainer, rightContainer);
    } else if (direction === 'right') {
      swapContent(rightContainer, middleContainer);
      swapContent(rightContainer, leftContainer);
    }
    setTimeout(() => {
    if (leftArrow) leftArrow.style.pointerEvents = 'auto';
    if (rightArrow) rightArrow.style.pointerEvents = 'auto';
  }, 200); 
  }

  function toggleDropdown(event) {
    event.stopPropagation(); 
    if (dropdownMenu) {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    }
  }

  function navigateBasedOnImage(imageSrc) {
    if (!imageSrc) return;
    if (imageSrc.includes('Truck_graphic')) {
      window.location.href = `${base}/vehicle-logging`;
    } else if (imageSrc.includes('Cross-drop')) {
      window.location.href = `${base}/cross-drops`;
    } else if (imageSrc.includes('Gas_station_graphic')) {
      window.location.href = `${base}/site-data`;
    }
  }

  function handleMiddleClick() {
    if (middleContainer) {
      const middleImage = middleContainer.querySelector('img');
      if (middleImage) navigateBasedOnImage(middleImage.getAttribute('src'));
    }
  }

  function handleLeftClick() {
    if (leftContainer) {
      const leftImage = leftContainer.querySelector('img');
      if (leftImage) navigateBasedOnImage(leftImage.getAttribute('src'));
    }
  }

  function handleRightClick() {
    if (rightContainer) {
      const rightImage = rightContainer.querySelector('img');
      if (rightImage) navigateBasedOnImage(rightImage.getAttribute('src'));
    }
  }

  function handleClickOutside(event) {
    if (dropdownMenu && !dropdownMenu.contains(event.target) && 
        subHeaderProfile && !subHeaderProfile.contains(event.target) &&
        subHeaderCompany && !subHeaderCompany.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  }
 
  function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (hamburger && sidebar && overlay) {
      hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
      });
      
      overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
      });
      
      const sidebarLinks = sidebar.querySelectorAll('a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
          sidebar.classList.remove('active');
          overlay.style.display = 'none';
        });
      });
    }
  }

  function handleTouchStart(event) {
    if (window.innerWidth > 1000) return; 
    touchStartX = event.touches[0].clientX;
    if (mainSwipeContainer) mainSwipeContainer.classList.add('touching');

  }

  function handleTouchMove(event) {
    if (window.innerWidth > 1000) return; 
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (window.innerWidth > 1000) return; 
    if (mainSwipeContainer) mainSwipeContainer.classList.remove('touching');
    if (touchStartX === 0 || touchEndX === 0) return; // No significant move

    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        moveContainers('right'); 
      } else {
        moveContainers('left');
      }
    }
    touchStartX = 0;
    touchEndX = 0;
  }


  onMount(() => {
    leftContainer = document.querySelector('.main-container-left');
    middleContainer = document.querySelector('.main-container-middle');
    rightContainer = document.querySelector('.main-container-right');
    leftArrow = document.querySelector('.left-arrow');
    rightArrow = document.querySelector('.right-arrow');
    dropdownMenu = document.getElementById('dropdownMenu');
    subHeaderProfile = document.querySelector('.sub-header-profile');
    mainSwipeContainer = document.querySelector('.main-container'); 

    const clickMoveLeft = () => moveContainers('left');
    const clickMoveRight = () => moveContainers('right');

    if (leftArrow) leftArrow.addEventListener('click', clickMoveLeft);
    if (rightArrow) rightArrow.addEventListener('click', clickMoveRight);
    if (subHeaderProfile) subHeaderProfile.addEventListener('click', toggleDropdown);
    if (subHeaderCompany) subHeaderCompany.addEventListener('click', toggleDropdown);
    document.addEventListener('click', handleClickOutside);

    if (mainSwipeContainer) {
      mainSwipeContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      mainSwipeContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      mainSwipeContainer.addEventListener('touchend', handleTouchEnd);
    }

    setupMobileMenu();

    return () => {
      if (leftArrow) leftArrow.removeEventListener('click', clickMoveLeft);
      if (rightArrow) rightArrow.removeEventListener('click', clickMoveRight);
      if (subHeaderProfile) subHeaderProfile.removeEventListener('click', toggleDropdown);
      if (subHeaderCompany) subHeaderCompany.removeEventListener('click', toggleDropdown);
      document.removeEventListener('click', handleClickOutside);

      if (mainSwipeContainer) {
        mainSwipeContainer.removeEventListener('touchstart', handleTouchStart);
        mainSwipeContainer.removeEventListener('touchmove', handleTouchMove);
        mainSwipeContainer.removeEventListener('touchend', handleTouchEnd);
      }
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
      <div class="header-background" style="background: url({base}/svg/Vector_1.svg) no-repeat left center; mask-image: url({base}/svg/Vector_1.svg'); -webkit-mask-image: url({base}/svg/Vector_1.svg);"></div>
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
      <div class="profile-column">
        <img class="profile-pic" src="{base}/images/NicePng_gray.png" alt="profile-logo">
        <div class="sub-header-profile-name">Darren Keane</div>
      </div>
      <div class="company-column">
        <img class="company-logo" src="{base}/images/circle-k-logo.png" alt="company-logo">
        <div class="sub-header-role">( Area Manager )</div>
      </div>
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
    
    <div class="main-container-left">
      <button style="border:0 ; background:none" on:click={handleLeftClick} >
      <img src="{base}/images/Truck_graphic.png"   alt="Truck Graphic" /> </button>
      <span class="main-container-left-sub-title">Vehicle Logging</span>
    </div>
    
    <div class="main-container-middle">
      <button style="border:0 ; background:none" on:click={handleMiddleClick} >
      <img src="{base}/images/Cross-drop graphic.png"   alt="Cross-drop" /></button>
      <span class="main-container-middle-sub-title">Cross-Drop Prevention</span>
    </div>
    
    <div class="main-container-right" >
      <button style="border:0 ; background:none" on:click={handleRightClick} >
      <img src="{base}/images/Gas_station_graphic.png"   alt="Gas Station Graphic" /> </button>
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
    touch-action: pan-y; 
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
    background-size: contain;
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
    white-space: nowrap;
  }
  .header a:nth-child(3) {
    margin-left: 10%;
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
      max-height: 8vh; 
      max-width: 100%; 
      height: auto; 
      width: auto;
      scale:1.1;
      margin-left:auto;
    }
    .header a {
      display:none;
    }
    .header input {
      display:none;
    }
    .header img[alt="Berrys Logo"] {
        display: block !important; 
    }
    .hamburger-menu {
        display: block !important;
        position: absolute;
        left: 30px;
        transform: translateY(-50%);
    }
    .sub-header {
      justify-content: center;
    }
    .dropdown-menu{
      left:30vw !important;
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
      padding: 0 !important;
      margin-top: 20vh !important; 
    }
    .main-container-middle{
      scale:1.3;
    }
    .main-container-left {
      margin-right: 10vw;
    }
    .main-container-right {
      margin-left: 10vw;
    }
    .main-container span{
      font-size:0.5rem !important;
    }
    img.left-arrow { 
      display:none;
    }
    img.right-arrow { 
      display:none;
    }
    footer img { 
      max-height: 10vh; 
      max-width: 30%; 
      height: auto; 
      width: auto !important;
    }
    .main-container img { 
    width: 22.5vw !important; 
    }
   .main-container-middle img {
  width: 30vw !important;
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
    padding: 0 2vw;
    margin-top: 9vh; 
  }
  .main-container div { 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main-container-left,
.main-container-middle,
.main-container-right {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.main-container-middle {
  position: relative;
  z-index: 2;
  transform: scale(1.05);
  transition: all 0.1s ease;
}
:global(.main-container-middle.transitioning) {
  transform: scale(1);
}
.main-container button {
  transition: all 0.1s ease;
}
.main-container span {
  transition: opacity 0.1s ease ;
}
:global(.transitioning span) {
  opacity: 0;
}
:global(.transitioning) {
  opacity: 0.9;
  transform: scale(0.95);
}
:global(.transitioning.visible) {
  opacity: 1;
  transform: scale(1);
}
  .main-container-left {
    margin-left : 2.5vw;
  }
  .main-container-right {
    margin-right: 2.5vw;
  }
  .main-container img { 
    width: 50%; 
    cursor: pointer;
    transition: transform 0.2s ease;
  }

   .main-container-middle img {
  width: 75%;
 }


  .main-container img:hover {
    transform: scale(1.05);
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
    margin-left: 2vw;
    cursor: pointer;
  }
  img.right-arrow { 
    width:10%;
    height:10%;
    align-self: center;
    margin-right: 2vw;
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
  .sub-header-profile {
    cursor: pointer;
    display: flex;
    gap: 1vw;
  }
  .profile-column, .company-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-pic {
    width: 5vh;
    height: 5vh;
    margin-bottom: 0.5vh;
  }
  .company-logo {
    width: 5vh;
    height: 6vh;
    margin-bottom: 0.5vh;
  }
  .sub-header-profile-name, .sub-header-role {
    font-size: 0.9rem;
    text-align: center;
  }
</style>