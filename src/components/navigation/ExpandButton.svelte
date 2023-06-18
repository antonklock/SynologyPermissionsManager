<script lang="ts">
  export let expanded: boolean;

  const toggleExpanded = () => {
    expanded = !expanded;
  };
</script>

<div class="flex flex-row justify-center align-middle">
  {#if expanded}
    <img
      on:click={toggleExpanded}
      on:keydown={toggleExpanded}
      class="w-4"
      src="/down-arrow.svg"
      alt="expand button"
    />
  {:else}
    <img
      on:click={toggleExpanded}
      on:keydown={toggleExpanded}
      class="w-4 fill-red-800"
      src="/down-arrow.svg"
      alt="collapse button"
      style="transform: rotate(270deg)"
    />
  {/if}
</div>
