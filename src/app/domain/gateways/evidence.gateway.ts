import { Evaluate, Evidence, Phase } from '@domain/models/evidence.model';

export abstract class EvidenceGateway {
  abstract evidences(
    grade: string,
    tribeId: number,
    courseId: number,
    phase: Phase
  ): Promise<Evidence[]>;

  abstract evaluate(evaluateData: Evaluate): Promise<boolean>;

  abstract upload(
    phase: Phase,
    tribeId: number,
    form: FormData
  ): Promise<boolean>;

  abstract download(evidenceId: string): Promise<any>;

  abstract checkIfAlreadySubmitted(phase: Phase, tribeId: number): Promise<boolean>;
}
