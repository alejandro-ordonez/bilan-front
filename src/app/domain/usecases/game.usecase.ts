import { Injectable } from '@angular/core';
import { GameGateway } from '@domain/gateways/game.gateway';

import {
  QuestionRequest,
  Activity,
  ValidateQuestionRequest,
  GameInfo,
  Question,
} from '@domain/models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameUseCase {
  constructor(private gateGateway: GameGateway) {}

  getQuestions(data: QuestionRequest): Promise<Question[]> {
    return this.gateGateway.getQuestions(data);
  }
  getAllQuestions(): Promise<Question[]> {
    return this.gateGateway.getAllQuestions();
  }
  validateQuestion(data: ValidateQuestionRequest): Promise<boolean> {
    return this.gateGateway.validateQuestion(data);
  }
  getGameInfo(): Promise<GameInfo> {
    return this.gateGateway.getGameInfo();
  }
  getAllActivities(): Promise<Activity[]> {
    return this.gateGateway.getAllActivities();
  }
}
