<script lang="ts">
  import User from "./User.svelte";

  type user = {
    name: string;
    email: string;
    groups: string[];
    permissions: string[];
  };

  let klock: user = {
    name: "Klock",
    email: "anton@klockworks.se",
    groups: ["admin", "user"],
    permissions: ["Full access"],
  };

  let klocken: user = {
    name: "Klocken",
    email: "klock.anton@gmail.com",
    groups: ["user"],
    permissions: ["GANT - FW23", "Google - L10", "GANT - PT23"],
  };

  let pellebos: user = {
    name: "Pellebos",
    email: "pellebos@gmail.com",
    groups: ["user"],
    permissions: ["GANT - FW23", "MindArk", "GANT - PT23"],
  };

  let users: user[] = [klock, klocken, pellebos];
</script>

<div class="flex flex-col justify-center">
  <h1 class={"text-4xl font-bold"}>Permissions</h1>
  <p>Here are all the permissions</p>

  <div class="column">
    <p>Users</p>
    <ul>
      {#each users as user}
        <User
          name={user.name}
          email={user.email}
          groups={user.groups}
          permissions={user.permissions}
        />
      {/each}
    </ul>
  </div>
</div>
