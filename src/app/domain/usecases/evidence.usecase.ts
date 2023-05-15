import { Injectable } from '@angular/core';
import { EvidenceGateway } from '@domain/gateways/evidence.gateway';
import { Evaluate, Evidence, Phase } from '@domain/models/evidence.model';

@Injectable({
  providedIn: 'root',
})
export class EvidenceUseCase {
  constructor(private evidenceGateway: EvidenceGateway) {}

  getEvidences(
    grade: string,
    tribeId: number,
    courseId: number,
    phase: Phase
  ): Promise<Evidence[]> {
    return this.evidenceGateway.evidences(grade, tribeId, courseId, phase);
  }

  evaluate(evaluateData: Evaluate): Promise<boolean> {
    return this.evidenceGateway.evaluate(evaluateData);
  }

  download(evidenceId: string): Promise<any> {
    return this.evidenceGateway.download(evidenceId);
  }

  upload(phase: Phase, tribeId: number, form: FormData): Promise<boolean> {
    return this.evidenceGateway.upload(phase, tribeId, form);
  }
}
