<script lang="ts">
  import { client } from './client'
  import { state } from './state'
  import Login from './Login.svelte'
  import Question from './Question.svelte'
  import Leaderboard from './Leaderboard.svelte'
  import Hostinterface from './Hostinterface.svelte'
</script>

<main>
  {#if !$client.isOpen && !$client.isConnecting}
    <Login />
  {:else if !$client.isOpen && $client.isConnecting}
    LOADING
  {:else if $client.isHost}
    <Question />
    <Hostinterface />
  {:else if $state.showLeaderBoard}
    <Leaderboard />
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
