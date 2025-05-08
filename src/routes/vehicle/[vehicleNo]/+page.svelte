<script>
    import { onMount } from "svelte";
    import { base } from '$app/paths';
    import { page } from '$app/stores';
    import { goto } from "$app/navigation";
    $: trailer = $page.state?.trailer;
    $: previousURL = $page.state?.from;
    let searchBy = "day";
    const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
    const monthOptions = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" }
    ];


function gotoVehicle(vehicleNum) {
  goto(`${base}/vehicle/${vehicleNum}`, {
    state: {
      trailer: vehicleNum,
    },
  });
}
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 51 }, (_, i) => currentYear - i);
    
    // Variable to store the selected value
    let selectedValue = "";
    
    $: if (searchBy) {
        selectedValue = "";
    }
  
    let allTimelineEvents = [
        {
        "Date": "09.12.2025",
        "Time": "12:16",
        "Trailer No.": "XJWP612",
        "Address": "2151 SW 36TH ST",
        "City": "San Antonio",
        "State": "TX",
        "Tank No. ": "1",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "09.01.2025",
        "Time": "9:04",
        "Trailer No.": "EAQY355",
        "Address": "207 E HWY 90A",
        "City": "Richmond",
        "State": "TX",
        "Tank No. ": "1",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "08.14.2025",
        "Time": "5:52",
        "Trailer No.": "QIBL401",
        "Address": "619 CROSSROADS ST",
        "City": "Laredo",
        "State": "TX",
        "Tank No. ": "6",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "07.09.2025",
        "Time": "2:40",
        "Trailer No.": "ZMXN329",
        "Address": "2901 highway 35 N",
        "City": "Rockport",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "06.30.2025",
        "Time": "23:28",
        "Trailer No.": "YDAL921",
        "Address": "6321 S 23rd St.",
        "City": "McAllen",
        "State": "TX",
        "Tank No. ": "2",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "06.24.2025",
        "Time": "20:16",
        "Trailer No.": "WQOG696",
        "Address": "6321 S 23rd St.",
        "City": "McAllen",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "06.03.2025",
        "Time": "17:04",
        "Trailer No.": "MLCP696",
        "Address": "11102 IH-37 Access",
        "City": "Corpus Christi",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "05.19.2025",
        "Time": "13:52",
        "Trailer No.": "CSHQ488",
        "Address": "2202 HOLLY ROAD",
        "City": "Corpus Christi",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "05.14.2025",
        "Time": "10:40",
        "Trailer No.": "NDTN157",
        "Address": "9111 N. Interstate 35",
        "City": "Jarrell",
        "State": "TX",
        "Tank No. ": "7",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "04.18.2025",
        "Time": "7:28",
        "Trailer No.": "WAYQ933",
        "Address": "16555 HUEBNER RD",
        "City": "San Antonio",
        "State": "TX",
        "Tank No. ": "3",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "04.12.2025",
        "Time": "4:16",
        "Trailer No.": "VYQJ687",
        "Address": "1301 N LOOP 340",
        "City": "LACY LAKEVIEW",
        "State": "TX",
        "Tank No. ": "6",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "04.04.2025",
        "Time": "1:04",
        "Trailer No.": "XVMF575",
        "Address": "720 SPRING VALLEY",
        "City": "Hewitt",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "02.22.2025",
        "Time": "21:52",
        "Trailer No.": "HRZC199",
        "Address": "3225 E EXPY 83",
        "City": "Weslaco",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "02.11.2025",
        "Time": "18:40",
        "Trailer No.": "WWRO626",
        "Address": "101 N WATER ST",
        "City": "Burnet",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "01.29.2025",
        "Time": "15:28",
        "Trailer No.": "XPUW441",
        "Address": "S. 9th & Tyler Ave.",
        "City": "Harlingen",
        "State": "TX",
        "Tank No. ": "2",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "01.18.2025",
        "Time": "12:16",
        "Trailer No.": "TZJB482",
        "Address": "S. 9th & Tyler Ave.",
        "City": "Harlingen",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "01.12.2025",
        "Time": "9:04",
        "Trailer No.": "IQZL863",
        "Address": "15513 STATE HWY 30",
        "City": "Roans Prairie",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "01.03.2025",
        "Time": "5:52",
        "Trailer No.": "RKAS706",
        "Address": "5202 IH 37",
        "City": "Corpus Christi",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "12.22.2024",
        "Time": "2:40",
        "Trailer No.": "XQGA728",
        "Address": "12200 FM 969 RD",
        "City": "Austin",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "12.21.2024",
        "Time": "23:28",
        "Trailer No.": "OXKD221",
        "Address": "905 N. McCoy Blvd.",
        "City": "New Boston",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "12.13.2024",
        "Time": "20:16",
        "Trailer No.": "FDQV927",
        "Address": "101 EE OHNMEISS BLVD",
        "City": "Lampasas",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "12.02.2024",
        "Time": "17:04",
        "Trailer No.": "NALY964",
        "Address": "16222 WALLISVILLE RD",
        "City": "Houston",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "11.09.2024",
        "Time": "13:52",
        "Trailer No.": "OXXE632",
        "Address": "27137 TOMBALL PKWY",
        "City": "Tomball",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "10.30.2024",
        "Time": "10:40",
        "Trailer No.": "FRFK999",
        "Address": "6406 Old Pearsall Rd",
        "City": "San Antonio",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "09.09.2024",
        "Time": "7:28",
        "Trailer No.": "NASZ308",
        "Address": "21997 FM 1314",
        "City": "Porter",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "DIESEL"
    },
    {
        "Date": "08.10.2024",
        "Time": "4:16",
        "Trailer No.": "LWRZ693",
        "Address": "9157 FM 471 N",
        "City": "San Antonio",
        "State": "TX",
        "Tank No. ": "5",
        "Prevented Delivery ": "GAS-PREM"
    },
    {
        "Date": "06.28.2024",
        "Time": "1:04",
        "Trailer No.": "OGOB151",
        "Address": "10537 N. Hwy. 359",
        "City": "Mathis",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-REG"
    },
    {
        "Date": "05.01.2024",
        "Time": "21:52",
        "Trailer No.": "ICSL902",
        "Address": "1303 W MOUNT HOUSTON RD",
        "City": "Houston",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-MID"
    },
    {
        "Date": "04.28.2024",
        "Time": "18:40",
        "Trailer No.": "LVIC218",
        "Address": "31700 INTERSTATE 10 W",
        "City": "Boerne",
        "State": "TX",
        "Tank No. ": "4",
        "Prevented Delivery ": "GAS-REG"
    }
    ];
    $: vehicleEvents = allTimelineEvents.filter(
    vehicle => vehicle["Trailer No."] === trailer
  );
    // Current date for display
    let currentDisplayDate = new Date();
    let displayedTimelineEvents = [];
    let activeView = "monthly";  
  
    // Parse date from string format "MM.DD.YYYY"
    function parseDate(dateString) {
      if (!dateString) return null;
      
      const [month, day, year] = dateString.split('.');
      // Create a new date object (month is not 0-based in our string format)
      return new Date(year, parseInt(month) - 1, day);
    }
  
    // Format date for display
    function formatDisplayDate(date) {
  if (activeView === 'daily') {
    // Show day, month, and year for daily view
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } else if (activeView === 'weekly') {
    // For weekly view, show the week range
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const startOptions = { month: 'long', day: 'numeric' };
    const endOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    
    // If start and end are in the same month
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${startOfWeek.toLocaleDateString('en-US', { day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', endOptions)}`;
    }
    
    return `${startOfWeek.toLocaleDateString('en-US', startOptions)} - ${endOfWeek.toLocaleDateString('en-US', endOptions)}`;
  } else if (activeView === 'monthly') {
    // Show only month and year for monthly view
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  } else {
    // Fallback or yearly view - show only year
    return date.getFullYear().toString();
  }
}
function goToSelectedDate() {
  if (!selectedValue) return; // Do nothing if no value is selected
  
  const newDate = new Date(currentDisplayDate);
  
  if (searchBy === "day") {
    // Set the day while keeping current month and year
    newDate.setDate(parseInt(selectedValue));
    currentDisplayDate = newDate;
    
    // Switch to daily view when selecting a specific day
    changeView('daily');
  } 
  else if (searchBy === "month") {
    // Set the month while keeping current year
    newDate.setMonth(parseInt(selectedValue) - 1); // Months are 0-indexed in JS
    newDate.setDate(1); // Set to first day of the month
    currentDisplayDate = newDate;
    
    // Switch to monthly view when selecting a specific month
    changeView('monthly');
  } 
  else if (searchBy === "year") {
    // Set the year while keeping the current month
    newDate.setFullYear(parseInt(selectedValue));
    currentDisplayDate = newDate;
    
    // Could optionally switch to yearly view here if implemented
    changeView('monthly'); // Default to monthly view for now when selecting a year
  }
  
  // Update displayed events
  displayedTimelineEvents = filterEvents();
}
    // Sort events chronologically
    function sortEventsByDate(events) {
      return [...events].sort((a, b) => {
        const dateA = parseDate(a.Date);
        const dateB = parseDate(b.Date);
        return dateA - dateB;
      });
    }
  
    // Filter events based on the active view and current display date
    function filterEvents() {
      const sortedEvents = sortEventsByDate(allTimelineEvents);
      
      if (activeView === 'daily') {
        // Filter for the current day
        return sortedEvents.filter(event => {
          const eventDate = parseDate(event.Date);
          return eventDate && 
                 eventDate.getDate() === currentDisplayDate.getDate() &&
                 eventDate.getMonth() === currentDisplayDate.getMonth() &&
                 eventDate.getFullYear() === currentDisplayDate.getFullYear();
        });
      } else if (activeView === 'weekly') {
        // Get start and end of the week for currentDisplayDate
        const startOfWeek = new Date(currentDisplayDate);
        startOfWeek.setDate(currentDisplayDate.getDate() - currentDisplayDate.getDay());
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return sortedEvents.filter(event => {
          const eventDate = parseDate(event.Date);
          return eventDate && eventDate >= startOfWeek && eventDate <= endOfWeek;
        });
      } else {
        // Monthly view (default)
        return sortedEvents.filter(event => {
          const eventDate = parseDate(event.Date);
          return eventDate && 
                 eventDate.getMonth() === currentDisplayDate.getMonth() &&
                 eventDate.getFullYear() === currentDisplayDate.getFullYear();
        });
      }
    }
  
    // Navigate timeline forward or backward
    function navigateTimeline(direction) {
      if (activeView === 'daily') {
        // Navigate by days
        const newDate = new Date(currentDisplayDate);
        newDate.setDate(currentDisplayDate.getDate() + (direction === 'left' ? -1 : 1));
        currentDisplayDate = newDate;
      } else if (activeView === 'weekly') {
        // Navigate by weeks
        const newDate = new Date(currentDisplayDate);
        newDate.setDate(currentDisplayDate.getDate() + (direction === 'left' ? -7 : 7));
        currentDisplayDate = newDate;
      } else {
        // Navigate by months
        const newDate = new Date(currentDisplayDate);
        newDate.setMonth(currentDisplayDate.getMonth() + (direction === 'left' ? -1 : 1));
        currentDisplayDate = newDate;
      }
      
      // Update displayed events
      displayedTimelineEvents = filterEvents();
    }
    
    // Change view function
    function changeView(view) {
      activeView = view;
      displayedTimelineEvents = filterEvents();
    }
  
    function formatEventDate(dateString) {
      if (!dateString) return '';
      
      const date = parseDate(dateString);
      if (isNaN(date?.getTime())) return dateString;
      
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    function getPosition(index, total) {
      // Distribute events across the timeline (leave space on edges)
      const minPosition = 5; // 5% from the left edge
      const maxPosition = 95; // 5% from the right edge
      const availableSpace = maxPosition - minPosition;
      
      // If only one event, center it
      if (total === 1) return 50;
      
      // Otherwise distribute evenly
      return minPosition + (availableSpace / (total - 1)) * index;
    }
  
    function setupMobileMenu() {
      const hamburger = document.getElementById('hamburger-menu');
      const sidebar = document.getElementById('mobile-sidebar');
      const overlay = document.getElementById('overlay');
      
      if (hamburger && sidebar && overlay) {
        hamburger.addEventListener('click', function() {
          sidebar.classList.toggle('active');
          overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        });
        
        overlay.addEventListener('click', function() {
          sidebar.classList.remove('active');
          overlay.style.display = 'none';
        });
        
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
          link.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
          });
        });
      }
    }
  
 
  
    // Initialize events when the component mounts
    onMount(() => {
      setupMobileMenu();
      // Set the initial view to monthly and filter events
      changeView('monthly');
    });
  
    // Watch for change in displayed events for debugging
    $: {
      if (displayedTimelineEvents.length > 0) {
        console.log(`Showing ${displayedTimelineEvents.length} events for ${formatDisplayDate(currentDisplayDate)} in ${activeView} view`);
      }
    }
  </script>
  
  <svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Mulish' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <title>Vehicle Detail</title>
  </svelte:head>
  
  <header>
    <div class="header-container">
      <div class="top-header">
        <a class="top-header-link" href="https://berrys.com">berrys.com</a>
        <a class="top-header-link" href=" ">Contact Us</a>
      </div>
      <div class="header">
        <div class="header-background" style="background: url({base}/svg/Vector_1.svg) no-repeat left center; mask-image: url({base}/svg/Vector_1.svg'); -webkit-mask-image: url({base}/svg/Vector_1.svg);"></div>
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
      <h1> Vehicle {trailer} </h1>
      <img src="{base}/images/Truck_graphic.png" alt="truck_graphic">
      <span> Using the time line, hover your mouse above each event to find the delivery detail. You can set the timeline to show delivery daily, weekly or monthly. </span>
    </div>
    <div class="breadcrumb">
      <a href="{base}/home">Home</a><a href="{base}{previousURL}">{previousURL}</a>/<span> Vehicle Details</span>
    </div> 
  </div>
  
  <main>
    <div class="main-container">
      <span class="main-container-header">
        Timeline 
      </span>
      
      
