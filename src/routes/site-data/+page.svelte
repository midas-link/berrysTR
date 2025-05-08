<script>
  import { onMount } from "svelte";
  import DropdownField from "./DropdownField.svelte";
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  const currentPath = get(page).url.pathname;
  function openDetails(row) {
    goto(`${base}/deliveryDetail/${row.SiteCode}`, {
      state: {
        from:  currentPath,
        address: row.Address,
        city: row.City,
        state: row.State,
        date: row.Date,
        siteCode: row.SiteCode
      }
    });
  }
  import * as siteDataFuncs from "$lib/scripts/site-data";
  let rows = []
  let filteredRows = [];
  let detailsVisible = []
  let searchParams = {
    businessUnit:'',
    address:'',
    state:'',
    city:'',
    site:'',
    zip:'',
    date:'',
    fuel:''
  };
  let uniqueCities = [];
  let uniqueBusinessUnits = [];
  let uniqueStates = [];
  let uniqueSites = [];
  let businessUnitInput;
  let addressInput;
  let zipInput;
  let dateInput;
  let fuelInput;
  function getRowClass(index) {
    return index % 2 === 0 ? 'row-even' : 'row-odd';
}
function filterRows() {
    // Get values directly from searchParams which are bound to the inputs
    
    filteredRows = rows.filter(row => {
      // Check each search parameter
      const businessUnitMatch = !searchParams.businessUnit || 
          (row.BusinessUnitName && row.BusinessUnitName.toLowerCase().includes(searchParams.businessUnit.toLowerCase()));
      
      const addressMatch = !searchParams.address || 
          (row.Address && row.Address.toLowerCase().includes(searchParams.address.toLowerCase()));
      
      const stateMatch = !searchParams.state || 
          (row.State && row.State.toLowerCase().includes(searchParams.state.toLowerCase()));
      
      const cityMatch = !searchParams.city || 
          (row.City && row.City.toLowerCase().includes(searchParams.city.toLowerCase()));
          
      const siteMatch = !searchParams.site || 
          (row.SiteCode && row.SiteCode.toLowerCase().includes(searchParams.site.toLowerCase()));
      
      const zipMatch = !searchParams.zip || 
          (row.Zip && row.Zip.toString().includes(searchParams.zip));
      
      const dateMatch = !searchParams.date || 
          (row.Date && row.Date.includes(searchParams.date));
      
      const fuelMatch = !searchParams.fuel || 
          (row.Delivered && row.Delivered.toLowerCase().includes(searchParams.fuel.toLowerCase()));
      
      return businessUnitMatch && addressMatch && stateMatch && cityMatch && siteMatch && zipMatch && dateMatch && fuelMatch;
    });
    
    // Reset details visibility array
    detailsVisible = Array(filteredRows.length).fill(false);
    
    // Update live status display
    toggleLiveStatus();
  }
