<!-- DropdownField.svelte -->
<script>
  export let id = "";
  export let label = "";
  export let placeholder = "Select or type";
  export let options = [];
  export let value = "";
  export let onChange = () => {};
  export const prerender = true;

  let showDropdown = false;
  let inputElement;
  let filteredOptions = [...options];

  function toggleDropdown() {
    showDropdown = !showDropdown;
    // Reset filtered options when toggling dropdown with click
    if (showDropdown) {
      filteredOptions = [...options];
    }
  }

  function selectOption(option) {
    value = option;
    onChange(option);
    showDropdown = false;
  }

  function handleInput() {
    const filter = value.toLowerCase();
    filteredOptions = options.filter(option => 
      option.toLowerCase().includes(filter)
    );
    showDropdown = true;
  }

  function handleOutsideClick(event) {
    if (inputElement && !inputElement.contains(event.target)) {
      showDropdown = false;
    }
  }

  // Function to handle clicks on the dropdown arrow specifically
  function handleArrowClick(event) {
    // Prevent the input's onClick from firing
    event.stopPropagation();
    // Show all options when clicking arrow
    filteredOptions = [...options];
    toggleDropdown();
  }
</script>

<svelte:window on:click={handleOutsideClick} />

<label for={id}>{label}</label>
<div class="custom-dropdown" bind:this={inputElement}>
  <div class="input-wrapper">
    <input
      {id}
      type="text"
      {placeholder}
      bind:value
      on:input={handleInput}
      on:focus={() => {
        filteredOptions = [...options];
        showDropdown = true;
      }}
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      on:keydown
      {...$$restProps}
    />
    <div class="dropdown-arrow" on:click={handleArrowClick}></div>
  </div>
  <div class="dropdown-content" class:show={showDropdown}>
    {#each filteredOptions as option}
      <div 
        class="dropdown-item" 
        on:click={() => selectOption(option)}
      >
        {option}
      </div>
    {/each}
  </div>
</div>

<style>
  .custom-dropdown {
    position: relative;
    display: inline-block;
    width: 7vw;
    margin-right:2vw;
  }
  
  .input-wrapper {
    position: relative;
    width: 100%;
  }
  
  .custom-dropdown input {
    background-color: #EAF3FC;
    border: none;
    margin-left: 1vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
    padding-left: 0.5vw;
    height:40px;
    width: 100%;
    color: #014B96;
    font-family: 'Mulish', sans-serif;
    cursor: text;
    box-sizing: border-box;
    padding-right: 20px;
  }
  
  .dropdown-arrow {
    position: absolute;
    left: 95%;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23014B96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px;
    cursor: pointer;
    z-index: 10;
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
    left: 1vw;
    right: 1vw;
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
  @media (max-width: 1000px) {
  .dropdown-content{
    left: 2vw;
    top:4vh;
  }
  }
</style>