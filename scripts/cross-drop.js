// Add this data array
const tableData = [
    { date: "09.12.2025", time: "12:16", address: "2151 SW 36TH ST", city: "San Antonio", state: "TX", zip: "78237", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
    { date: "09.01.2025", time: "9:04", address: "207 E HWY 90A", city: "Richmond", state: "TX", zip: "77406", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
    { date: "08.14.2025", time: "5:52", address: "619 CROSSROADS ST", city: "Laredo", state: "TX", zip: "78045", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "6", preventedDelivery: "DIESEL" },
    { date: "07.09.2025", time: "2:40", address: "2901 highway 35 N", city: "Rockport", state: "TX", zip: "78382", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "06.30.2025", time: "23:28", address: "6321 S 23rd St.", city: "McAllen", state: "TX", zip: "78503", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
    { date: "06.24.2025", time: "20:16", address: "6321 S 23rd St.", city: "McAllen", state: "TX", zip: "78503", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "06.03.2025", time: "17:04", address: "11102 IH-37 Access", city: "Corpus Christi", state: "TX", zip: "78401", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "05.19.2025", time: "13:52", address: "2202 HOLLY ROAD", city: "Corpus Christi", state: "TX", zip: "78415", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "05.14.2025", time: "10:40", address: "9111 N. Interstate 35", city: "Jarrell", state: "TX", zip: "76537", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "7", preventedDelivery: "DIESEL" },
    { date: "04.23.2025", time: "7:28", address: "16555 HUEBNER RD", city: "San Antonio", state: "TX", zip: "78248", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "3", preventedDelivery: "DIESEL" },
    { date: "04.22.2025", time: "4:16", address: "1301 N LOOP 340", city: "LACY LAKEVIEW", state: "TX", zip: "76705", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "6", preventedDelivery: "DIESEL" },
    { date: "04.04.2025", time: "1:04", address: "720 SPRING VALLEY", city: "Hewitt", state: "TX", zip: "76643", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "02.22.2025", time: "21:52", address: "3225 E EXPY 83", city: "Weslaco", state: "TX", zip: "78596", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "02.11.2025", time: "18:40", address: "101 N WATER ST", city: "Burnet", state: "TX", zip: "78611", tankGrade: "GAS 91 NO ETH 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "01.29.2025", time: "15:28", address: "S. 9th & Tyler Ave.", city: "Harlingen", state: "TX", zip: "78550", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
    { date: "01.18.2025", time: "12:16", address: "S. 9th & Tyler Ave.", city: "Harlingen", state: "TX", zip: "78550", tankGrade: "High Ethanol ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "01.12.2025", time: "9:04", address: "15513 STATE HWY 30", city: "Roans Prairie", state: "TX", zip: "77875", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "01.03.2025", time: "5:52", address: "5202 IH 37", city: "Corpus Christi", state: "TX", zip: "78407", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "12.22.2024", time: "2:40", address: "12200 FM 969 RD", city: "Austin", state: "TX", zip: "78724", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "12.21.2024", time: "23:28", address: "905 N. McCoy Blvd.", city: "New Boston", state: "TX", zip: "75570", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "12.13.2024", time: "20:16", address: "101 EE OHNMEISS BLVD", city: "Lampasas", state: "TX", zip: "76550", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "12.02.2024", time: "17:04", address: "16222 WALLISVILLE RD", city: "Houston", state: "TX", zip: "77001", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "11.09.2024", time: "13:52", address: "27137 TOMBALL PKWY", city: "Tomball", state: "TX", zip: "77375", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "10.30.2024", time: "10:40", address: "6406 Old Pearsall Rd", city: "San Antonio", state: "TX", zip: "78252", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "09.09.2024", time: "7:28", address: "21997 FM 1314", city: "Porter", state: "TX", zip: "77365", tankGrade: "High Ethanol ", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "08.10.2024", time: "4:16", address: "9157 FM 471 N", city: "San Antonio", state: "TX", zip: "78253", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "06.28.2024", time: "1:04", address: "10537 N. Hwy. 359", city: "Mathis", state: "TX", zip: "78368", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "05.01.2024", time: "21:52", address: "1303 W MOUNT HOUSTON RD", city: "Houston", state: "TX", zip: "77001", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "04.28.2024", time: "18:40", address: "31700 INTERSTATE 10 W", city: "Boerne", state: "TX", zip: "78006", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" }
];
function formatDate(dateString) {
    if (!dateString) return '';
    
    // Split the date string into day, month, year
    const [month, day, year] = dateString.split('.');
    
    // Create a new date object (month is 0-based in JavaScript)
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    const now = new Date();
    const timeDiff = now - date;
    const minutesDiff = timeDiff / (1000 * 60);
    
    // Check if date is within 30 minutes of current time
    if (minutesDiff <= 30) {
        return 'Just now';
    }
    
    // Check if it's the same day
    if (date.getDate() === now.getDate() && 
        date.getMonth() === now.getMonth() && 
        date.getFullYear() === now.getFullYear()) {
        return 'Today';
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.getDate() === yesterday.getDate() && 
        date.getMonth() === yesterday.getMonth() && 
        date.getFullYear() === yesterday.getFullYear()) {
        return 'Yesterday';
    }
    
    // Check if it's two days ago
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(now.getDate() - 2);
    if (date.getDate() === twoDaysAgo.getDate() && 
        date.getMonth() === twoDaysAgo.getMonth() && 
        date.getFullYear() === twoDaysAgo.getFullYear()) {
        return 'Two days ago';
    }
    
    // Use original formatting for older dates
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
// Function to populate the table
function populateTable(data = tableData) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    // Check if data array is empty
    if (data.length === 0) {
        const noResultsRow = document.createElement('tr');
        const noResultsCell = document.createElement('td');
        noResultsCell.colSpan = 4; // Span all columns
        noResultsCell.textContent = 'No results found';
        noResultsCell.style.textAlign = 'center';
        noResultsCell.style.padding = '20px';
        noResultsRow.appendChild(noResultsCell);
        tableBody.appendChild(noResultsRow);
        return;
    }

    data.forEach(row => {
        const mainRow  = document.createElement('tr');
        mainRow.className = 'main-row';

        const dateCell = document.createElement('td');
        dateCell.textContent = formatDate(row.date) || '';

        const timeCell = document.createElement('td');
        timeCell.textContent = row.time || '';

        const zipCell = document.createElement('td');
        zipCell.textContent = row.zip || '';

        const fuelCell = document.createElement('td');
        fuelCell.textContent = row.preventedDelivery || '';

        mainRow.appendChild(dateCell);
        mainRow.appendChild(timeCell);
        mainRow.appendChild(zipCell);
        mainRow.appendChild(fuelCell);
        
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        detailsRow.style.display = 'none';

        const detailsCell = document.createElement('td');
        detailsCell.colSpan = 4 ;
        detailsCell.innerHTML = `<div class="details-header">Details:</div> <div class="details-content">
            ${row.date} | ${row.time || ''} 
            \n<span class="label">Full Address:</span> ${row.address || ''} , ${row.city} ${row.state} | ${row.zip}
            \n<span class="label">Tank Grade:</span> ${row.tankGrade || ''} | <span class="label">Tank No.:</span> ${row.tankNo || ''}
            \n<span class="label">Fuel Prevented:</span> ${row.preventedDelivery || ''}
        </div>`;
        detailsCell.className = 'details-cell';

        detailsRow.appendChild(detailsCell);

        mainRow.addEventListener('click', function() {
            if(detailsRow.style.display === '') {
                detailsRow.style.display ='none'
                mainRow.classList.remove('hover-row');
            } else {
                detailsRow.style.display = '';
                mainRow.classList.add('hover-row');
            }
        });

        detailsRow.addEventListener('click', function() {
            detailsRow.style.display = 'none';
            mainRow.classList.remove('hover-row');
        });

        // Append both rows to the table
        tableBody.appendChild(mainRow);
        tableBody.appendChild(detailsRow);
    });
}

// Call populateTable when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateTable();
    addFilterFunctionality();
    disableBrowserAutocomplete();
});

function addFilterFunctionality() {
    // Remove input event listeners and only add click event to search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', filterTable);
    }
    
    // Keep the clear button functionality
    const clearButton = document.querySelector('.clear-button');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            // Clear all input fields
            document.querySelectorAll('.search-fields input').forEach(input => {
                input.value = '';
            });
            // Repopulate the table with all data
            populateTable();
        });
    }
}

