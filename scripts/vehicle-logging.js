// Table data
const tableData = [
    { date: "09.12.25", time: "12:16", address: "2151 SW 36TH ST", city: "San Antonio", state: "TX", zip: "78237", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
    { date: "09.01.25", time: "9:04", address: "207 E HWY 90A", city: "Richmond", state: "TX", zip: "77406", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
    { date: "08.14.25", time: "5:52", address: "619 CROSSROADS ST", city: "Laredo", state: "TX", zip: "78045", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "6", preventedDelivery: "DIESEL" },
    { date: "07.09.25", time: "2:40", address: "2901 highway 35 N", city: "Rockport", state: "TX", zip: "78382", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "06.30.25", time: "23:28", address: "6321 S 23rd St.", city: "McAllen", state: "TX", zip: "78503", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
    { date: "06.24.25", time: "20:16", address: "6321 S 23rd St.", city: "McAllen", state: "TX", zip: "78503", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "06.03.25", time: "17:04", address: "11102 IH-37 Access", city: "Corpus Christi", state: "TX", zip: "78401", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "05.19.25", time: "13:52", address: "2202 HOLLY ROAD", city: "Corpus Christi", state: "TX", zip: "78415", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "05.14.25", time: "10:40", address: "9111 N. Interstate 35", city: "Jarrell", state: "TX", zip: "76537", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "7", preventedDelivery: "DIESEL" },
    { date: "04.18.25", time: "7:28", address: "16555 HUEBNER RD", city: "San Antonio", state: "TX", zip: "78248", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "3", preventedDelivery: "DIESEL" },
    { date: "04.12.25", time: "4:16", address: "1301 N LOOP 340", city: "LACY LAKEVIEW", state: "TX", zip: "76705", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "6", preventedDelivery: "DIESEL" },
    { date: "04.04.25", time: "1:04", address: "720 SPRING VALLEY", city: "Hewitt", state: "TX", zip: "76643", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "02.22.25", time: "21:52", address: "3225 E EXPY 83", city: "Weslaco", state: "TX", zip: "78596", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "02.11.25", time: "18:40", address: "101 N WATER ST", city: "Burnet", state: "TX", zip: "78611", tankGrade: "GAS 91 NO ETH 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "01.29.25", time: "15:28", address: "S. 9th & Tyler Ave.", city: "Harlingen", state: "TX", zip: "78550", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
    { date: "01.18.25", time: "12:16", address: "S. 9th & Tyler Ave.", city: "Harlingen", state: "TX", zip: "78550", tankGrade: "High Ethanol ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "01.12.25", time: "9:04", address: "15513 STATE HWY 30", city: "Roans Prairie", state: "TX", zip: "77875", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "01.03.25", time: "5:52", address: "5202 IH 37", city: "Corpus Christi", state: "TX", zip: "78407", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "12.22.24", time: "2:40", address: "12200 FM 969 RD", city: "Austin", state: "TX", zip: "78724", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "12.21.24", time: "23:28", address: "905 N. McCoy Blvd.", city: "New Boston", state: "TX", zip: "75570", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "12.13.24", time: "20:16", address: "101 EE OHNMEISS BLVD", city: "Lampasas", state: "TX", zip: "76550", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "12.02.24", time: "17:04", address: "16222 WALLISVILLE RD", city: "Houston", state: "TX", zip: "77001", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "11.09.24", time: "13:52", address: "27137 TOMBALL PKWY", city: "Tomball", state: "TX", zip: "77375", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "10.30.24", time: "10:40", address: "6406 Old Pearsall Rd", city: "San Antonio", state: "TX", zip: "78252", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "09.09.24", time: "7:28", address: "21997 FM 1314", city: "Porter", state: "TX", zip: "77365", tankGrade: "High Ethanol ", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "08.10.24", time: "4:16", address: "9157 FM 471 N", city: "San Antonio", state: "TX", zip: "78253", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "06.28.24", time: "1:04", address: "10537 N. Hwy. 359", city: "Mathis", state: "TX", zip: "78368", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "05.01.24", time: "21:52", address: "1303 W MOUNT HOUSTON RD", city: "Houston", state: "TX", zip: "77001", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "04.28.24", time: "18:40", address: "31700 INTERSTATE 10 W", city: "Boerne", state: "TX", zip: "78006", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" }
];
// Function to populate the table
function populateTable() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    tableData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.date}</td>
            <td>${row.time}</td>
            <td>${row.address}</td>
            <td>${row.city}</td>
            <td>${row.state}</td>
            <td>${row.zip}</td>
            <td>${row.tankGrade}</td>
            <td>${row.tankNo}</td>
            <td>${row.preventedDelivery}</td>
        `;
        tableBody.appendChild(tr);
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
    const searchInputs = {
        'ST-address': document.getElementById('ST-address').value.toLowerCase(),
        'State': document.getElementById('State').value.toLowerCase(),
        'City': document.getElementById('City').value.toLowerCase(),
        'Zip': document.getElementById('Zip').value.toLowerCase(),
        'Date': document.getElementById('Date').value.toLowerCase(),
        'Fuel': document.getElementById('Fuel').value.toLowerCase()
    };

    const tbody = document.querySelector('tbody');
    const rows = tbody.getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let shouldShow = true;

        if (searchInputs['ST-address'] && !cells[2].textContent.toLowerCase().includes(searchInputs['ST-address'])) {
            shouldShow = false;
        }
        if (searchInputs['State'] && !cells[4].textContent.toLowerCase().includes(searchInputs['State'])) {
            shouldShow = false;
        }
        if (searchInputs['City'] && !cells[3].textContent.toLowerCase().includes(searchInputs['City'])) {
            shouldShow = false;
        }
        if (searchInputs['Zip'] && !cells[5].textContent.toLowerCase().includes(searchInputs['Zip'])) {
            shouldShow = false;
        }
        if (searchInputs['Date'] && !cells[0].textContent.toLowerCase().includes(searchInputs['Date'])) {
            shouldShow = false;
        }
        if (searchInputs['Fuel'] && !cells[6].textContent.toLowerCase().includes(searchInputs['Fuel'])) {
            shouldShow = false;
        }

        row.style.display = shouldShow ? '' : 'none';
    }
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateTable();
    
    document.querySelector('.search-button').addEventListener('click', filterTable);
    
    document.querySelector('.clear-button').addEventListener('click', function() {
        document.querySelectorAll('.search-fields input').forEach(input => {
            input.value = '';
        });
        const tbody = document.querySelector('tbody');
        const rows = tbody.getElementsByTagName('tr');
        for (let row of rows) {
            row.style.display = '';
        }
        document.querySelector('.live-status').style.display = 'block';
    });

    document.querySelectorAll('.search-fields input').forEach(input => {
        input.addEventListener('input', filterTable);
    });
}); 