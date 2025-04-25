// Function to load and display inventory data
async function loadInventoryData() {
    try {
        const response = await fetch('table_data/inventory_data.json');
        const data = await response.json();
        
        const tableBody = document.getElementById('inventoryTableBody');
        
        tableBody.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item['Midas #1']}</td>
                <td>${item['Midas #2']}</td>
                <td>${item['Trailer ']}</td>
                <td>${item['Location ']}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading inventory data:', error);
    }
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadInventoryData); 