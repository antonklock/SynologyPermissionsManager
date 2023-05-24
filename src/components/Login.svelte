<script lang="ts">
  import { fetch } from "@tauri-apps/api/http";

  let authenticated = false;
  let loginFailed = false;

  let username: string;
  let password: string;
  let session: string;
  let otp_code: string;

  let url = "https://klockworks.direct.quickconnect.to:3175/webapi/auth.cgi?";

  const buildUrl = (params: string[], url: string) => {
    let combinedParams = params.join("&");
    let combinedUrl = url + combinedParams;
    return combinedUrl;
  };

  interface AuthResponse {
    data: {
      success: boolean;
    };
  }

  const requestAuth = async (
    username: string,
    password: string,
    session: string,
    otp_code: string
  ): Promise<AuthResponse | void> => {
    let combinedUrl = buildUrl(
      [
        "api=SYNO.API.Auth",
        "version=3",
        "method=login",
        "account=" + username,
        "passwd=" + password,
        "session=" + session,
        "format=sid ",
        "otp_code=" + otp_code,
      ],
      url
    );

    console.log("combinedUrl: " + combinedUrl);

    const response: AuthResponse | void = await fetch(combinedUrl, {
      method: "GET",
      timeout: 5000,
    })
      .then((res) => res as AuthResponse)
      .catch((error) => console.log("Error: " + error));

    console.log(response);
    validateAuthResponse(response as AuthResponse);
    return response;
  };

  const validateAuthResponse = (response: AuthResponse) => {
    if (response.data.success == true) {
      authenticated = true;
      loginFailed = false;
    } else {
      authenticated = false;
      loginFailed = true;
    }
  };

  const requestSynoApiInfo = async () => {
    let combinedUrl = buildUrl(
      [
        "api=SYNO.API.Info",
        "version=1",
        "method=query",
        " query=SYNO.FileStation",
      ],
      url
    );

    const response = await fetch(combinedUrl, {
      method: "GET",
      timeout: 3000,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const requestLogout = async () => {
    let combinedUrl = buildUrl(
      [
        "api=SYNO.API.Auth",
        "version=3",
        "method=logout",
        "account=" + username,
        // `session=${session}`,
      ],
      url
    );

    const response = await fetch(combinedUrl, {
      method: "GET",
      timeout: 3000,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    //@ts-ignore
    if (response.success == true) {
      authenticated = false;
      loginFailed = false;
    }
  };

  const handleLogin = async () => {
    console.log("Login");
    // requestSynoApiInfo();
    requestAuth(username, password, session, otp_code);
    // authenticated = true;
  };

  const handleLogout = () => {
    console.log("Logout");
    requestLogout();
  };
</script>

<div class="container">
  {#if authenticated == false}
    <h1>Login</h1>
    {#if loginFailed == true}
      <p style={"text-color: red"}>Login failed. Please try again.</p>
    {/if}
    <form class="form">
      <input
        type="text"
        name="username"
        placeholder="username"
        bind:value={username}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        bind:value={password}
      />
      <input
        type="text"
        name="session name"
        placeholder="session"
        bind:value={session}
      />
      <input
        type="text"
        name="otp_code"
        placeholder="otp"
        bind:value={otp_code}
      />
    </form>
    <button class={"loginButton"} on:click={handleLogin}>Login</button>
  {:else if authenticated == true && loginFailed == false}
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
