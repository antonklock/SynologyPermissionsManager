<script lang="ts">
  import ExpandButton from "../../navigation/ExpandButton.svelte";

  export let name: String;
  let permissionForAllChildren: boolean = true;
  let optionsOpen: boolean = false;
  let expanded: boolean = false;

  const toggleExpanded = () => {
    expanded = !expanded;
  };

  const toggleOptions = () => {
    optionsOpen = !optionsOpen;
  };
</script>

<div class="flex flex-row justify-start align-center">
  <img class="w-4" src="/close-symbol.svg" alt="remove permission" />
  <div class="ml-10 flex flex-row justify-start align-center">
    <ExpandButton {expanded} />

    <p>{name}</p>
    {#if optionsOpen}
      <button class="btn" on:click={toggleOptions}>Close</button>
      <form>
        <input
          type="checkbox"
          id="permissionsForAllChildren"
          checked={permissionForAllChildren}
          on:change={() => {
            permissionForAllChildren = !permissionForAllChildren;
          }}
        />
        <label for="permissionsForAllChildren">Include all children</label>
      </form>
    {:else}
      <img class="w-4" src="/pen-symbol.svg" alt="edit permission" />
    {/if}
  </div>
</div>
