<script lang="ts">
  import Permission from "./Permission.svelte";

  export let name: String;
  export let email: string;
  export let groups: string[];
  export let permissions: string[];

  let isExpanded: boolean = false;
  let showOptions: boolean = false;
  let showInfo: boolean = false;

  const toggleExpand = () => {
    isExpanded = !isExpanded;
  };

  const toggleShowOptions = () => {
    showOptions = !showOptions;
  };

  const toggleShowInfo = () => {
    showInfo = !showInfo;
  };
</script>

<div>
  {#if isExpanded}
    <div class="user-info">
      <button on:click={toggleExpand}>Collapse</button>
      <p>{name}</p>
      <button on:click={toggleShowInfo}>Show info</button>
    </div>
    <div>
      {#each permissions as permission}
        <Permission name={permission} />
      {/each}
      <button>Add permission</button>
    </div>
  {:else}
    <div class="user-info">
      <button on:click={toggleExpand}>Expand</button>
      <p>{name}</p>
      <button on:click={toggleShowInfo}>Show info</button>
    </div>
  {/if}
</div>

<style>
  .user-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
