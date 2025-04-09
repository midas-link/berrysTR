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