<div class="search-fields">
  <div class="field-pair">
    <label for="search-by">Search By:</label>
    <select id="search-by" name="dates" bind:value={searchBy}>
      <option value="day">Day</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
    </select>
  </div>
  
  <div class="field-pair">
    <label for="select">Select:</label>
    
    {#if searchBy === "day"}
      <select id="select" bind:value={selectedValue}>
        <option value="" disabled selected>Select a day</option>
        {#each dayOptions as day}
          <option value={day}>{day}</option>
        {/each}
      </select>
    {:else if searchBy === "month"}
      <select id="select" bind:value={selectedValue}>
        <option value="" disabled selected>Select a month</option>
        {#each monthOptions as month}
          <option value={month.value}>{month.label}</option>
        {/each}
      </select>
    {:else if searchBy === "year"}
      <select id="select" bind:value={selectedValue}>
        <option value="" disabled selected>Select a year</option>
        {#each yearOptions as year}
          <option value={year}>{year}</option>
        {/each}
      </select>
    {/if}
  </div>
  
  <div class="field-pair">
    <button class="go-to-btn" on:click={goToSelectedDate} disabled={!selectedValue}>
      Go To
    </button>
  </div>
</div>
      
      <div class="timeline-navigation">
        <img 
          src="{base}/svg/left-arrow.svg" 
          alt="left-arrow" 
          class="left-arrow" 
          on:click={() => navigateTimeline('left')}
        >
        
        <div class="timeline-container">
          <div class="current-period">
            {formatDisplayDate(currentDisplayDate)}
          </div>
          
          <div class="timeline">
            <div class="timeline-line"></div>
            
            {#each displayedTimelineEvents as event, i}
              <div 
                class="timeline-event" 
                style="left: {getPosition(i, displayedTimelineEvents.length)}%"
              >
                <div class="timeline-dot"></div>
                <div class="timeline-date">{formatEventDate(event.Date)}</div>
                <div class="timeline-popup">
                  <h3>{event.Address}, {event.City}, {event.State}</h3>
                  <p><strong>Time:</strong> {event.Time}</p>
                  <p><strong>Tank #:</strong> {event["Tank No. "]}</p>
                  <p><strong>Trailer #:</strong> {event["Trailer No."]}</p>
                  <p><strong>Prevented Delivery:</strong> {event["Prevented Delivery"]}</p>
                </div>
              </div>
            {/each}
            
            {#if displayedTimelineEvents.length === 0}
              <div class="no-events">No events to display for this period</div>
            {/if}
          </div>
          
          <div class="timeline-controls">
            <button 
              class="timeline-view-btn {activeView === 'daily' ? 'active' : ''}" 
              on:click={() => changeView('daily')}
            >
              Daily
            </button>
            <button 
              class="timeline-view-btn {activeView === 'weekly' ? 'active' : ''}" 
              on:click={() => changeView('weekly')}
            >
              Weekly
            </button>
            <button 
              class="timeline-view-btn {activeView === 'monthly' ? 'active' : ''}" 
              on:click={() => changeView('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <img 
          src="{base}/svg/right-arrow.svg" 
          alt="right-arrow" 
          class="right-arrow" 
          on:click={() => navigateTimeline('right')}
        >
      </div>
      
      <div class="other-vehicle">
        <label for="another-vehicle"> Looking for another vehicle? Search: </label>
        <input id="another-vehicle" class="another-vehicle" on:keydown={(e) => { if (e.key === 'Enter') gotoVehicle(e.target.value); e.target.value = '';}}>
      </div>
    </div>
  </main>
    
  <footer>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
      <span style="font-size: 1rem; font-family: Mulish;">@copyrights Berrys Global Innovations</span>
      <img src="{base}/images/logo.png" alt="Berrys Logo">
    </div>
  </footer>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    main {
      flex: 1; 
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
      img.left-arrow{
        margin-right: 7vw;
      }
      img.right-arrow{
        margin-left: 3vw;
        margin-right: 2vw !important;
      }
      .another-vehicle{
        max-width: 20vw !important;
        width: 20vw;
      }
      .field-pair select,
      .field-pair label{
        margin: auto;
      }
      .field-pair select{
        margin-left: 0 !important;
        max-width: 20vw !important;
      }
      .field-pair button{
        margin : auto;
      }
      footer img { 
        max-height: 6vh; 
        max-width: 20%;
        height: auto;
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
      text-transform: capitalize;
    }
    
    .breadcrumb a:hover {
      text-decoration: underline;
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
      padding-top: 4vh;
      padding-left: 4vh;
      border-top-left-radius: 20px;
      background-color: white;
      height: 100%;
      display:flex;
      flex-direction: column;
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
    
    .main-container-header{
      font-family: 'Mulish', sans-serif;
      font-size: 2rem;
      font-weight: 400;
      color:#014B96;
      margin-bottom: 2vh;
    }
    
    .search-fields {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 15px;
    }
  
    .field-pair {
      display: flex;
      align-self: center;
      width: 100%;
      max-width: 400px;
    }
  
    .field-pair label {
      width: 100px;
      justify-self: center;
      text-align: right;
      margin-right: 10px;
      font-family: 'Mulish', sans-serif;
      color: #014B96;
    }
  
    
    .field-pair select{
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 4px;
      max-width:10vw;
      background-color: #EAF3FC;
    }
  
    img.left-arrow {
      width:10%;
      height:10%;
      margin-left: 2vh;
      cursor: pointer;
    }
    
    img.right-arrow {
      width:10%;
      height:10%;
      margin-right: 2vh;
      cursor: pointer;
    }
    
    .timeline-navigation {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 20px;
    }
    
    .timeline-container {
      flex: 1;
      margin: 30px 0;
      padding: 0 10px;
    }
    
    .current-period {
      text-align: center;
      font-family: 'Mulish', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #014B96;
      margin-bottom: 15px;
    }
    
    .timeline {
      position: relative;
      height: 140px;
      margin: 20px 0;
      padding-bottom: 20px;
    }
    
    .timeline-line {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      height: 4px;
      background-color: #014B96;
      border-radius: 2px;
    }
    
    .timeline-event {
      position: absolute;
      top: 30px;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
    
    .timeline-dot {
      width: 20px;
      height: 20px;
      background-color: #F9BC39;
      border: 3px solid #014B96;
      border-radius: 50%;
      margin-top: 42px;
      z-index: 1;
      transition: transform 0.2s ease;
    }
    
    .timeline-date {
      margin-top: 10px;
      font-family: 'Mulish', sans-serif;
      font-size: 0.875rem;
      color: #014B96;
      font-weight: 600;
      text-align: center;
      max-width: 120px;
      word-wrap: break-word;
    }
    
    .timeline-popup {
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      min-width: 200px;
      background-color: white;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
      z-index: 10;
    }
    
    .timeline-popup h3 {
      font-family: 'Mulish', sans-serif;
      font-size: 1rem;
      color: #014B96;
      margin-bottom: 10px;
    }
    
    .timeline-popup p {
      font-family: 'Mulish', sans-serif;
      font-size: 0.875rem;
      margin-bottom: 5px;
    }
    .timeline-event:hover .timeline-dot {
        transform: scale(1.3);
    }
    
    .timeline-event:hover .timeline-popup {
        opacity: 1;
        visibility: visible;
    }
    
    .timeline-controls {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
    }
    
    .timeline-view-btn {
        background-color: #EAF3FC;
        border: 1px solid #014B96;
        border-radius: 20px;
        padding: 6px 15px;
        font-family: 'Mulish', sans-serif;
        font-size: 0.875rem;
        color: #014B96;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .timeline-view-btn.active {
        background-color: #014B96;
        color: white;
    }
    
    .timeline-view-btn:hover:not(.active) {
        background-color: #d5e7f7;
    }
    .another-vehicle{
  padding: 1vh 0.5vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width:10vw;
  background-color: #EAF3FC;

    }
    .other-vehicle label {
        width: 100px;
  justify-self: center;
  text-align: right;
  margin-right: 10px;
  font-family: 'Mulish', sans-serif;
  color: #014B96;
  font-size: 1.5rem;
    }
    .go-to-btn {
  background-color: #014B96;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'Mulish', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.go-to-btn:hover {
  background-color: #0163c5;
}

.go-to-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Update the search fields layout for better alignment */
.search-fields {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.field-pair {
  display: flex;
  align-items: center;
  min-width: 200px;
}
.main-container {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
      </style>