const leftContainer = document.querySelector('.main-container-left');
const middleContainer = document.querySelector('.main-container-middle');
const rightContainer = document.querySelector('.main-container-right');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const subHeader = document.querySelector('.sub-header');
const dropdownMenu = document.getElementById('dropdownMenu');
const profileDropdown = document.getElementById('profileDropdown');
const companyDropdown = document.getElementById('companyDropdown');
const subHeaderProfile = document.querySelector('.sub-header-profile');
const subHeaderCompany = document.querySelector('.sub-header-company');

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

function moveContainers(direction) {
    if (direction === 'left') {
        // Swap left and middle, then middle and right
        swapContent(leftContainer, middleContainer);
        swapContent(leftContainer, rightContainer);
    } else if (direction === 'right') {
        // Swap right and middle, then middle and left
        swapContent(rightContainer, middleContainer);
        swapContent(rightContainer, leftContainer);
    }
}

leftArrow.addEventListener('click', () => moveContainers('left'));
rightArrow.addEventListener('click', () => moveContainers('right'));

function toggleDropdown(event) {
    event.stopPropagation(); // Prevent the click from bubbling up
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

subHeaderProfile.addEventListener('click', toggleDropdown);
subHeaderCompany.addEventListener('click', toggleDropdown);

// Optional: Close the dropdown if clicked outside
document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
});

// Function to handle middle container click
function handleMiddleClick() {
    const middleImage = document.querySelector('.main-container-middle img');
    const imageSrc = middleImage.getAttribute('src');
    
    // Determine which page to redirect to based on the current middle image
    if (imageSrc.includes('Truck_graphic')) {
        window.location.href = 'vehicle-logging.html';
    } else if (imageSrc.includes('Cross-drop')) {
        window.location.href = 'cross-drops.html';
    } else if (imageSrc.includes('Gas_station_graphic')) {
        window.location.href = 'site-data.html';
    }
}
function handleLeftClick() {
    const leftImage = document.querySelector('.main-container-left img');
    const leftImageSrc = leftImage.getAttribute('src');
    if (leftImageSrc.includes('Truck_graphic')) {
        window.location.href = 'vehicle-logging.html';
    } else if (leftImageSrc.includes('Cross-drop')) {
        window.location.href = 'cross-drops.html';
    } else if (leftImageSrc.includes('Gas_station_graphic')) {
        window.location.href = 'site-data.html';
    }
}
function handleRightClick() {
    const rightImage = document.querySelector('.main-container-right img');
    const rightImageSrc = rightImage.getAttribute('src');
    if (rightImageSrc.includes('Truck_graphic')) {
        window.location.href = 'vehicle-logging.html';
    } else if (rightImageSrc.includes('Cross-drop')) {
        window.location.href = 'cross-drops.html';
    } else if (rightImageSrc.includes('Gas_station_graphic')) {
        window.location.href = 'site-data.html';
    }
}

