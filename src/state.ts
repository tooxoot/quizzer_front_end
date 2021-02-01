import type { QuizzerProtocol as QP } from '@tooxoot/quizzer-protocol'
import { writable } from 'svelte/store'

let idx = 0
const testQuestion = (q: Partial<QP.State.Question>): QP.State.Question => ({
  answers: ['a', 'b', 'c', 'd'],
  id: 'Q' + idx++,
  prompt: `Prompt Q${idx}`,
  rightAnswer: 1,
  ...q,
})

const init = () => {
  const { subscribe, set, update } = writable<QP.State>({
    catalogue: {
      questions: new Array(5).fill(0).map(testQuestion),
    },
    currentQuestionIdx: 0,
    givenAnswers: {
      Q0: 1,
    },
    leaderBoard: {},
    showLeaderBoard: false,
    showRightAnswers: false,
    timestamp: 0,
  })

  return {
    subscribe,
    set,
  }
}

export const state = init()
