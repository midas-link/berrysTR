// Function to fetch and populate the table with data from site_data.json
async function fetchAndPopulateTable() {
    try {
        // Try to fetch from the server first
        const response = await fetch('table_data/site_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const siteData = await response.json();
        populateTable(siteData);
        createCityDropdown(siteData);
        createBuDropdown(siteData); 
        createStateDropdown(siteData);
        createSiteDropdown(siteData);
        disableBrowserAutocomplete(); // Disable browser autocomplete for all inputs
    } catch (error) {
        console.error('Error fetching site data:', error);
        
        // Fallback: Try to load the file using XMLHttpRequest for local file access
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'table_data/site_data.json', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const siteData = JSON.parse(xhr.responseText);
                    populateTable(siteData);
                    createCityDropdown(siteData);
                    createBuDropdown(siteData); // Create city dropdown after populating table
                    createStateDropdown(siteData);
                    createSiteDropdown(siteData);
                    disableBrowserAutocomplete(); // Disable browser autocomplete for all inputs
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    showErrorMessage();
                }
            } else {
                console.error('XHR error:', xhr.status);
                showErrorMessage();
            }
        };
        xhr.onerror = function() {
            console.error('XHR error occurred');
            showErrorMessage();
        };
        xhr.send();
    }
}

// Function to show an error message to the user
function showErrorMessage() {
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

// Helper function to format date as Month name day, Year
function formatDate(dateString) {
    if (!dateString) return '';
    
    // Split the date string into day, month, year
    const [day, month, year] = dateString.split('/');
    
    // Create a new date object (month is 0-based in JavaScript)
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to populate the table
function populateTable(siteData) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    siteData.forEach(row => {
        // Create the main row
        const mainRow = document.createElement('tr');
        mainRow.className = 'main-row';
        
        // Create the original cells
        const dateCell = document.createElement('td');
        dateCell.textContent = row.Date || '';
        
        const deliveryCell = document.createElement('td');
        deliveryCell.textContent = row['Delivery End'] || '';
        
        const siteCell = document.createElement('td');
        siteCell.textContent = row.SiteCode || '';
        
        const fuelCell = document.createElement('td');
        fuelCell.textContent = row.Delivered || '';
        
        // Append cells to main row
        mainRow.appendChild(dateCell);
        mainRow.appendChild(deliveryCell);
        mainRow.appendChild(siteCell);
        mainRow.appendChild(fuelCell);
        
        // Create the details row
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        detailsRow.style.display = 'none';
        
        const detailsCell = document.createElement('td');
        detailsCell.colSpan = 4;
        detailsCell.innerHTML = `<div class="details-header">Details:</div> <div class="details-content">
            ${formatDate(row.Date)} | ${row['Delivery Start '] || ''} to ${row['Delivery End'] || ''}
            \n<span class="label">Site code:</span> ${row.SiteCode || ''} | <span class="label">Business Unit:</span> ${row.BusinessUnitName || ''}
            \n${row.Address || ''} , ${row.City} ${row.State} | ${row.Zip}
            \n<span class="label">Fuel dropped:</span> ${row.Delivered || ''} | <span class="label">Tank:</span> T${row.TankNumber || ''}
        </div>`;
        detailsCell.className = 'details-cell';
        
        detailsRow.appendChild(detailsCell);
        
        // Add hover event listeners
        let hoverTimeout;
        mainRow.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            detailsRow.style.display = '';
            mainRow.classList.add('hover-row');
        });

        mainRow.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                detailsRow.style.display = 'none';
                mainRow.classList.remove('hover-row');
            }, ); // Small delay to prevent rapid toggling
        });

        // Also handle mouse events for the details row
        detailsRow.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            detailsRow.style.display = '';
            mainRow.classList.add('hover-row');
        });

        detailsRow.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                detailsRow.style.display = 'none';
                mainRow.classList.remove('hover-row');
            }, );
        });

        // Append both rows to the table
        tableBody.appendChild(mainRow);
        tableBody.appendChild(detailsRow);
    });
}

