import { QuizzerProtocol } from "@tooxoot/quizzer-protocol";
import { writable } from "svelte/store";

export interface Question {
  id: string;
  prompt: string;
  answers: string[];
  rightAnswer?: number;
}

export interface Catalogue {
  questions: Question[];
  currentQuestion: number;
}

const init = () => {
  const { subscribe, set, update } = writable<Catalogue>({
    questions: [],
    currentQuestion: 0,
  });

  return {
    subscribe,
    set,
  };
};

export const state = init();
