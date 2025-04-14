// Add this data array
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

// Call populateTable when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateTable();
    addFilterFunctionality();
});

function addFilterFunctionality() {
    const inputs = document.querySelectorAll('.search-fields input');
    inputs.forEach(input => {
        input.addEventListener('input', filterTable);
    });
}

function filterTable() {
    const stAddress = document.getElementById('ST-address').value.toLowerCase();
    const state = document.getElementById('State').value.toLowerCase();
    const city = document.getElementById('City').value.toLowerCase();
    const zip = document.getElementById('Zip').value.toLowerCase();
    const date = document.getElementById('Date').value.toLowerCase();
    const fuel = document.getElementById('Fuel').value.toLowerCase();

    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const shouldShow = (
            cells[2].textContent.toLowerCase().includes(stAddress) && // Address
            cells[4].textContent.toLowerCase().includes(state) &&     // State
            cells[3].textContent.toLowerCase().includes(city) &&      // City
            cells[5].textContent.toLowerCase().includes(zip) &&       // Zip
            cells[0].textContent.toLowerCase().includes(date) &&      // Date
            cells[6].textContent.toLowerCase().includes(fuel)         // Tank Grade
        );
        row.style.display = shouldShow ? '' : 'none';
    });
}