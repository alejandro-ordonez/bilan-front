import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Response } from '@domain/models/response.model';
import { API, DEFAULT_TRIBE_BALANCE } from '@frameworks/config/Constants';
import { UserDataGateway } from '@domain/gateways/user-data.gateway';
import { AnswerRecord, Stat, TribePoint } from '@domain/models/stat.model';
import { User } from '@domain/models/user.model';
import { UserGateway } from '@domain/gateways/user.gateway';
import { Action, Challenge, Tribe } from '@domain/models/game.model';

import { STORAGE } from '@frameworks/config/Constants';
import { getItem, setItem } from '@frameworks/storage/Storage';
import { Observable } from 'rxjs';
import { DocumentType } from '@domain/enums/document-type.enum';
import { UserType } from '@domain/enums/user-type.enum';
import { AuthService } from '@application/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService extends UserDataGateway {

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

  stats(): Observable<Stat> {
    const options = this.buildConfig();
    return this.http.get<Response>(API.baseUrl + API.user.stats, options).pipe(
      map((response) => ({
        ...response.result,
        tribesBalance: JSON.parse(response.result.tribesBalance) || [],
      }))
    );
  }

  getUploads(page: string): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .get<Response>(API.baseUrl + API.user.getUploads.replace('{{page}}', page), options)
        .subscribe(
          (response: any) => {

            resolve(response.data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  downloadRejected(requestId: string): Promise<any> {
    const config = this.buildConfig();
    return new Promise<any>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.user.downloadRejected.replace('{{importId}}', requestId);
      this.http
        .get<any>(url, {
          headers: config.headers,
          responseType: 'blob' as 'json',
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  updateStats(data: Stat): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      const options = this.buildConfig();
      const requestData = {
        ...data,
        tribesBalance: JSON.stringify(data.tribesBalance),
      };
      this.http
        .post<Response>(API.baseUrl + API.user.stats, requestData, options)
        .subscribe(
          (response: Response) => {
            setItem(STORAGE.userStats, data);
            resolve(response);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  info(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const options = this.buildConfig();

      this.http.get<Response>(API.baseUrl + API.user.info, options).subscribe(
        (response: Response) => {
          const info: User = response.result;

          setItem(STORAGE.userInfo, response.result);
          resolve(info);
        },
        () => {
          reject(null);
        }
      );
    });
  }

  searchUsers(searchUserData: {
    page: string;
    document: string;
  }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .get<Response>(
          API.baseUrl +
          API.user.gets
            .replace('{{page}}', searchUserData.page)
            .replace(
              '{{partialDocument}}',
              searchUserData.document === '' ? '' : searchUserData.document
            ),
          options
        )
        .subscribe(
          (response: Response) => {
            const info: User = response.result;

            setItem(STORAGE.userInfo, response.result);
            resolve(info);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  searchStudents(searchUserData: {
    page: string;
    document: string;
  }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .get<Response>(
          API.baseUrl +
          API.user.getStudents
            .replace('{{page}}', searchUserData.page)
            .replace(
              '{{partialDocument}}',
              searchUserData.document === '' ? '' : searchUserData.document
            ),
          options
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  searchTeachers(searchUserData: {
    page: string;
    document: string;
  }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .get<Response>(
          API.baseUrl +
          API.user.getTeachers
            .replace('{{page}}', searchUserData.page)
            .replace(
              '{{partialDocument}}',
              searchUserData.document === '' ? '' : searchUserData.document
            ),
          options
        )
        .subscribe(
          (response: Response) => {

            resolve(response.result);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  searchTeacher(
    document: string
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .get<Response>(
          API.baseUrl +
          API.user.getTeacher
            .replace(
              '{{document}}', document
            ),
          options
        )
        .subscribe(
          (response: Response) => {

            resolve(response.result);
          },
          () => {
            reject(null);
          }
        );
    });
  }



  updateInfo(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .post<Response>(API.baseUrl + API.user.updateInfo, user, options)
        .subscribe(
          (response: Response) => {
            const info: User = response.result;
            resolve(info);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  enableUser(enableData: {
    document: string;
    documentType: DocumentType;
    enabled: boolean;
  }): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = this.buildConfig();

      this.http
        .put(API.baseUrl + API.user.enableUser, enableData, options)
        .subscribe(
          () => {
            resolve(true);
          },
          () => {
            reject(false);
          }
        );
    });
  }

  calculateStats(
    action: Action,
    challenge: Challenge,
    tribe: Tribe,
    currentStats: Stat,
    answerRecords: AnswerRecord[],
    score: number,
    totalQuestions: number
  ) {
    if (score < 0) {
      score = 0;
    }

    const balance: TribePoint[] = this.getBalance(
      !currentStats.tribesBalance || currentStats.tribesBalance.length === 0
        ? DEFAULT_TRIBE_BALANCE
        : currentStats.tribesBalance,
      tribe.id || 0,
      tribe.oppositeTribe || 0,
      tribe.adjacentTribe || 0,
      currentStats.currentCycle || 0
    );

    const analyticalTotems = this.getAnalyticalTotems(
      answerRecords.length,
      totalQuestions
    );
    const criticalTotems = this.getCriticalTotems(balance);

    const currentSpirits = currentStats.currentSpirits
      ? currentStats.currentSpirits - 1
      : 1;
    const currentCycle =
      currentSpirits < 1
        ? (currentStats.currentCycle || 0) + 1
        : currentStats.currentCycle || 0;

    const newStats: Stat = {
      ...currentStats,
      generalTotems: Math.max(0, currentStats.analyticalTotems),
      analyticalTotems: Math.max(
        0,
        Math.min(3, currentStats.analyticalTotems + analyticalTotems)
      ),
      criticalTotems: Math.max(
        0,
        Math.min(3, currentStats.criticalTotems + criticalTotems)
      ),
      tribesBalance: balance,
      currentCycle: currentCycle > 5 ? 1 : currentCycle,
      currentSpirits: currentSpirits < 1 ? 3 : currentSpirits,
      actionsPoints: [
        {
          actionId: action.id,
          tribeId: tribe.id,
          challengeId: challenge.id,
          score: score,
          answerRecords: answerRecords,
        },
      ],
    };

    delete newStats.tribesPoints;

    return newStats;
  }

  private getCriticalTotems = (balance: TribePoint[]) => {
    let highBalanceTribes = 0;

    balance.forEach((tribe: TribePoint) => {
      if (tribe.score === 3 || tribe.score === 7) {
        highBalanceTribes++;
      }
    });
    if (highBalanceTribes > 0 || highBalanceTribes <= 2) {
      return 1;
    }

    if (highBalanceTribes > 2 || highBalanceTribes <= 4) {
      return 2;
    }

    return 3;
  };

  private getAnalyticalTotems = (
    correctQuestions: number,
    totalQuestions: number
  ): number => {
    const percentage = (correctQuestions / totalQuestions) * 100;

    if (percentage <= 25) {
      return 0;
    }
    if (percentage > 25 || percentage <= 50) {
      return 1;
    }
    if (percentage > 50 || percentage <= 75) {
      return 2;
    }

    return 3;
  };

  private getBalance = (
    tribePoints: TribePoint[],
    currentTribeId: number,
    oppositeTribe: number,
    adjacentTribe: number,
    currentCycle: number
  ) => {
    const tribesPointsObject: any = {};

    tribePoints.forEach((tribePoint: TribePoint) => {
      tribesPointsObject[tribePoint.id] = tribePoint;
    });
    tribesPointsObject[currentTribeId].score =
      tribesPointsObject[currentTribeId].score + 2;
    tribesPointsObject[oppositeTribe].score =
      tribesPointsObject[oppositeTribe].score - 3;
    tribesPointsObject[adjacentTribe].score =
      tribesPointsObject[adjacentTribe].score + 1;

    const regentTribe = currentCycle;
    const creationTribe = currentCycle + 1 > 5 ? 1 : currentCycle + 1;
    const transformationTribe =
      currentCycle + 2 > 5 ? currentCycle + 2 - 5 : currentCycle + 2;

    tribesPointsObject[currentTribeId].score =
      tribesPointsObject[currentTribeId].score +
      (regentTribe === currentTribeId ? 2 : 0);

    tribesPointsObject[currentTribeId].score =
      tribesPointsObject[currentTribeId].score +
      (creationTribe === currentTribeId ? 1 : 0);
    tribesPointsObject[transformationTribe].score =
      tribesPointsObject[transformationTribe].score - 1;

    const totalTribePoints: TribePoint[] = Object.values<TribePoint>(
      tribesPointsObject
    ).map((tribe: TribePoint) => {
      return {
        ...tribe,
        score: tribe.score > 9 ? 9 : Math.max(0, tribe.score),
      };
    });

    return totalTribePoints;
  };

  isTeacherIn() {
    return getItem(STORAGE.userInfo).userType === 'Teacher';
  }

  isStudentIn() {
    return getItem(STORAGE.userInfo).userType === 'Student';
  }
  isAdminIn() {
    return getItem(STORAGE.userInfo).userType === 'Admin';
  }
  isMinIn() {
    return getItem(STORAGE.userInfo).userType === 'MinUser';
  }

  load(
    campusCodeDane: string,
    userType: string,
    form: FormData
  ): Promise<boolean> {
    const config = this.buildConfig();
    return new Promise<boolean>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.user.load
          .replace('{{userType}}', userType)
          .replace('{{campusCodeDane}}', campusCodeDane);
      this.http.post<Response>(url, form, config).subscribe(
        (response: Response) => {
          resolve(response.code ? response.code === 200 : false);
        },
        (err: any) => {
          reject(err.error);
        }
      );
    });
  }

  loadDirective(
    userType: UserType.Student | UserType.Teacher,
    form: FormData
  ): Promise<boolean> {
    const config = this.buildConfig();
    return new Promise<boolean>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.user.loadDirectivo
          .replace('{{userType}}', userType)
      this.http.post<Response>(url, form, config).subscribe(
        (response: Response) => {
          resolve(response.code ? response.code === 200 : false);
        },
        (err: any) => {
          reject(err.error);
        }
      );
    });
  }
}
