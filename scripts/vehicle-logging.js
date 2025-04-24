async function fetchAndPopulateTable() {
    try {
        // Try to fetch from the server first
        const response = await fetch('table_data/vehicle_logging.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vehicleData = await response.json();
        globalVehicleData = vehicleData; // Store data globally
        populateTable(vehicleData);
        disableBrowserAutocomplete(); // Disable browser autocomplete for all inputs
    } catch (error) {
        console.error('Error fetching Vehicle Data:', error);
        
        // Fallback: Try to load the file using XMLHttpRequest for local file access
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'table_data/vehicle_logging.json', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const vehicleData = JSON.parse(xhr.responseText);
                    globalSiteData = vehicleData; // Store data globally
                    populateTable(vehicleData);
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
function populateTable(data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing table data
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
        const mainRow = document.createElement('tr');
        mainRow.className = 'main-row';
        
        // Create the original cells
        const dateCell = document.createElement('td');
        dateCell.textContent = formatDate(row.Date) || '';
        
        const deliveryCell = document.createElement('td');
        deliveryCell.textContent = row.Time || '';
        
        const cityCell = document.createElement('td');
        cityCell.textContent = row.City || '';
        
        const fuelCell = document.createElement('td');
        fuelCell.textContent = row["Prevented Delivery "] || '';
        
        // Append cells to main row
        mainRow.appendChild(dateCell);
        mainRow.appendChild(deliveryCell);
        mainRow.appendChild(cityCell);
        mainRow.appendChild(fuelCell);
        
        // Create the details row
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        detailsRow.style.display = 'none';
        
        const detailsCell = document.createElement('td');
        detailsCell.colSpan = 4;
        detailsCell.innerHTML = `<div class="details-header">Details:</div> <div class="details-content">
            ${row.Date} | ${row.Time || ''} 
            \n<span class="label">Trailer No.:</span> ${row["Trailer No."] || ''}
            \n<span class="label">Full Address:</span> ${row.Address || ''} , ${row.City} ${row.State}
            \n<span class="label">Prevented Fuel:</span> ${row["Prevented Delivery "] || ''} | <span class="label">Tank:</span> T${row["Tank No. "] || ''}
        </div>`;
        detailsCell.className = 'details-cell';
        
        detailsRow.appendChild(detailsCell);
        
        // Add hover event listeners
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

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    document.getElementById('current-datetime').textContent = now.toLocaleDateString('en-US', options);
}

// Initialize date/time and set interval
updateDateTime();
setInterval(updateDateTime, 1000);

// Function to export table to CSV
function exportTableToCSV() {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    
    let csv = [];
    
    const headers = [];
    const headerCells = rows[0].querySelectorAll('th');
    headerCells.forEach(cell => {
        headers.push(cell.textContent.trim());
    });
    csv.push(headers.join(','));
    
    for (let i = 1; i < rows.length; i++) {
        const row = [];
        const cells = rows[i].querySelectorAll('td');
        cells.forEach(cell => {
            // Escape quotes and wrap content in quotes to handle commas in content
            let content = cell.textContent.trim().replace(/"/g, '""');
            row.push(`"${content}"`);
        });
        if (row.length > 0) {  // Only add non-empty rows
            csv.push(row.join(','));
        }
    }
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const fileName = `vehicle_logging_${formattedDate}_${formattedTime}.csv`;

    if ('showSaveFilePicker' in window) {
        async function saveToDisk() {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: fileName,
                    types: [{
                        description: 'CSV File',
                        accept: {
                            'text/csv': ['.csv'],
                        },
                    }],
                });
                
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
            } catch (err) {
                if (err.name !== 'AbortError') {
                    fallbackSave();
                }
            }
        }
        saveToDisk();
    } else {
        fallbackSave();
    }

    function fallbackSave() {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Function to export table to PDF
async function exportTableToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const table = document.querySelector('table');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Vehicle Logging Data', 14, 15);
    
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${timestamp}`, 14, 25);
    
    doc.autoTable({
        html: table,
        startY: 30,
        styles: {
            fontSize: 8,
            cellPadding: 2,
            overflow: 'linebreak',
            halign: 'center'
        },
        headStyles: {
            fillColor: [1, 75, 150],
            textColor: 255,
            fontSize: 8,
            fontStyle: 'bold',
            halign: 'center'
        },
        alternateRowStyles: {
            fillColor: [234, 243, 252]
        },
        margin: { top: 30 }
    });

    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, '-');
    const fileName = `vehicle_logging_${formattedDate}_${formattedTime}.pdf`;

    const pdfBlob = new Blob([doc.output('blob')], { type: 'application/pdf' });

    if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: fileName,
                types: [{
                    description: 'PDF File',
                    accept: {
                        'application/pdf': ['.pdf'],
                    },
                }],
            });
            
            const writable = await handle.createWritable();
            await writable.write(pdfBlob);
            await writable.close();
        } catch (err) {
            if (err.name !== 'AbortError') {
                fallbackSavePDF(doc, fileName);
            }
        }
    } else {
        fallbackSavePDF(doc, fileName);
    }
}

function fallbackSavePDF(doc, fileName) {
    doc.save(fileName);
}

function toggleDropdown() {
    document.getElementById("exportDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.export-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function filterTable() {
    // Get values from search inputs
    const stAddress = document.getElementById('ST-address').value.toLowerCase();
    const state = document.getElementById('State').value.toLowerCase();
    const city = document.getElementById('City').value.toLowerCase();
    const Trailer_No = document.getElementById('Trailer_No').value.toLowerCase();
    const date = document.getElementById('Date').value.toLowerCase();
    const fuel = document.getElementById('Fuel').value.toLowerCase();

    // Filter the original data directly
    const filteredData = globalVehicleData.filter(row => {
        // Check if row matches all the filter criteria
        return (
            // Only check if there's a value to filter on
            (date === '' || (row.Date && row.Date.toLowerCase().includes(date))) &&
            (stAddress === '' || (row.Address && row.Address.toLowerCase().includes(stAddress))) &&
            (city === '' || (row.City && row.City.toLowerCase().includes(city))) &&
            (state === '' || (row.State && row.State.toLowerCase().includes(state))) &&
            (Trailer_No === '' || (row["Trailer No."] && row["Trailer No."].toString().toLowerCase().includes(Trailer_No))) &&
            (fuel === '' || (row.tankGrade && row.tankGrade.toLowerCase().includes(fuel)) || 
                           (row.preventedDelivery && row.preventedDelivery.toLowerCase().includes(fuel)))
        );
    });

    // Clear and repopulate the table with filtered data
    populateTable(filteredData);
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateTable();
    disableBrowserAutocomplete();
    // Add event listener to search button to filter when clicked
    document.querySelector('.search-button').addEventListener('click', filterTable);
    
    // Update clear button to reset the table
    document.querySelector('.clear-button').addEventListener('click', function() {
        document.querySelectorAll('.search-fields input').forEach(input => {
            input.value = '';
        });
        populateTable(globalVehicleData); // Reset table with all data
        
        // The live status update is handled in the HTML
    });

    // Remove input event listeners to prevent auto-filtering
    document.querySelectorAll('.search-fields input').forEach(input => {
        // Remove the existing input event listener that calls filterTable
    });
}); 
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