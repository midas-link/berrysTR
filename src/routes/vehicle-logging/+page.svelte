<script>
    import {onMount} from "svelte";
    import * as vehicleFuncs from "$lib/scripts/vehicle-logging";
    import { base } from '$app/paths';

    let rows = [];
    let filteredRows = [];
    let detailsVisible = [];
    let searchParams = {
        address:'',
        state:'',
        city:'',
        trailer:'',
        date:'',
        fuel:''
    }
    let addressInput;
    let stateInput;
    let cityInput;
    let trailerInput;
    let dateInput;
    let fuelInput;
    function getRowClass(index) {
    return index % 2 === 0 ? 'row-even' : 'row-odd';
}
function filterRows() {
    // Get values directly from searchParams which are bound to the inputs
    filteredRows = rows.filter(row => {
      // Check each search parameter
      const addressMatch = !searchParams.address || 
          (row.Address && row.Address.toLowerCase().includes(searchParams.address.toLowerCase()));
      
      const stateMatch = !searchParams.state || 
          (row.State && row.State.toLowerCase().includes(searchParams.state.toLowerCase()));
      
      const cityMatch = !searchParams.city || 
          (row.City && row.City.toLowerCase().includes(searchParams.city.toLowerCase()));
         
      const trailerMatch = !searchParams.trailer || 
          (row['Trailer No.'] && row['Trailer No.'].toLowerCase().includes(searchParams.trailer.toLowerCase()));
          
      const dateMatch = !searchParams.date || 
          (row.Date && row.Date.includes(searchParams.date));
      
      const fuelMatch = !searchParams.fuel || 
          (row['Prevented Delivery '] && row['Prevented Delivery '].toLowerCase().includes(searchParams.fuel.toLowerCase()));
      
      return  addressMatch && stateMatch && cityMatch && trailerMatch && dateMatch && fuelMatch;
    });
    
    // Reset details visibility array
    detailsVisible = Array(filteredRows.length).fill(false);
    
    // Update live status display
    toggleLiveStatus();
  }
function clearSearch() {
    // Reset search parameters
    console.log('clearing');
    searchParams = {
        address:'',
        state:'',
        city:'',
        trailer:'',
        date:'',
        fuel:''
    }
    console.log(searchParams);
    // Reset filtered rows to all rows
    filteredRows = [...rows];
    
    // Reset details visibility
    detailsVisible = Array(filteredRows.length).fill(false);
    
    // Force show live status
    toggleLiveStatus(true);
  }
function hasSearchInput() {
        const searchInputs = document.querySelectorAll('.search-fields input');
        return Array.from(searchInputs).some(input => input.value.trim() !== '');
    }
function toggleDetails(index) {
        // Create a new array to trigger reactivity
        let newDetailsVisible = [...detailsVisible];
        newDetailsVisible[index] = !newDetailsVisible[index];
        detailsVisible = newDetailsVisible;
}
function toggleLiveStatus(forceShow = false) {
    const liveStatus = document.querySelector('.toggle-live');
    if (!liveStatus) return;
    
    if (!forceShow && hasSearchInput()) {
        liveStatus.style.display = 'none';
    } else {
        liveStatus.style.display = 'block';
    }
  }
    onMount(async()=>{
        vehicleFuncs.updateDateTime();
        vehicleFuncs.disableBrowserAutocomplete();
        console.log("Starting data fetch");
    try {
        const result = await vehicleFuncs.fetchVehicleData();
        console.log("Data fetched:", result);
        rows = result;
        filteredRows = [...rows];
        detailsVisible = Array(rows.length).fill(false);
        

    } catch (error) {
        console.error("Failed to load data:", error);
    }
    
    const interval = setInterval(vehicleFuncs.updateDateTime, 1000);
    
    return () => {
        clearInterval(interval);
    };
 
    })
</script>
<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
    <title>Vehicle Logging</title>
  