function clearSearch() {
    // Reset search parameters
    searchParams = {
      businessUnit: '',
      address: '',
      state: '',
      city: '',
      site: '',
      zip: '',
      date: '',
      fuel: ''
    };
    
    // Reset filtered rows to all rows
    filteredRows = [...rows];
    
    // Reset details visibility
    detailsVisible = Array(filteredRows.length).fill(false);
    
    // Force show live status
    toggleLiveStatus(true);
  }
    function formatDate(dateString) {
    if (!dateString) return '';
    
    // Split the date string into day, month, year
    const [day, month, year] = dateString.split('/');
    
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
function toggleDetails(index) {
        // Create a new array to trigger reactivity
        let newDetailsVisible = [...detailsVisible];
        newDetailsVisible[index] = !newDetailsVisible[index];
        detailsVisible = newDetailsVisible;
}
  export function updateDateTime() {
    const datetimeElement = document.getElementById('current-datetime');
    
    // Only update if the element exists
    if (datetimeElement) {
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
      datetimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
  }
    

    
    // Function to check if any search field has input
    function hasSearchInput() {
    return searchParams.businessUnit.trim() !== '' ||
           searchParams.address.trim() !== '' ||
           searchParams.state.trim() !== '' ||
           searchParams.city.trim() !== '' ||
           searchParams.site.trim() !== '' ||
           searchParams.zip.trim() !== '' ||
           searchParams.date.trim() !== '' ||
           searchParams.fuel.trim() !== '';
  }
  
  // Function to toggle live indicator visibility
  function toggleLiveStatus(forceShow = false) {
    const liveStatus = document.querySelector('.toggle-live');
    if (!liveStatus) return;
    
    if (!forceShow && hasSearchInput()) {
        liveStatus.style.display = 'none';
    } else {
        liveStatus.style.display = 'block';
    }
  }
  function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('overlay');
    
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    });
    
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
    });
    
    // Close the sidebar when clicking on a link
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
      });
    });
  }
  onMount(async () => {
    setupMobileMenu();
    updateDateTime();
    siteDataFuncs.disableBrowserAutocomplete();
    console.log("Starting data fetch");
    try {
        const result = await siteDataFuncs.fetchSiteData();
        console.log("Data fetched:", result);
        rows = result;
        filteredRows = [...rows];
        detailsVisible = Array(rows.length).fill(false);
        
        // Extract unique values for dropdowns
        uniqueBusinessUnits = [...new Set(rows.map(row => row.BusinessUnitName).filter(bu => bu && bu.trim() !== ''))];
        uniqueCities = [...new Set(rows.map(row => row.City).filter(city => city && city.trim() !== ''))];
        uniqueStates = [...new Set(rows.map(row => row.State).filter(state => state && state.trim() !== ''))];
        uniqueSites = [...new Set(rows.map(row => row.SiteCode).filter(site => site && site.trim() !== ''))];
        
    } catch (error) {
        console.error("Failed to load data:", error);
    }
    
    const interval = setInterval(updateDateTime, 1000);
    
    return () => {
        clearInterval(interval);
    };
  });
    
    // Toggle dropdown menu
    function toggleDropdown() {
        document.getElementById("exportDropdown").classList.toggle("show");
    }
    

    function exportTableToCSV() {
  // Clone the table to avoid modifying the original
  const originalTable = document.querySelector("table");
  const tableClone = originalTable.cloneNode(true);
  
  // Remove all "View Vehicle Timeline" buttons from the clone
  const buttons = tableClone.querySelectorAll(".more-details");
  buttons.forEach(button => {
    button.parentNode.textContent = ""; // Replace button cell content with empty string
  });
  
  const rows = tableClone.querySelectorAll("tr");
  let csv = [];

  // Get headers
  const headers = [];
  const headerCells = rows[0].querySelectorAll("th");
  headerCells.forEach((cell) => {
    headers.push(cell.textContent.trim());
  });
  csv.push(headers.join(","));

  // Get data rows - include details rows but without the button
  for (let i = 1; i < rows.length; i++) {
    const row = [];
    const cells = rows[i].querySelectorAll("td");
    cells.forEach((cell) => {
      let content = cell.textContent.trim().replace(/"/g, '""');
      row.push(`"${content}"`);
    });
    if (row.length > 0) {
      csv.push(row.join(","));
    }
  }

  // Create blob
  const csvContent = csv.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const formattedTime = date.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS
  const pageType = document.location.pathname.includes("vehicle-logging")
    ? "vehicle_logging"
    : "site_data";
  const fileName = `${pageType}_${formattedDate}_${formattedTime}.csv`;

  if ("showSaveFilePicker" in window) {
    async function saveToDisk() {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "CSV File",
              accept: {
                "text/csv": [".csv"],
              },
            },
          ],
        });

        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (err) {
        if (err.name !== "AbortError") {
          fallbackSave();
        }
      }
    }
    saveToDisk();
  } else {
    fallbackSave();
  }

  function fallbackSave() {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

async function exportTableToPDF() {
  try {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error("jsPDF library not found");
    
    const doc = new jsPDF();

    // Add title and timestamp
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Site Data", 14, 15);

    const timestamp = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${timestamp}`, 14, 25);

    // Get the specific table you want to export
    const originalTable = document.querySelector("table"); // Use a more specific selector
    if (!originalTable) throw new Error("Table not found");
    
    const exportTable = originalTable.cloneNode(true);
    
    // Remove action buttons more reliably
    const buttons = exportTable.querySelectorAll(".more-details");
    buttons.forEach(button => {
      const cell = button.closest("td, th");
      if (cell) cell.textContent = "";
    });

    // Generate the table in PDF
    doc.autoTable({
      html: exportTable,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "center",
      },
      headStyles: {
        fillColor: [1, 75, 150],
        textColor: 255,
        fontSize: 8,
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [234, 243, 252],
      },
      margin: { top: 30 },
    });

    // Generate filename
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toTimeString().split(" ")[0].replace(/:/g, "-");
    const fileName = `site_data_${formattedDate}_${formattedTime}.pdf`;

    // Save the file
    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: "PDF File",
            accept: { "application/pdf": [".pdf"] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(doc.output("blob")); // No need for new Blob()
        await writable.close();
      } catch (err) {
        console.error("File save error:", err);
        fallbackSavePDF(doc, fileName);
      }
    } else {
      fallbackSavePDF(doc, fileName);
    }

    return true; // Indicate success
  } catch (error) {
    console.error("PDF generation failed:", error);
    // You might want to show a user-friendly error message here
    return false; // Indicate failure
  }
}
 
    
    // Fallback save method for PDF
    function fallbackSavePDF(doc, fileName) {
        doc.save(fileName);
    }
</script>
<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
    <title>Site Data</title>
</svelte:head>

    <header>
        <div class="header-container">
            <div class="top-header">
                <a class="top-header-link" href="https://berrys.com">berrys.com</a>
                <a class="top-header-link" href=" ">Contact Us</a>
            </div>
            <div class="header">
                <div class="header-background" style="      background: url({base}/svg/Vector_1.svg) no-repeat left center; mask-image: url({base}/svg/Vector_1.svg'); -webkit-mask-image: url({base}/svg/Vector_1.svg);"></div>
                <div class="hamburger-menu" id="hamburger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                <a href="{base}/home">Home</a>
                <a href="{base}/inventory">Inventory</a>
                <a href="{base}/cross-drops">Cross-Drop Prevention</a>
                <a href="{base}/vehicle-logging">Vehicle Logging</a>
                <a href="{base}/analytics">Analytics</a>
                <input type="text" placeholder="Search...">
                <img src="{base}/images/Midas_Link_logo.png" alt="Berrys Logo">
            </div>
        </div>
    </header>
    <div class="mobile-sidebar" id="mobile-sidebar">
        <a href="{base}/home">Home</a>
        <a href="{base}/vehicle-logging">Vehicle Logging</a>
        <a href="{base}/cross-drops">Cross-Drop Prevention</a>
        <a href="{base}/site-data">Site Data</a>
        <a href="{base}/inventory">Inventory</a>
        <a href="{base}/analytics">Analytics</a>
      </div>
      <div class="overlay" id="overlay"></div>
    <div class="sub-header-container">
        <div class="sub-header">
                <h1>Site Data</h1>
                <span> Gather insight into your deliveries by site location. You can dive into delivery information by State, Zip code, Street Address and City. This will offer you vital information on drop frequency, scheduling and billing reports.  </span>
              
        </div>
        <div class="breadcrumb">
            <a href="{base}/home">Home</a> / <span>Site Data</span>
        </div> 
    </div>
    <main>
        <div class="main-container">
            <label class="search-label" for="search-fields">Search</label>
            <div class="search-fields">
                <DropdownField 
                    id="Business-unit" 
                    label="Business Unit" 
                    options={uniqueBusinessUnits} 
                    bind:value={searchParams.businessUnit}   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <label for="ST-address">Address</label>
                <input 
                    type="text" 
                    id="ST-address" 
                    name="ST-address" 
                    bind:this={addressInput} 
                    bind:value={searchParams.address} 
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="off" 
                    spellcheck="false"   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <DropdownField 
                    id="State" 
                    label="State" 
                    options={uniqueStates} 
                    bind:value={searchParams.state}   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <DropdownField 
                    id="City" 
                    label="City" 
                    options={uniqueCities} 
                    bind:value={searchParams.city}   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <DropdownField 
                    id="Site" 
                    label="Site" 
                    options={uniqueSites} 
                    bind:value={searchParams.site}   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <label for="Zip">Zip</label>
                <input 
                    type="text" 
                    id="Zip" 
                    name="Zip" 
                    bind:this={zipInput} 
                    bind:value={searchParams.zip} 
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="off" 
                    spellcheck="false"   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <label for="Date">Date</label>
                <input 
                    type="text" 
                    id="Date" 
                    name="Date" 
                    bind:this={dateInput} 
                    bind:value={searchParams.date} 
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="off" 
                    spellcheck="false" 
                    placeholder="DD/MM/YYYY"   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
                
                <label for="Fuel">Fuel</label>
                <input 
                    type="text" 
                    id="Fuel" 
                    name="Fuel" 
                    bind:this={fuelInput} 
                    bind:value={searchParams.fuel} 
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="off" 
                    spellcheck="false"   on:keydown={(e) => { if (e.key === 'Enter') filterRows(); }}
                />
            </div>
           <div class="button-container">
            <button class="search-button" on:click={filterRows}>Search</button>       
            <button class="clear-button" on:click={clearSearch}>Clear</button>
           </div>
           <div class="table-header">
            <div class="live-status">
                <div class="toggle-live">
                    <label for="table-type" class="table-type">
                        LIVE
                        <span class="live-indicator"></span>
                    </label>
                </div>
                     <label for="table-type" class="table-type">
                         <span id="current-datetime" class="current-time"></span>
                     </label>
             </div>
            <div class="export-dropdown">
                <button class="export-button" on:click={toggleDropdown}>Export As ▼</button>
                <div class="dropdown-content" id="exportDropdown">
                    <a href=" " on:click={exportTableToCSV}>CSV</a>
                    <a href=" " on:click={exportTableToPDF}>PDF</a>
                </div>
            </div>
           </div>
          <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Delivered at</th>
                    <th>Site Code</th>
                    <th>Fuel dropped</th>
                </tr>
            </thead>
            <tbody>
                {#if filteredRows.length > 0}
                {#each filteredRows as row, index}              
                <tr 
                class="main-row {getRowClass(index)} {detailsVisible[index] ? 'hover-row' : ''}" 
                on:click={() => toggleDetails(index)}
            >
                <td>{formatDate(row.Date)}</td>
                <td>{row['Delivery End']}</td>
                <td>{row.SiteCode}</td>
                <td>{row.Delivered}</td>
            </tr>
            {#if detailsVisible[index]}
            <tr class="details-row {getRowClass(index)}" on:click={() => toggleDetails(index)}>    
                    <td colspan="4" class="details-cell">
                    <div class="details-header">Details:</div>
                    <div class="details-content">
                        {row.Date} | {row['Delivery Start '] || ''}  to {row['Delivery End'] || ''}
                        <br>
                        <span class="label">Site code:</span> {row.SiteCode || ''} | <span class="label">Business Unit:</span> {row.BusinessUnitName || ''}
                        <br>
                        <span class="label">Full Address:</span> {row.Address || ''} , {row.City} {row.State} | {row.Zip}
                        <br>
                        <span class="label">Fuel dropped:</span> {row.Delivered || ''} | <span class="label">Tank:</span> T{row.TankNumber || ''}
                        
                    </div>
                   
                </td>
                <td>
                    <button on:click={() => openDetails(row)} class="more-details">
                        See Delivery Details
                      </button>                </td>
            </tr>
        {/if}
                {/each}
                {:else}
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px;">No results found</td>
                </tr>
            {/if}
            </tbody>
           </table>
        </div>
    </main>
    
    <footer>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
            <span style="font-size: 1rem; font-family: Mulish;">@copyrights Berrys Global Innovations</span>
            <img src="{base}/images/logo.png" alt="Berrys Logo" >
        </div>
    </footer>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    main {
        flex: 1; /* Allow main to grow and fill the space */
        background-color: #F9BC39;
    }
    ::placeholder {
        color: #FFFFFF;
    }
    .header-container {
        width: 100%;
        background: linear-gradient(to bottom, #001338 0%, #014B96 44%);
        position: relative;
        z-index: 1;
    }
    .top-header {
        display: flex;
        justify-content: flex-end;
        padding: 1vh 2vw;
    }
    .top-header-link {
        font-size: 0.875rem;
        font-family: 'Mulish', sans-serif;
        color: #AAAAAA;
        font-style: bold;
        margin-right: 2.5vw;
        text-decoration:none;
    }
    .top-header-link:last-child {
        margin-right: 20%;
    }
    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2vw;
    }
    .header-background {
        position: absolute;
        top: 40%;
        left: 0;
        width: 100%;
        height: 70%;
        background-size: contain;
        z-index: -1;
        opacity: 1;
    }
    .header img {
        width:225px;
        height:99px;
        scale:1.1;
        padding-bottom: 2vh;
        padding-right:0.5vw;
    }
    .header a, .header input, .header img {
        position: relative; 
        z-index: 1;
    }
    .header a {
        color: #FFFFFF;
        text-decoration: none;
        font-family: 'Mulish', sans-serif;
        font-weight: 700;
        transition: all 0.3s ease;
    }
    .header a:nth-child(3) {
        margin-left: 10%;
    }
   
    .header a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    .header input {
        width: 8vw;
    }
    .header input[type="text"] {
        padding: 1vh 3vh 1vh 3vh;
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        outline: none;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23FFFFFF" viewBox="0 0 24 24"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>');
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: 0.5vh center;
    }
    @media (max-width: 900px) {
        .header input[type="text"] {
            width: 40%;
        }
    }
    .header input[type="text"]::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
    footer {
        padding: 1.5rem 0;
        background: linear-gradient(to right, #001338, #014B96);
        color: white;
        width: 100%;
    }
    footer img {
        width: 10%;
        margin-left: 2%;
    }
    .sub-header-container {
        height: fit-content;
        position: relative;
        background-color: #F5F5F5;
        z-index: 1;
    }
    .sub-header {
        display: flex;
        align-items: center;
        padding-left: 5vh;
        padding-top: 2vh;
    }
    .sub-header span {
        padding-top: 2vh;
        padding-left: 5vw;
        font-family: 'Mulish', sans-serif;
    }

    .sub-header h1 {
        color: #014B96;
        font-family: 'Mulish', sans-serif;
        white-space: nowrap;
        font-weight: 400;
    }
    .breadcrumb {
    margin-top:2vh;
    padding: 0.5vh 2vh 0.5vh 3vh;
    color: #014B96;
    background-color: #F9BC39;
    width: fit-content;
    border-radius: 20px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    }
    .breadcrumb span,
    .breadcrumb a {
    font-family: 'Mulish', sans-serif;
    text-decoration: none;
    color: #014B96;
    font-size: 0.875rem;
    font-weight: 700;
    font-style: bold;
    }
    .breadcrumb a:hover {
    text-decoration: underline;
    }
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-top: 4vh;
        padding-left: 4vh;
        border-top-left-radius: 20px;
        background-color: white;
        height: 100%;
    }
    .search-label {
        font-family: 'Mulish', sans-serif;
        font-size: 2rem;
        font-weight: 400;
        color:#014B96;
        margin-bottom: 2vh;
    }
    :global(.search-fields) {
        padding-left: 0.5%;
        display:flex;
    }
    :global(.search-fields label) {
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        padding-left: 1vw;
        padding-top:0.5vh;
    }
    :global(.search-fields input){
        background-color: #EAF3FC;
        border:none;
        margin-left:1vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        padding-left: 1vh;
        width: 7vw;
        border-radius: 10px;
    }
    :global(.search-fields input::placeholder){
        color: #5e5e5e;
        font-size: 0.875rem;
    }
    /* Styles for the city dropdown */
    .custom-dropdown {
        position: relative;
        display: inline-block;
        width: 7vw;
    }
    :global(.custom-dropdown input) {
        background-color: #EAF3FC;
        border: none;
        margin-left: 1vh;
        margin-right: 1vh;
        padding-top: 1vh;
        padding-bottom: 1vh;
        padding-left: 1vh;
        width: 100%;
        color: #014B96;
        font-family: 'Mulish', sans-serif;
        cursor: pointer;
        box-sizing: border-box;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 100%;
        max-height: 200px;
        overflow-y: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 2000;
        border-radius: 4px;
        margin-top: 2px;
        left: 1vh;
        right: 1vh;
    }
    .dropdown-content.show {
        display: block;
    }
    .dropdown-item {
        padding: 8px 12px;
        color: #014B96;
        font-family: 'Mulish', sans-serif;
        cursor: pointer;
    }
    .dropdown-item:hover {
        background-color: #EAF3FC;
    }
    .search-button{
    background-color: #014B96;
        color: white;
        border-radius: 4px;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        margin-top: 2vh;
        text-transform: uppercase;
        display: inline-block;
        margin-right: 2vh;
        max-height: fit-content;
        padding: 0.25vh 1vw;
    }
    .search-button:hover{
        background-color: #012F5E;
    }
    .clear-button{
        background-color: #014B96;
        color: white;
        border-radius: 4px;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        margin-top: 2vh;
        text-transform: uppercase;
        display: inline-block;
        max-height: fit-content;
        padding: 0.25vh 1vw;
    }
    .clear-button:hover{
        background-color: #012F5E;
    }
    .button-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 2vh;
    }
    .table-type {
        font-family: 'Mulish', sans-serif;
        font-size: 1.75rem;
        font-weight: 400;
        color:#014B96;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .live-indicator {
        width: 12px;
        height: 12px;
        background-color: #FF0000;
        border-radius: 2px;
        display: inline-block;
    }
    table {
        display: block;
        margin-top: 1vh;
        margin-left: auto;
        margin-right: auto;
        max-height: 70vh;
        overflow-y: auto;
        border-collapse: collapse;
        width: 95%;
        border-radius: 10px;
        position: relative;
        margin-bottom: 5vh;
    }
    thead {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #004B96;
    }
    tbody {
        display: block;
        overflow-y: auto;
        width: 100%;
    }
    thead tr, tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    thead tr {
        width: calc(100% - 1px);
    }
    tbody tr {
        width: 100%;
    }
    th, td {
        font-family: 'Mulish', sans-serif;
        text-align: center;
        padding: 16px !important;
        width: 25%;
    }
    table th {
        padding-left: 1vw;
        padding-right: 1vw;
        background-color: #004B96;
        color: white;
        position: sticky;
        top: 0;
        z-index: 1;
    }
    tr {
        transition: all 0.3s ease;
        cursor: pointer;
        
    }

    
    .export-button {
        background-color: #014B96;
        color: white;
        padding: 0.5vh 2vh;
        border-radius: 4px;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        margin-left: auto;
        transition: background-color 0.3s ease;
    }
    .export-button:hover {
        background-color: #013b77;
    }
    .table-header {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto;
    }
    .transformed-row {
        background-color: #f8f9fa !important;
    }
    .transformed-row td {
        text-align: left;
        color: #000000;
        white-space: pre-line;
        line-height: 1.5;
        padding: 15px !important;
    }
    .transformed-row .label {
        color: #014B96;
        font-weight: bold;
    }
    .export-dropdown {
        position: relative;
        display: inline-block;
        margin-left: auto;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        right: 0;
        background-color: #f9f9f9;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 2;
        border-radius: 4px;
    }
    .dropdown-content a {
        color: #014B96;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        font-family: 'Mulish', sans-serif;
    }
    .dropdown-content a:hover {
        background-color: #EAF3FC;
    }
    .show {
        display: block;
    }
    .main-row {
        transition: background-color 0.3s ease;
        position: relative;
        padding-bottom: 3vh;
    }
    .row-even {
        background-color: #f8f9fa;
    }
    .row-odd {
        background-color: #EAF3FC;
    }

    .row-even.details-row {
    background-color: #f8f9fa;
}
.row-odd.details-row {
    background-color: #EAF3FC;
}
    .hover-row td {
        text-align: center !important;
    }
    .details-row {
        background-color: inherit;
        transition: opacity 0.3s ease;
    }
    .details-cell {
        padding: 8px 15px !important;
        text-align: left;
        color: #000000;
        white-space: pre-line;
        line-height: 1;
        vertical-align: top;
    }
    .details-header {
        color: #014B96;
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 4px;
    }
    .details-content {
        color: #000000;
        line-height: 2;
    }
    .details-content .label {
        color: #000000;
        font-weight: bold;
    }
    /* Ensure consistent cell padding and text alignment */
    td {
        text-align: center;
        vertical-align: middle;
    }
    .current-time {
        font-family: 'Mulish', sans-serif;
        font-size: 1.5rem;
        font-weight: 400;
        color:#014B96;
        padding-left: 1vw;
    }
    .live-status {
        display: flex;
        align-items: center;
    }
    .toggle-live {
        margin-right: 15px;
    }
    .more-details{
        background-color: #014B96;
        color: white;
        padding: 0.5vh 2vh;
        border-radius: 4px;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        margin-left: auto;
        transition: background-color 0.3s ease;
    }
    .more-details:hover{
        background-color: #013b77;
    }
    .mobile-sidebar {
      position: fixed;
      top: 0;
      left: -250px;
      width: 250px;
      height: 100vh;
      background: linear-gradient(to bottom, #001338 0%, #014B96 100%);
      z-index: 999;
      transition: left 0.3s ease;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
      padding-top: 60px;
      overflow-y: auto;
    }
    :global(.mobile-sidebar.active) {
      left: 0;
    }
    
    .mobile-sidebar a {
      display: block;
      padding: 15px 20px;
      font-family: 'Mulish', sans-serif;
      font-weight: 600;
      color: white;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .mobile-sidebar a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 998;
      display: none;
    }
    /* Mobile menu styles */
    .hamburger-menu {
      display: none;
      cursor: pointer;
      z-index: 1000;
    }
    
    .hamburger-menu span {
      display: block;
      width: 25px;
      height: 3px;
      margin: 5px 0;
      background-color: white;
      border-radius: 3px;
      transition: 0.3s;
    }
    @media (max-width: 1000px) {
    /* Keep existing styles */
    .header a:nth-child(2) {
        margin-left: 5%;
    }
    .header img {
        max-height: 8vh; 
        max-width: 100%; 
        height: auto; 
        width: auto;
        scale: 1.1;
        margin-left: auto;
    }
    main {
        flex: 1;
    }
    .header a {
        white-space: nowrap;
        padding-left: 1.5vw;
        display: none; /* Keep this */
    }
    .header input[type="text"] {
        display: none;
    }
    .sub-header {
        padding-left: 1vh;
    }
    .main-container {
        padding-right: 3vw;
    }
    /* Fixed styles for search fields in mobile view */
    :global(.search-fields) {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 10px;

    }
    
    /* Create rows for label + input pairs */
    :global(.search-fields > div), 
    :global(.search-fields > label) + input {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 10px;
        align-items: center;
    }
    
    /* Style labels */
    :global(.search-fields label) {
        min-width: 90px;
        margin: 0;
        padding: 8px 0;
        font-size: 14px !important;
        white-space: nowrap;
    }
    
    /* Style inputs */
    :global(.search-fields input) {
        flex: 1;
        width: 100% !important;
        margin: 0 0 0 10px !important;
        padding: 8px !important;
        font-size: 14px !important;
    }
    
    /* Fix dropdown components */
    :global(.custom-dropdown) {
        display: flex !important;
        width: 100% !important;
        margin-bottom: 10px;
    }
    
    :global(.custom-dropdown input) {
        flex: 1;
        width: 100% !important;
        padding: 8px !important;
        margin: 0 0 0 10px !important;
    }
    
    /* Make buttons more accessible on mobile */
    .button-container {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 15px 0;
        width: 100%;
    }
    
    .search-button, .clear-button {
        min-width: 100px;
        padding: 10px 15px !important;
        font-size: 0.75rem !important;
        margin: 0 !important;
    }
    
    .live-status {
        margin-bottom: 10px;
        width: 100%;
    }
    
    .export-dropdown {
        align-self: flex-end;
    }
    
    /* Keep existing mobile nav styles */
    .hamburger-menu {
        display: block !important;
        position: absolute;
        left: 30px;
        transform: translateY(-50%);
    }
    .sub-header{
        font-size: 0.875rem !important;
    }
    footer img { 
        max-height: 6vh;
        max-width: 20%; 
        height: auto; 
        width: auto !important;
    }
    .custom-dropdown {
        display:none;
    }
   
    .table-type,
    .current-time,
    .export-button,
    .more-details{
        font-size: 0.75rem !important;
    }
    table th{
        font-size: 0.60rem !important;
    }
    table tr{
        font-size: 0.75rem !important;
    }
    *{
        font-size:0.875rem;
    }
}
</style>