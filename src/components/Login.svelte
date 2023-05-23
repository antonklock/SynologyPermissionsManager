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
    <form class="form">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <input type="text" name="otp" placeholder="otp" />
    </form>
    <button class={"loginButton"} on:click={handleLogin}>Login</button>
  {/if}
  {#if authenticated == true}
    <h1>Logout</h1>
    <button on:click={handleLogout}>Logout</button>
    <p
      style={"font-size: 0.75rem; color: green; background: lightgreen; font-weight: 800; width: 20%; border-radius: 1rem"}
    >
      Login Successful
    </p>
  {/if}
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form input {
    margin-bottom: 1rem;
  }
  .loginButton {
    width: 20%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
