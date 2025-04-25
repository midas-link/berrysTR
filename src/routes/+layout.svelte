<!-- src/routes/+layout.svelte -->
<script>

</script>

<div class="app-container">
  <slot></slot>
</div>

<style>
  /* Apply your previous body styles to this container */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* For styles that must apply to the actual body element */
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