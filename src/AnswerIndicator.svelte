<script lang="ts">
  export let correct: boolean = false
</script>

<div>
  {#if correct}
    ✔️
  {:else}
    ✖️
  {/if}
</div>
