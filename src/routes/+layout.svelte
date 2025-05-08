
<div class="app-container">
  <slot></slot>
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Mulish', sans-serif;
  }
  
  :global(html, body) {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
</style>