<script>
    import { onMount } from "svelte";
    import { base } from '$app/paths';
    import { page } from '$app/stores';

    $: address = $page.state?.address;
    $: city = $page.state?.city;
    $: State = $page.state?.state;
    $: date = $page.state?.date;
    $: siteCode = $page.state?.siteCode;
    $: previousURL = $page.state?.from;
   
    function formatDate(dateString) {
    if (!dateString) return '';
    
    // Split the date string into day, month, year
    const [day, month, year] = dateString.split('/');
    
    // Create a new date object (month is 0-based in JavaScript)
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    // Use original formatting for older dates
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
  const fullAddress = `Delivery to:${address} ${city} ${State}`
  headers.push(fullAddress);
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
    : "delivery-details";
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
    doc.text("Delivery Details Data for:", 14, 15);

    const fullAddress = `${address}, ${city} ${State}`
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`\n${fullAddress}\n`, 14, 15);

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
    const fileName = `delivery_details_${formattedDate}_${formattedTime}.pdf`;

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
function closeDropdown(event) {
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
    onMount(() =>{
  setupMobileMenu();
    });
  </script>
  <svelte:head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
    <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"
  ></script>
      <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
      <title>Delivery Detail</title>
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
                  <a href="{base}/cross-drops">Cross-Drop Prevention</a>
                  <a href="{base}/vehicle-logging">Vehicle Logging</a>
                  <a href="{base}/site-data">Site Data</a>
                  <a href="{base}/inventory">Inventory</a>
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
                  <h1> Delivery Detail </h1>
                  <img src="{base}/images/Gas_station_graphic.png" alt="gas_station">
                  <span> View below delivery details from {formatDate(date)} </span>
                
          </div>
          <div class="breadcrumb">
              <a href="{base}/home">Home</a><a href="{base}{previousURL}">{previousURL}</a>/<span> Delivery Detail</span>
          </div> 
      </div>
      <main>
         <div class="main-container">
            <span class="address-details"> 
                {address}, {city} {State} <span style="margin-left: 30vw" >Site Code:{siteCode} </span>
            </span>
            <div class="delivery-details">
            <span class="delivery-time">
                Total Delivery Time: 36 mins 
            </span>
            <span> 
                Compartments Loaded : 5 
            </span>
             </div>
             <div class="trailer-report">
             <span class="trailer-id">Trailer: HDY674</span>
             <div class="export-dropdown">
                   <button class="export-button" on:click={toggleDropdown}>Export As ▼</button>
                   <div class="dropdown-content" id="exportDropdown">
                       <button href=" " on:click|preventDefault={exportTableToCSV}>CSV</button>
                       <button href=" " on:click|preventDefault={exportTableToPDF}>PDF</button>
                   </div>
               </div>
             </div>
             <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Time(duration)</th>
                    <th>Tank</th>
                    <th>Tank Grade</th>
                    <th>Delivery Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Session 1</td>
                    <td>13:03-13:12(9 mins)</td>
                    <td>2</td>
                    <td>Diesel 2#</td>
                    <td>Good Fuel</td>
                </tr>
                <tr>
                    <td>Session 2</td>
                    <td>13:03-13:12(9 mins)</td>
                    <td>2</td>
                    <td>Diesel 2#</td>
                    <td>Good Fuel</td>
                </tr>
                <tr>
                    <td>Session 3</td>
                    <td>13:03-13:12(9 mins)</td>
                    <td>2</td>
                    <td>GAS 87 OCTANE 10.0%</td>
                    <td>Good Fuel</td>
                </tr>
                <tr style="color:red">
                  <td>Session 4</td>
                  <td >13:36 No Drop</td>
                  <td>1</td>
                  <td>GAS 87 OCTANE 10.0%</td>
                  <td>Cross-drop</td>
              </tr>
              <tr>
                <td>Session 5</td>
                <td>13:39-13:44(5 mins)</td>
                <td>1</td>
                <td>GAS 87 OCTANE 10.0%</td>
                <td>Good Fuel</td>
            </tr>
            <tr>
              <td>Session 6</td>
              <td>13:48-13:54(4 mins)</td>
              <td>3</td>
              <td>GAS 87 OCTANE 10.0%</td>
              <td>Good Fuel</td>
          </tr>
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
              flex-direction: column;
              margin-bottom: 5vh;
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
      white-space: nowrap;
    }
    .header a:nth-child(3) {
      margin-left: 10%;
    }
          
          @media (max-width: 1000px) {    
              .header a:nth-child(2) {
          margin-left: 5%;
        }
        .header img {
      max-height: 8vh; 
      max-width: 100%; 
      height: auto; 
      width: auto;
      scale:1.1;
      margin-left:auto;
    }
        .address-details span{
          margin-left:15vw !important;
        }
        .trailer-id
        {
          margin-right:2vw;
        }
        .header a {
          display:none;
        }
        .header input {
          display:none;
        }
        .hamburger-menu {
        display: block !important;
        position: absolute;
        left: 30px;
        transform: translateY(-50%);
    }
    
        .sub-header {
          padding-left: 1vh;
        }
        * {
          font-size: 0.75rem !important;
        }
        th{
          overflow-wrap: break-word;
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
          .sub-header img {
            width:10%;
            height:10%;
          }
          .sub-header span {
              padding-left: 10%;
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
        .trailer-id{
          margin-left:45%;
          font-size:1.25rem;
        }
          .breadcrumb span,
          .breadcrumb a {
          font-family: 'Mulish', sans-serif;
          text-decoration: none;
          color: #014B96;
          font-size: 0.875rem;
          font-weight: 700;
          font-style: bold;
          text-transform: capitalize;
          }
          .breadcrumb a:hover {
          text-decoration: underline;
          }
          .address-details{
            font-family: 'Mulish', sans-serif;
        font-size: 2rem;
        font-weight: 400;
        color:#014B96;
        margin-bottom: 2vh;
          }
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
          .mobile-sidebar {
          position: fixed;
          top: 0;
          left:-250px;
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
      .delivery-time{
        margin-right: 4vw;
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
      .delivery-details{
        align-self: center;
        font-size:1.25rem;
      }
      .trailer-report{
        display: flex;
    align-items: center;
    width: 90%;
    margin: 2vh auto 0 auto; 
      }
      table{
        height:fit-content;
        width:fit-content;
        align-self: center;
        justify-content: space-between;
        border-collapse: collapse;
        max-height:70vh;
        margin-top:1vh;
        margin-left:auto;
        margin-right:auto;
        border-radius:10px;
        overflow: hidden;
        margin-bottom:5vh;
        width:95%;
      }
      thead{
        background-color: #F5F5F5;
        padding:0;
        margin:0;
      }
      tbody tr:nth-child(odd){
        background-color: white;
      }
      tbody tr:nth-child(even){
        background-color: #F5F5F5;
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
    .export-dropdown {
        position: relative;
        display: inline-block;
        margin-left: auto;
        z-index: 2;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        right: 0;
        background-color: #f9f9f9;
        min-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 2000;
        border-radius: 4px;
    }
    .dropdown-content button {
        color: #014B96;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        font-family: 'Mulish', sans-serif;
        width:100%;
        border:0;
    }
    .dropdown-content button:hover {
        background-color: #EAF3FC;
    }
    :global(.show) {
    display: block !important;
}
      </style>