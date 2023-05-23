<script lang="ts">
  import Greet from "./lib/Greet.svelte";
  import Login from "./components/Login.svelte";
</script>

<main class="container">
  <Login />
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
