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
  </script>
  
  <svelte:window on:click={handleOutsideClick} />
  
  <label for={id}>{label}</label>
  <div class="custom-dropdown" bind:this={inputElement}>
    <input
      {id}
      type="text"
      {placeholder}
      bind:value
      on:input={handleInput}
      on:focus={() => showDropdown = true}
      on:click={toggleDropdown}
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <div class="dropdown-content" class:show={showDropdown}>
      {#each filteredOptions as option}
        <div 
          class="dropdown-item" 
          on:click={() => selectOption(option)}
          style="display: {option.toLowerCase().includes(value.toLowerCase()) ? 'block' : 'none'}"
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
    }
    
    .custom-dropdown input {
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
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23014B96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 16px;
      padding-right: 30px;
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
  </style>