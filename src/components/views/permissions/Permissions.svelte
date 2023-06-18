<script lang="ts">
  import User from "./User.svelte";
  import folderTree from "../../../data/folderTree.json";

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

  const getAccessableFolders = () => {
    let accessableFolders: string[] = [];

    console.log("getChildrenInFolder");
    console.log(getChildrenInFolder(folderTree));

    console.log(" ");

    let folders = getChildrenInFolder(folderTree);
    console.log("getAllUsersWithPermissions");
    console.log(getAllUsersWithPermissions(folders));

    // for (let folder in folderTree) {
    //   // folder.forEach((child) => {
    //   //   if (child.permissions.includes(name)) {
    //   //     accessableFolders.push(child.name);
    //   //   }
    //   // });
    // }
  };

  const getAllUsersWithPermissions = (folders) => {
    const usersWithPermissions: user[] = [];

    folders.forEach((folder) => {
      if ("accountsWithPermission" in folder) {
        folder.accountsWithPermission.forEach((account) => {
          if (!usersWithPermissions.includes(account)) {
            const user = {
              name: account,
              email: account + "@EMAIL.COM",
              groups: ["user"],
              permissions: [folder.name],
            };

            usersWithPermissions.push(user);
          }
        });
      }
    });

    return usersWithPermissions;
  };

  const getChildrenInFolder = (folder: Record<string, any>) => {
    if ("children" in folder && Array.isArray(folder.children)) {
      let children = [...folder.children];

      folder.children.forEach((child) => {
        children.push(...getChildrenInFolder(child));
      });
      return children;
    }

    return [];
  };

  getAccessableFolders();
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
