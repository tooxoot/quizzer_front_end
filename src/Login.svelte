<script lang="ts">
  import { client } from './client'

  let username = ''
</script>

<div>
  <input type="text" bind:value={username} />
  <button on:click={() => client.connect(false, username)}
    >Login as Guest</button
  >
  <button on:click={() => client.connect(true)}>Login as Host</button>
</div>

<style>
  div {
    display: flex;
    flex-flow: column;
    justify-content: stretch;
  }
</style>
