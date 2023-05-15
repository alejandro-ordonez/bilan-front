export class Answer {
  id: number;
  statement?: string;
  selected?: boolean;
}

export class QuestionRequest {
  tribeId: number;
  numberOfQuestions: number;
}

export class ValidateQuestionRequest {
  answer: number;
  questionId: number;
}

export class Question {
  id: number;
  title?: string;
  statement?: string;
  context?: string;
  justification?: string;
  errorMessage?: string;
  answers: Answer[];
}

export class Challenge {
  id?: number;
  name?: string;
  cost: number;
}
export class Action {
  id?: number;
  name?: string;
}

export class Tribe {
  id?: number;
  name?: string;
  culture?: string;
  element?: string;
  adjacentTribe?: number;
  oppositeTribe?: number;
  actions?: Action[];
}

export class GameInfo {
  tribes: Tribe[];
  actions: Action[];
  challenges: Challenge[];
}

export class Activity {
  id?: number;
  description?: string;
  tribeId?: number;
}
