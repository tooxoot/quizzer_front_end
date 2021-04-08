<script lang="ts">
  import { QuizzerProtocol as QP } from '@tooxoot/quizzer-protocol'
  import AnswerIndicator from './AnswerIndicator.svelte'
  import { state } from './state'

  let lines: [string, QP.State.Leaderboard.Entry][]
  lines = Object.entries($state.leaderBoard).sort((a, b) => (a[1].total > b[1].total ? 1 : -1))

  let questions: QP.State.Question[]
  $: questions = $state.catalogue.questions

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => char + ':')
</script>

<div class="leaderboard">
  <h1>Leaderboard</h1>
  <div>
    {#each lines as [username, entry], idx}
      <div style={`grid-row: ${idx + 1}`}>
        {username}
      </div>
      <div style={`grid-row: ${idx + 1}`}>
        {entry.total}
      </div>
      {#each questions as question}
        <div style={`grid-row: ${idx + 1}`}>
          <AnswerIndicator correct={entry.givenAnswers[question.id] === question.rightAnswer} />
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .leaderboard > div {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 20px;
  }
</style>
