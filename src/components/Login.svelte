<script lang="ts">
  import { fetch } from "@tauri-apps/api/http";

  let authenticated = false;

  // let username: string;
  // let password: string;
  // let session: string;
  // let otp_code: string;

  const handleLogin = async () => {
    console.log("Login");
    const response = await fetch(
      "https://klockworks.direct.quickconnect.to:3175/webapi/query.cgi?",
      {
        method: "GET",
        timeout: 3000,
        headers: {
          api: "SYNO.API.Info",
          version: "1",
          method: "query",
          query: "SYNO.API.FileStation",
        },
      }
    )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

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
