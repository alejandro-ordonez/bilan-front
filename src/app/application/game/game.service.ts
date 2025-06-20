import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@frameworks/config/Constants';
import { GameGateway } from '@domain/gateways/game.gateway';
import { UserGateway } from '@domain/gateways/user.gateway';
import {
  Question,
  QuestionRequest,
  ValidateQuestionRequest,
  Activity,
  GameInfo,
} from '@domain/models/game.model';
import { Response } from '@domain/models/response.model';
import { AuthService } from '@application/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService extends GameGateway {

  constructor(private http: HttpClient, private userAuth: AuthService) {
    super();
  }

  buildConfig() {
    const token = this.userAuth.getToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return options;
  }

  resetGame(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .get<Response>(API.baseUrl + API.game.resetGame, options)
        .subscribe(
          (response: Response) => {
            resolve(true);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  getResets(page: string): Promise<any> {
    return new Promise<Response>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .get<Response>(API.baseUrl + API.game.getResets.replace('{{page}}', page), options)
        .subscribe(
          (response: any) => {
            resolve(response.result);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  getQuestions(request: QuestionRequest): Promise<Question[]> {
    return new Promise<Question[]>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .post<Response>(API.baseUrl + API.game.questions, request, options)
        .subscribe(
          (response: Response) => {
            const data: Question[] = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  getAllQuestions(): Promise<Question[]> {
    return new Promise<Question[]>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .get<Response>(API.baseUrl + API.game.allQuestions, {
          ...options,
        })
        .subscribe(
          (response: Response) => {
            const data: Question[] = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  validateQuestion(request: ValidateQuestionRequest): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .post<Response>(
          API.baseUrl + API.game.validateQuestions,
          request,
          options
        )
        .subscribe(
          (response: Response) => {
            const data: boolean = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  getGameInfo(): Promise<GameInfo> {
    return new Promise<GameInfo>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .get<Response>(API.baseUrl + API.game.gameInfo, options)
        .subscribe(
          (response: Response) => {
            const data: GameInfo = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  getAllActivities(): Promise<Activity[]> {
    return new Promise<Activity[]>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .get<Response>(API.baseUrl + API.game.allActivities, options)
        .subscribe(
          (response: Response) => {
            const data: Activity[] = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }
}
