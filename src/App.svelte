<script lang="ts">
	import {state} from './state'
</script>

<main>
	{#each $state.questions as question (question.id)}
		<div>{question.answers}</div>
	{/each}
</main>

<style>
</style>