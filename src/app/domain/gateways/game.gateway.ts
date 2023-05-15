import {
  ValidateQuestionRequest,
  QuestionRequest,
  Activity,
  GameInfo,
  Question,
} from '@domain/models/game.model';

export abstract class GameGateway {
  abstract getQuestions(data: QuestionRequest): Promise<Question[]>;
  abstract getAllQuestions(): Promise<Question[]>;
  abstract validateQuestion(data: ValidateQuestionRequest): Promise<boolean>;
  abstract getGameInfo(): Promise<GameInfo>;
  abstract getAllActivities(): Promise<Activity[]>;
}
