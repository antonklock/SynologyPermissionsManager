<script lang="ts">
  import { fetch } from "@tauri-apps/api/http";
  import { v4 as uuidv4 } from "uuid";

  let authenticated = false;
  let loginFailed = false;
  let enterOtp = false;

  let username: string;
  let password: string;
  let session: string;
  let otp_code: string;
  let enable_syno_token: "yes" | "no" = "yes";

  let did: string;
  let sid: string;
  let synotoken: string;

  let url = "https://klockworks.direct.quickconnect.to:3175/webapi/auth.cgi?";

  const buildUrl = (params: string[], url: string) => {
    let combinedParams = params.join("&");
    let combinedUrl = url + combinedParams;
    return combinedUrl;
  };

  interface AuthResponse {
    data: {
      success: boolean;
      data: {
        did: string;
        sid: string;
        synotoken: string;
        is_portal_port: boolean;
      };
    };
  }

  const requestAuth = async (
    username: string,
    password: string,
    session: string,
    otp_code: string
  ): Promise<AuthResponse> => {
    let combinedUrl = buildUrl(
      [
        "api=SYNO.API.Auth",
        "version=3",
        "method=login",
        "account=" + username,
        "passwd=" + password,
        "format=sid ",
        "otp_code=" + otp_code,
        "enable_syno_token=" + enable_syno_token,
      ],
      url
    );

    console.log("combinedUrl: " + combinedUrl);

    const response: AuthResponse = await fetch(combinedUrl, {
      method: "GET",
      timeout: 5000,
    })
      .then((res) => {
        // getFileStationList();
        return res as AuthResponse;
      })
      .catch((error) => {
        console.log("Error: " + error);
        return response as AuthResponse;
      });

    console.log("Success: " + response.data.success);
    console.log("did: " + response.data.data.did);
    console.log("sid: " + response.data.data.sid);
    console.log("synotoken: " + response.data.data.synotoken);

    console.log(response);
    validateAuthResponse(response as AuthResponse);
    return response;
  };

  const validateAuthResponse = (response: AuthResponse) => {
    if (response.data.success == true) {
      authenticated = true;
      loginFailed = false;
      enterOtp = false;

      getFileStationList();
    } else {
      authenticated = false;
      loginFailed = true;
      enterOtp = false;
    }
  };

  const getFileStationList = async () => {
    let combinedUrl = buildUrl(
      [
        "api=SYNO.FileStation.List",
        "version=1",
        "method=list_share",
        "synotoken=" + synotoken,
      ],
      url
    );

    let response: AuthResponse | null = null;

    response = await fetch(combinedUrl, {
      method: "GET",
      timeout: 3000,
    })
      .then((res) => {
        console.log("combinedUrl: " + combinedUrl);
        console.log("Success!");
        console.log(res);

        return null;
      })
      .catch((error) => {
        console.log("combinedUrl: " + combinedUrl);
        console.log("Fail!");
        console.log(error);

        return response as AuthResponse;
      });

    if (response.data.success == true) {
      console.log("success");
    }
  };

  const requestLogout = async () => {
    let combinedUrl = buildUrl(
      [
        "api=SYNO.API.Auth",
        "version=2",
        "method=logout",
        "account=" + username,
      ],
      url
    );

    let response: AuthResponse | null = null;

    response = await fetch(combinedUrl, {
      method: "GET",
      timeout: 3000,
    })
      .then((response) => {
        console.log(response);
        return response as AuthResponse;
      })
      .catch((error) => {
        console.log(error);
        return response as AuthResponse;
      });

    if (response.data.success == true) {
      authenticated = false;
      loginFailed = false;
      enterOtp = false;
    }
  };

  const setEnterOtp = (enterOtpNewValue: boolean) => {
    console.log("Enter OTP: " + enterOtpNewValue);
    console.log("username: " + username);
    console.log("password: " + password);
    enterOtp = enterOtpNewValue;
  };

  const handleLogin = async () => {
    console.log("Login");
    session = uuidv4();
    requestAuth(username, password, session, otp_code);
  };

  const handleLogout = () => {
    console.log("Logout");
    requestLogout();
  };
</script>

<div class="container">
  {#if authenticated == false && enterOtp == false}
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
    </form>
    <button class={"loginButton"} on:click={() => setEnterOtp(true)}
      >Next</button
    >
  {:else if authenticated == true && loginFailed == false}
    <h1>Logout</h1>
    <button on:click={handleLogout}>Logout</button>
    <p
      style={"font-size: 0.75rem; color: green; background: lightgreen; font-weight: 800; width: 20%; border-radius: 1rem"}
    >
      Login Successful
    </p>
  {:else if enterOtp == true}
    <h1>Login</h1>
    <input
      type="text"
      name="otp_code"
      placeholder="otp"
      bind:value={otp_code}
    />

    <button style={"margin-bottom: 8rem"} on:click={handleLogin}>Login </button>
    <button on:click={() => setEnterOtp(false)}>Back</button>
  {/if}
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form input {
    margin-bottom: 0.5rem;
  }
  .loginButton {
    width: 20%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    min-width: 8rem;
  }
</style>
