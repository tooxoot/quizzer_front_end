<script lang="ts">
  import { client } from './client'
  import Login from './Login.svelte'
  import Question from './Question.svelte'
</script>

<main>
  {#if !$client.isOpen && !$client.isConnecting}
    <Login />
  {:else if !$client.isOpen && $client.isConnecting}
    LOADING
  {:else}
    <Question />
  {/if}
</main>

<style>
  main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 1%;
  }
</style>
