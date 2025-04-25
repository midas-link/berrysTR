// Store the site data globally so we can access it for filtering
let globalSiteData = [];

// Function to fetch and populate the table with data from site_data.json

export async function fetchSiteData() {
    // If data is already loaded, return it
    if (globalSiteData.length > 0) {
        return globalSiteData;
    }
    
    try {
        // Try to fetch from the server
        const response = await fetch('/table_data/site_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const siteData = await response.json();
        globalSiteData = siteData; // Store data globally
        return siteData;
    } catch (error) {
        console.error('Error fetching site data:', error);
        
        // Return a promise that resolves with data from XMLHttpRequest
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'table_data/site_data.json', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {   
                        const siteData = JSON.parse(xhr.responseText);
                        globalSiteData = siteData;
                        resolve(siteData);
                    } catch (e) {
                        console.error('Error parsing JSON:', e);
                        reject(e);
                    }
                } else {
                    console.error('XHR error:', xhr.status);
                    reject(new Error(`XHR error: ${xhr.status}`));
                }
            };
            xhr.onerror = function() {
                console.error('XHR error occurred');
                reject(new Error('XHR error occurred'));
            };
            xhr.send();
        });
    }
}

// Function to show an error message to the user
export function showErrorMessage() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="11" style="text-align: center; padding: 20px;">
                <p style="color: red; font-weight: bold;">Error loading data. Please make sure you're running this page through a web server.</p>
                <p>If you're opening the file directly in a browser, you need to use a local web server.</p>
                <p>You can use tools like Live Server in VS Code or Python's http.server.</p>
            </td>
        </tr>
    `;
}



// Function to create a dropdown menu for the city field based on top repeated cities
export function createCityDropdown(siteData) {
    // Extract all unique cities from the data
    const uniqueCities = [...new Set(siteData.map(row => row.City).filter(city => city && city.trim() !== ''))];
    
    // Get the city input field and dropdown container
    const cityInput = document.getElementById('City');
    const dropdownContent = document.getElementById('cityDropdown');
    
    // Prevent browser autocomplete
    cityInput.setAttribute('autocomplete', 'off');
    cityInput.setAttribute('autocorrect', 'off');
    cityInput.setAttribute('autocapitalize', 'off');
    cityInput.setAttribute('spellcheck', 'false');
    
    // Add a random name to prevent browser autocomplete
    const randomName = 'city_' + Math.random().toString(36).substring(2, 9);
    cityInput.setAttribute('name', randomName);
    
    // Add options for each unique city
    uniqueCities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = city;
        item.addEventListener('click', function() {
            cityInput.value = city;
            dropdownContent.classList.remove('show');
        });
        dropdownContent.appendChild(item);
    });
    
    // Toggle dropdown on input click
    cityInput.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from being captured by the document
       // dropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('#City') && !event.target.matches('.dropdown-item')) {
            dropdownContent.classList.remove('show');
        }
    });
    // Filter dropdown items when typing
    cityInput.addEventListener('input', function() {
        const filter = cityInput.value.toLowerCase();
        const items = dropdownContent.getElementsByClassName('dropdown-item');
        
        for (let i = 0; i < items.length; i++) {
            const txtValue = items[i].textContent || items[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
        
        // Show dropdown when typing
        dropdownContent.classList.add('show');
    });
    
    // Add a dropdown indicator to show it's clickable
    cityInput.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23014B96\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')";
    cityInput.style.backgroundRepeat = "no-repeat";
    cityInput.style.backgroundPosition = "right 8px center";
    cityInput.style.backgroundSize = "16px";
    cityInput.style.paddingRight = "30px";
    
    // Make sure the dropdown is visible when clicking on the input
    cityInput.addEventListener('focus', function() {
        dropdownContent.classList.add('show');
    });
}
export function createBuDropdown(siteData) {
    // Extract all unique cities from the data
    const uniqueBUs = [...new Set(siteData.map(row => row.BusinessUnitName).filter(BU => BU && BU.trim() !== ''))];
    
    // Get the city input field and dropdown container
    const BuInput = document.getElementById('Business-unit');
    const dropdownContent = document.getElementById('BuDropdown');
    
    // Prevent browser autocomplete
    BuInput.setAttribute('autocomplete', 'off');
    BuInput.setAttribute('autocorrect', 'off');
    BuInput.setAttribute('autocapitalize', 'off');
    BuInput.setAttribute('spellcheck', 'false');
    
    // Add a random name to prevent browser autocomplete
    const randomName = 'bu_' + Math.random().toString(36).substring(2, 9);
    BuInput.setAttribute('name', randomName);
    
    // Add options for each unique city
    uniqueBUs.forEach(BU => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = BU;
        item.addEventListener('click', function() {
            BuInput.value = BU;
            dropdownContent.classList.remove('show');
        });
        dropdownContent.appendChild(item);
    });
    
    // Toggle dropdown on input click
    BuInput.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from being captured by the document
       // dropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('#Businnes-Unit') && !event.target.matches('.dropdown-item')) {
            dropdownContent.classList.remove('show');
        }
    });
    // Filter dropdown items when typing
    BuInput.addEventListener('input', function() {
        const filter = BuInput.value.toLowerCase();
        const items = dropdownContent.getElementsByClassName('dropdown-item');
        
        for (let i = 0; i < items.length; i++) {
            const txtValue = items[i].textContent || items[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
        
        // Show dropdown when typing
        dropdownContent.classList.add('show');
    });
    
    // Add a dropdown indicator to show it's clickable
    BuInput.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23014B96\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')";
    BuInput.style.backgroundRepeat = "no-repeat";
    BuInput.style.backgroundPosition = "right 8px center";
    BuInput.style.backgroundSize = "16px";
    BuInput.style.paddingRight = "30px";
    
    // Make sure the dropdown is visible when clicking on the input
    BuInput.addEventListener('focus', function() {
        dropdownContent.classList.add('show');
    });
}
export function createStateDropdown(siteData) {
    // Extract all unique cities from the data
    const uniqueStates = [...new Set(siteData.map(row => row.State).filter(State => State && State.trim() !== ''))];
    
    // Get the city input field and dropdown container
    const StateInput = document.getElementById('State');
    const dropdownContent = document.getElementById('StateDropdown');
    
    // Prevent browser autocomplete
    StateInput.setAttribute('autocomplete', 'off');
    StateInput.setAttribute('autocorrect', 'off');
    StateInput.setAttribute('autocapitalize', 'off');
    StateInput.setAttribute('spellcheck', 'false');
    
    // Add a random name to prevent browser autocomplete
    const randomName = 'bu_' + Math.random().toString(36).substring(2, 9);
    StateInput.setAttribute('name', randomName);
    
    // Add options for each unique city
    uniqueStates.forEach(state => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = state;
        item.addEventListener('click', function() {
            StateInput.value = state;
            dropdownContent.classList.remove('show');
        });
        dropdownContent.appendChild(item);
    });
    
    // Toggle dropdown on input click
    StateInput.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from being captured by the document
       // dropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('#State') && !event.target.matches('.dropdown-item')) {
            dropdownContent.classList.remove('show');
        }
    });
    // Filter dropdown items when typing
    StateInput.addEventListener('input', function() {
        const filter = StateInput.value.toLowerCase();
        const items = dropdownContent.getElementsByClassName('dropdown-item');
        
        for (let i = 0; i < items.length; i++) {
            const txtValue = items[i].textContent || items[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
        
        // Show dropdown when typing
        dropdownContent.classList.add('show');
    });
    
    // Add a dropdown indicator to show it's clickable
    StateInput.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23014B96\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')";
    StateInput.style.backgroundRepeat = "no-repeat";
    StateInput.style.backgroundPosition = "right 8px center";
    StateInput.style.backgroundSize = "16px";
    StateInput.style.paddingRight = "30px";
    
    // Make sure the dropdown is visible when clicking on the input
    StateInput.addEventListener('focus', function() {
        dropdownContent.classList.add('show');
    });
}
export function createSiteDropdown(siteData) {
    // Extract all unique cities from the data
    const uniqueSites = [...new Set(siteData.map(row => row.SiteCode).filter(Site => Site && Site.trim() !== ''))];
    
    // Get the city input field and dropdown container
    const SiteInput = document.getElementById('Site');
    const dropdownContent = document.getElementById('SiteDropdown');
    
    // Prevent browser autocomplete
    SiteInput.setAttribute('autocomplete', 'off');
    SiteInput.setAttribute('autocorrect', 'off');
    SiteInput.setAttribute('autocapitalize', 'off');
    SiteInput.setAttribute('spellcheck', 'false');
    
    // Add a random name to prevent browser autocomplete
    const randomName = 'bu_' + Math.random().toString(36).substring(2, 9);
    SiteInput.setAttribute('name', randomName);
    
    // Add options for each unique city
    uniqueSites.forEach(site => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = site;
        item.addEventListener('click', function() {
            SiteInput.value = site;
            dropdownContent.classList.remove('show');
        });
        dropdownContent.appendChild(item);
    });
    
    // Toggle dropdown on input click
    SiteInput.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from being captured by the document
       // dropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('#State') && !event.target.matches('.dropdown-item')) {
            dropdownContent.classList.remove('show');
        }
    });
    // Filter dropdown items when typing
    SiteInput.addEventListener('input', function() {
        const filter = SiteInput.value.toLowerCase();
        const items = dropdownContent.getElementsByClassName('dropdown-item');
        
        for (let i = 0; i < items.length; i++) {
            const txtValue = items[i].textContent || items[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
        
        // Show dropdown when typing
        dropdownContent.classList.add('show');
    });
    
    // Add a dropdown indicator to show it's clickable
    SiteInput.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23014B96\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')";
    SiteInput.style.backgroundRepeat = "no-repeat";
    SiteInput.style.backgroundPosition = "right 8px center";
    SiteInput.style.backgroundSize = "16px";
    SiteInput.style.paddingRight = "30px";
    
    // Make sure the dropdown is visible when clicking on the input
    SiteInput.addEventListener('focus', function() {
        dropdownContent.classList.add('show');
    });
}


// Function to disable browser autocomplete for all input fields
export function disableBrowserAutocomplete() {
    // Get all input fields in the search fields section
    const inputs = document.querySelectorAll('.search-fields input');
    
    inputs.forEach(input => {
        // Set attributes to prevent browser autocomplete
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('spellcheck', 'false');
        
        // Add a random name to prevent browser autocomplete
        const randomName = input.id + '_' + Math.random().toString(36).substring(2, 9);
        input.setAttribute('name', randomName);

        // Special handling for state and zip fields
        if (input.id === 'State' || input.id === 'Zip' || input.id === 'Business-unit' || input.id === 'ST-address' || input.id ==='City') {
            input.setAttribute('autocomplete', 'new-password');
            input.setAttribute('data-lpignore', 'true');
            input.setAttribute('data-form-type', 'other');
        }
    });
}



// Add event listeners for search button functionality
export function addSearchButtonFunctionality() {
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', function() {
        filterTable();
        // The toggleLiveStatus is now handled in the HTML script
    });
}

export function addClearButtonFunctionality() {
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', function() {
        document.querySelectorAll('.search-fields input').forEach(input => {
            input.value = '';
        });
        
        // Repopulate table with all data
        populateTable(globalSiteData);
        
        const cityDropdown = document.getElementById('cityDropdown');
        const dropdownItems = cityDropdown.getElementsByClassName('dropdown-item');
        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].style.display = '';
        }
        
        toggleLiveStatus();
    });
}
