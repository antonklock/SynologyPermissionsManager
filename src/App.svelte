<script lang="ts">
  import Greet from "./lib/Greet.svelte";
  import Login from "./components/login/Login.svelte";
  import Permissions from "./components/views/permissions/Permissions.svelte";

  let isLoggedIn = true;
</script>

<main class="container">
  {#if isLoggedIn}
    <Permissions />
  {:else}
    <Login />
  {/if}
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
