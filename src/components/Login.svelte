<script lang="ts">
  let authenticated = false;

  const handleLogin = () => {
    console.log("Login");
    authenticated = true;
  };

  const handleLogout = () => {
    console.log("Logout");
    authenticated = false;
  };
</script>

<div class="container">
  {#if authenticated == false}
    <h1>Login</h1>
    <button class={"loginButton"} on:click={handleLogin}>Login</button>
    <form>
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="password" placeholder="password" />
      <input type="text" name="otp" placeholder="otp" />
    </form>
  {/if}
  {#if authenticated == true}
    <h1>Logout</h1>
    <button on:click={handleLogout}>Logout</button>
    <p
      style={"color: green; background: lightgreen; font-weight: 800; width: 20%"}
    >
      Login successful!
    </p>
  {/if}
</div>

<style>
  .loginButton {
    width: 20%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
