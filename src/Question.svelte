<script lang="ts">
  import { QuizzerProtocol as QP } from '@tooxoot/quizzer-protocol'
  import { state } from './state'
  import { client } from './client'
  import AnswerIndicator from './AnswerIndicator.svelte'

  let current: QP.State.Question
  $: current = $state.catalogue.questions[$state.currentQuestionIdx]

  let givenAnswer: number
  $: givenAnswer = $state.leaderBoard[$client.username]?.givenAnswers[current.id]

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => char + ':')

  const sendAnswer = (idx: number) => () => {
    if ($state.lockQuestion) return

    client.send({
      type: QP.GuestClient.Message.TYPES.SUBMIT_ANSWER,
      answer: idx,
    })
  }
</script>

<div class="question">
  <h1 class="prompt">{current.prompt}</h1>

  {#each current.answers as answer, idx}
    <button class:given={idx === givenAnswer} class="answer" on:click={sendAnswer(idx)}>
      <div class="letter">{letters[idx]}</div>
      <div class="text">{answer}</div>
      {#if $state.lockQuestion}
        <div>🔒</div>
      {/if}
      {#if $client.isHost || $state.showRightAnswers}
        <AnswerIndicator correct={idx === current.rightAnswer} />
      {/if}
    </button>
  {/each}
</div>

<style>
  .question {
    display: flex;
    flex-flow: column;
    padding: 20px;
    align-self: stretch;
    justify-self: stretch;
    gap: 20px;
  }

  .prompt {
    text-align: center;
    margin: 0 0 20px 0;
  }

  .answer {
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid black;
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 20px;
    margin: 0;
  }

  .answer .text {
    text-align: left;
  }

  .answer.given {
    background-color: lightblue;
  }
</style>