// Function to create a dropdown menu for the city field based on top repeated cities
function createCityDropdown(siteData) {
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
            filterTable(); // Apply the filter when a city is selected
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
        
        // Apply filter to table
        filterTable();
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
function createBuDropdown(siteData) {
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
            filterTable(); // Apply the filter when a city is selected
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
        
        // Apply filter to table
        filterTable();
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
function createStateDropdown(siteData) {
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
            filterTable(); // Apply the filter when a city is selected
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
        
        // Apply filter to table
        filterTable();
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
function createSiteDropdown(siteData) {
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
            filterTable(); // Apply the filter when a city is selected
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
        
        // Apply filter to table
        filterTable();
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
// Function to filter the table based on search inputs
function filterTable() {
    const businessUnit = document.getElementById('Business-unit').value.toLowerCase();
    const stAddress = document.getElementById('ST-address').value.toLowerCase();
    const state = document.getElementById('State').value.toLowerCase();
    const city = document.getElementById('City').value.toLowerCase();
    const site = document.getElementById('Site').value.toLowerCase();
    const zip = document.getElementById('Zip').value.toLowerCase();
    const date = document.getElementById('Date').value.toLowerCase();
    const fuel = document.getElementById('Fuel').value.toLowerCase();

    const rows = document.querySelectorAll('table tbody tr.main-row');
    
    // Track visible rows for re-styling
    let visibleRowCount = 0;
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const rowData = {
            date: cells[0].textContent.toLowerCase(),
            deliveredAt: cells[1].textContent.toLowerCase(),
            siteCode: cells[2].textContent.toLowerCase(),
            fuelDropped: cells[3].textContent.toLowerCase()
        };

        // Get the details row that follows this main row
        const detailsRow = row.nextElementSibling;
        const detailsText = detailsRow ? detailsRow.textContent.toLowerCase() : '';

        const shouldShow = (
            rowData.date.includes(date) &&
            rowData.deliveredAt.includes(stAddress) &&
            rowData.siteCode.includes(site) &&
            rowData.fuelDropped.includes(fuel) &&
            detailsText.includes(businessUnit) &&
            detailsText.includes(city) &&
            detailsText.includes(state) &&
            detailsText.includes(zip)
        );

        // Show/hide both the main row and its details row
        row.style.display = shouldShow ? '' : 'none';
        if (detailsRow) {
            detailsRow.style.display = 'none'; // Always initially hide details rows
        }
        
        // Apply alternating styles manually to visible rows
        if (shouldShow) {
            // Apply styling based on the visible row count
            if (visibleRowCount % 2 === 0) {
                row.style.backgroundColor = '#f8f9fa';
            } else {
                row.style.backgroundColor = '#EAF3FC';
            }
            visibleRowCount++;
            
            // IMPORTANT: Set the details row background to match its main row
            if (detailsRow) {
                const mainRow = detailsRow.previousElementSibling;
                detailsRow.style.backgroundColor = mainRow.style.backgroundColor;
            }
        }
    });
}

// Function to disable browser autocomplete for all input fields
function disableBrowserAutocomplete() {
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

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateTable();
    addFilterFunctionality();
    addClearButtonFunctionality();
});

// Add event listeners for search functionality
function addFilterFunctionality() {
    const inputs = document.querySelectorAll('.search-fields input');
    inputs.forEach(input => {
        input.addEventListener('input', filterTable);
    });
}

// Add functionality to the clear button
function addClearButtonFunctionality() {
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', function() {
        // Clear all input fields
        document.querySelectorAll('.search-fields input').forEach(input => {
            input.value = '';
        });
        
        // Show all rows in the table and reset styling
        let count = 0;
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            if (row.classList.contains('main-row')) {
                row.style.display = '';
                row.classList.remove('hover-row');
                // Reset background based on alternating pattern
                if (count % 2 === 0) {
                    row.style.backgroundColor = '#f8f9fa';
                } else {
                    row.style.backgroundColor = '#EAF3FC';
                }
                count++;
            } else if (row.classList.contains('details-row')) {
                row.style.display = 'none';
                // Make sure details row has same background as its main row
                const mainRow = row.previousElementSibling;
                row.style.backgroundColor = mainRow.style.backgroundColor;
            }
        });
        
        // Reset the city dropdown to show all cities
        const cityDropdown = document.getElementById('cityDropdown');
        const dropdownItems = cityDropdown.getElementsByClassName('dropdown-item');
        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].style.display = '';
        }
        
        // Show live status and update table
        toggleLiveStatus();
    });
}
