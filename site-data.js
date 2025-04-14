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
        createCityDropdown(siteData); // Create city dropdown after populating table
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
                    createCityDropdown(siteData); // Create city dropdown after populating table
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

// Function to populate the table
function populateTable(siteData) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    siteData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.Date || ''}</td>
            <td>${row['Delivery Start '] || ''}</td>
            <td>${row['Delivery End'] || ''}</td>
            <td>${row.SiteCode || ''}</td>
            <td>${row.BusinessUnitName || ''}</td>
            <td>${row.Address || ''}</td>
            <td>${row.City || ''}</td>
            <td>${row.State || ''}</td>
            <td>${row.Zip || ''}</td>
            <td>${row.Delivered || ''}</td>
            <td>${row.TankNumber || ''}</td>
            <td>${row.Trailer || ''}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Function to create a dropdown menu for the city field based on top repeated cities
function createCityDropdown(siteData) {
    // Extract all unique cities from the data
    const uniqueCities = [...new Set(siteData.map(row => row.City).filter(city => city && city.trim() !== ''))];
    
    // Get the city select element
    const citySelect = document.getElementById('City');
    
    // Add options for each unique city
    uniqueCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
    
    // Add event listener to filter the table when a city is selected
    citySelect.addEventListener('change', function() {
        filterTable();
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

    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const shouldShow = (
            cells[0].textContent.toLowerCase().includes(date) && // Date
            cells[3].textContent.toLowerCase().includes(site) && // Site Code
            cells[4].textContent.toLowerCase().includes(businessUnit) && // Business Unit
            cells[5].textContent.toLowerCase().includes(stAddress) && // Address
            cells[6].textContent.toLowerCase().includes(city) && // City
            cells[7].textContent.toLowerCase().includes(state) && // State
            cells[8].textContent.toLowerCase().includes(zip) && // Zip
            cells[9].textContent.toLowerCase().includes(fuel) // Product
        );
        row.style.display = shouldShow ? '' : 'none';
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateTable();
    addFilterFunctionality();
});

// Add event listeners for search functionality
function addFilterFunctionality() {
    const inputs = document.querySelectorAll('.search-fields input');
    inputs.forEach(input => {
        input.addEventListener('input', filterTable);
    });
}
