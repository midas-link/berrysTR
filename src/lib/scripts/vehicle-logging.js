let globalVehicleData = [];
export async function fetchVehicleData() {
    // If data is already loaded, return it
    if (globalVehicleData.length > 0) {
        return globalVehicleData;
    }
    
    try {
        // Try to fetch from the server
        const response = await fetch('/table_data/vehicle_logging.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vehicleData = await response.json();
        globalVehicleData = siteData; // Store data globally
        return vehicleData;
    } catch (error) {
        console.error('Error fetching vehicleData data:', error);
        
        // Return a promise that resolves with data from XMLHttpRequest
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'table_data/vehicle_logging.json', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {   
                        const vehicleData = JSON.parse(xhr.responseText);
                        globalVehicleData = vehicleData;
                        resolve(vehicleData);
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

export function formatDate(dateString) {
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


// Function to update date and time
export function updateDateTime() {
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


// Function to export table to CSV
export function exportTableToCSV() {
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
export async function exportTableToPDF() {
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

export function fallbackSavePDF(doc, fileName) {
    doc.save(fileName);
}

export function toggleDropdown() {
    document.getElementById("exportDropdown").classList.toggle("show");
}


export function disableBrowserAutocomplete() {
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