</svelte:head>
    <header>
        <div class="header-container">
            <div class="top-header">
                <a class="top-header-link" href="https://berrys.com">berrys.com</a>
                <a class="top-header-link" href=" ">Contact Us</a>
            </div>
            <div class="header">
                <div class="header-background"></div>
                <a href="{base}/home">Home</a>
                <a href="{base}/inventory">Inventory</a>
                <a href="{base}/cross-drops">Cross-drop</a>
                <a href="{base}/site-data">Site Data</a>
                <a href="{base}/analytics">Analytics</a>
                <input type="text" placeholder="Search...">
                <img src="{base}/images/Midas_Link_logo.png" alt="Berrys Logo">
            </div>
        </div>
    </header>
    <div class="sub-header-container">
        <div class="sub-header">
                <h1>Vehicle Logging</h1>
                <span> Access key information on each trailer, with real-time access to deliveries,  focusing on trailer ID. See where trailers are located, what they are <br>delivering or a full log on delivery history.  </span>
              
        </div>
        <div class="breadcrumb">
            <a href="{base}/home">Home</a> / <span>Vehicle Logging</span>
        </div> 
    </div>
    <main>
        <div class="main-container">
           <label for="search-fields" class="search-label"> Search</label>
           <div class="search-fields">
             <label for="ST-address"> Address</label>
             <input type="text" bind:value={searchParams.address} id="ST-address" name="ST-address">
             <label for="State"> State</label>
             <input type="text" bind:value={searchParams.state} id="State" name="State">
             <label for="City"> City</label>
             <input type="text" bind:value={searchParams.city} id="City" name="City">
             <label for="Trailer_No">Trailer No</label>
             <input type="text" bind:value={searchParams.trailer} id="Trailer_No" name="Trailer_No">
             <label for="Date">Date</label>
             <input type="text" bind:value={searchParams.date} id="Date" name="Date" placeholder="DD/MM/YYYY">
             <label for="Fuel">Fuel</label>
             <input type="text" bind:value={searchParams.fuel} id="Fuel" name="Fuel">
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
                    <th>Time</th>
                    <th>City</th>
                    <th>Vehicle ID</th>
                    <th>Prevented Delivery</th>
                </tr>
            </thead>
            <tbody>
                {#if filteredRows.length > 0}
                {#each filteredRows as row, index}              
                <tr 
                class="main-row {getRowClass(index)} {detailsVisible[index] ? 'hover-row' : ''}" 
                on:click={() => toggleDetails(index)}
            >
                <td>{vehicleFuncs.formatDate(row.Date)}</td>
                <td>{row.Time}</td>
                <td>{row.City}</td>
                <td>{row["Trailer No."]}</td>
                <td>{row["Prevented Delivery "]}</td>
            </tr>
            {#if detailsVisible[index]}
            <tr class="details-row {getRowClass(index)}" on:click={() => toggleDetails(index)}>    
                    <td colspan="4" class="details-cell">
                    <div class="details-header">Details:</div>
                    <div class="details-content">
                        {row.Date} | {row.Time || ''}
                        <br>
                        <span class="label">Trailer No.:</span> {row["Trailer No."] || ''}
                        <br>
                        <span class="label">Full Address:</span> {row.Address || ''} , {row.City} {row.State}
                        <br>
                        <span class="label">Delivered:</span> {row["Prevented Delivery "] || ''} | <span class="label">Tank:</span> T{row["Tank No. "] || ''}
                    </div>
                </td>
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
        color: #5e5e5e;
        font-size: 0.875rem;
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
        background: url('svg/Vector_1.svg') no-repeat left center;
        background-size: contain;
        mask-image: url('svg/Vector_1.svg');
        -webkit-mask-image: url('svg/Vector_1.svg');
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
    .header a:nth-child(2) {
        margin-left: 30%;
    }
    @media (max-width: 1000px) and (max-height: 1000px) {
        .header a:nth-child(2) {
            margin-left: 5%;
        }
        .header img {
            max-height: 6vh; /* Maintain height relative to viewport */
            max-width: 100%; /* Ensure it doesn't exceed the width of its container */
            height: auto; /* Maintain aspect ratio */
            width: auto ;
            scale:1.2;
        }
        .header-background {
            top: 45%;
            height: 90%;
        }
        .sub-header {
            padding-left: 1vh;
        }
        .header a {
            white-space: nowrap;
            padding-left: 1.5vw;
        }
        .header input[type="text"] {
            display:none;
        }
        .search-button{
        padding : 0.5vh 0.5vw !important;
        margin-top: 0  !important;
        }
        .clear-button{
            padding : 0.5vh 0.5vw !important;    
            margin-top: 0  !important;
        }
        .search-fields {
            display: flex;
            flex-wrap: wrap;
            padding-left: 10% !important;
        }
        .search-fields label {
            width: 25%;
            margin: 2vh 0 1vh;
        }
        .search-fields input {
            width: 60% !important;
            margin: 1vh 5% 1vh 0 !important;
            padding-left: 0.5vw !important;
        }
        .search-fields label,
        .search-fields input {
            flex: 0 0 auto;
        }
        .search-fields label:nth-child(4n+1),
        .search-fields label:nth-child(4n+3) {
            flex-basis: 15%;
        }
        .search-fields input:nth-child(4n+2),
        .search-fields input:nth-child(4n+4) {
            flex-basis: 25%;
        }
        .button-container{
            margin-top: 1vh !important;
        }
        footer img { 
            max-height: 6vh; /* Maintain height relative to viewport */
            max-width: 20%; /* Ensure it doesn't exceed the width of its container */
            height: auto; /* Maintain aspect ratio */
            width: auto !important;
        }
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
    .search-fields {
        padding-left:10%;
        padding-right:10%;
    }
    .search-fields label {
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
    .search-fields input{
        background-color: #EAF3FC;
        border:none;
        margin-left:1vw;
        margin-right:1vw;
        padding-top: 1vh;
        padding-bottom: 1vh;
        padding-left:0.2vw;
        width: 7vw;
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
        z-index: 1;
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
        z-index: 1;
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
    .search-fields input::placeholder{
        font-size: 0.75rem;
        text-align: center;
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
</style>