function filterTable() {
    const stAddressInput = document.getElementById('ST-address');
    const stateInput = document.getElementById('State');
    const cityInput = document.getElementById('City');
    const timeInput = document.getElementById('Time');
    const zipInput = document.getElementById('Zip');
    const dateInput = document.getElementById('Date');
    const fuelInput = document.getElementById('Fuel');

    const stAddress = stAddressInput ? stAddressInput.value.toLowerCase() : '';
    const state = stateInput ? stateInput.value.toLowerCase() : '';
    const city = cityInput ? cityInput.value.toLowerCase() : '';
    const time = timeInput ? timeInput.value.toLowerCase() : '';
    const zip = zipInput ? zipInput.value.toLowerCase() : '';
    const date = dateInput ? dateInput.value.toLowerCase() : '';
    const fuel = fuelInput ? fuelInput.value.toLowerCase() : '';

    // Filter the original data directly
    const filteredData = tableData.filter(row => {
        // Check if row matches all the filter criteria
        return (
            // Only check if there's a value to filter on
            (date === '' || (row.date && row.date.toLowerCase().includes(date))) &&
            (time === '' || (row.time && row.time.toLowerCase().includes(time))) &&
            (city === '' || (row.city && row.city.toLowerCase().includes(city))) &&
            (state === '' || (row.state && row.state.toLowerCase().includes(state))) &&
            (stAddress === '' || (row.address && row.address.toLowerCase().includes(stAddress))) &&
            (zip === '' || (row.zip && row.zip.toString().includes(zip))) &&
            (fuel === '' || (row.preventedDelivery && row.preventedDelivery.toLowerCase().includes(fuel)))
        );
    });

    // Clear and repopulate the table with filtered data
    populateTable(filteredData);
}

function disableBrowserAutocomplete() {
    // Get all input fields in the search fields section
    const inputs = document.querySelectorAll('.search-fields input');
    
    inputs.forEach(input => {
        // Set attributes to prevent browser autocomplete
        
        // Add a random name to prevent browser autocomplete
        const randomName = input.id + '_' + Math.random().toString(36).substring(2, 9);
        input.setAttribute('name', randomName); 
        if (input.id === 'State' || input.id === 'Zip' || input.id === 'Date' || input.id === 'ST-address' || input.id ==='City' || input.id ==='Fuel') {
            input.setAttribute('autocomplete', 'new-password');
            input.setAttribute('data-lpignore', 'true');
            input.setAttribute('data-form-type', 'other');
        }
    });
}