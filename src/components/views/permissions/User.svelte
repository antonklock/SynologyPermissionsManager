<script lang="ts">
  import ExpandButton from "../../navigation/ExpandButton.svelte";
  import Permission from "./Permission.svelte";
  import folderTree from "../../../data/folderTree.json";

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

  const toggleShowInfo = () => {
    showInfo = !showInfo;
  };
</script>

<div>
  {#if isExpanded}
    <div
      class="flex flex-row justify-start items-center bg-slate-800"
      on:click={toggleExpand}
      on:keydown={toggleExpand}
    >
      <ExpandButton expanded={isExpanded} />
      <p class="mr-2 cursor-default">{name}</p>
      <img
        class="w-4"
        src="/info.svg"
        alt="info"
        on:click={toggleShowInfo}
        on:keydown={toggleShowInfo}
      />
    </div>
    <div>
      {#each permissions as permission}
        <Permission name={permission} />
      {/each}
      <div class="flex flex-row">
        <img class="w-4" src="/add-symbol.svg" alt="add permission" />
        <p class="ml-1">Add permission</p>
      </div>
    </div>
  {:else}
    <div
      class="flex flex-row justify-start items-center hover:bg-slate-800"
      on:click={toggleExpand}
      on:keydown={toggleExpand}
    >
      <ExpandButton expanded={isExpanded} />
      <p class="mr-2 cursor-default">{name}</p>

      <img
        class="w-4"
        src="/info.svg"
        alt="info"
        on:click={toggleShowInfo}
        on:keydown={toggleShowInfo}
      />
    </div>
  {/if}
</div>
