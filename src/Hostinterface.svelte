<script lang="ts">
  import { QuizzerProtocol as QP } from '@tooxoot/quizzer-protocol'
  import { state } from './state'
  import { client } from './client'

  let current: QP.State.Question
  $: current = $state.catalogue.questions[$state.currentQuestionIdx]

  let givenAnswer: number
  $: givenAnswer = $state.leaderBoard[$client.username]?.givenAnswers[current.id]

  let rightAnswer: number
  $: rightAnswer = current.rightAnswer

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => char + ':')

  const send = (type: QP.HostClient.Message.TYPES) => () => client.send({ type })
</script>

<div>
  <button on:click={send(QP.HostClient.Message.TYPES.NEXT_QUESTION)}>Next</button>
  <button on:click={send(QP.HostClient.Message.TYPES.STOP_QUESTION)}>Stop Current Question</button>
  <button on:click={send(QP.HostClient.Message.TYPES.SHOW_LEADERBOARD)}>Show Leaderboard</button>
</div>

<style>
  div {
    align-self: stretch;
    padding: 20px;
    display: flex;
    flex-flow: column;
    align-items: stretch;
  }
</style>
