<script lang="ts">
  import Greet from "./lib/Greet.svelte";
  import Login from "./components/Login.svelte";
</script>

<main class="container">
  <Login />
</main>

<style>
  h1 {
    margin-bottom: 0px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
