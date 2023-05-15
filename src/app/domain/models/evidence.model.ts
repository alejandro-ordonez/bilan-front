export type Phase = 'INTERACTIVE' | 'PRE_ACTIVE' | 'POST_ACTIVE';

export class Evidence {
  document: string;
  name: string;
  lastName: string;
  uploadedDate: string;
  evidenceId: string;
  download?: any;
  hasEvaluation?: number;
}

export class Evaluate {
  student: string;
  evidenceId: string;
  cbScore: number;
  ccScore: number;
  csScore: number;
  tribeScore: number;
}
