export class Stat {
  generalTotems: number = 0;
  analyticalTotems: number = 0;
  criticalTotems: number = 0;
  currentCycle?: number;
  currentSpirits?: number;
  lastTotemUpdate?: string;
  tribesBalance?: TribePoint[];
  tribesPoints?: TribePoint[];
  actionsPoints?: ActionPoint[];
  timeInGame?: number;
}

export class TribePoint {
  id: number;
  score: number = 0;
  actionsPoints: ActionPoint[] = [];
}

export class ActionPoint {
  actionId?: number;
  tribeId?: number;
  challengeId?: number;
  score?: number;
  answerRecords?: AnswerRecord[];
}

export class AnswerRecord {
  questionId?: number;
  answerId?: number;
}
