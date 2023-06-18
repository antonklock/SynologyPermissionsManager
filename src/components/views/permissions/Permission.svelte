<script lang="ts">
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

<div class="permission">
  <button on:click={toggleExpanded}>Show subfolders</button>
  <button>Remove</button>
  <p>{name}</p>
  {#if optionsOpen}
    <button on:click={toggleOptions}>Close</button>
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
    <button on:click={toggleOptions}>Options</button>
  {/if}
</div>

<style>
  .permission {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
