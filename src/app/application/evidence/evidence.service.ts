import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response } from '@domain/models/response.model';
import { API } from '@frameworks/config/Constants';
import { EvidenceGateway } from '@domain/gateways/evidence.gateway';
import { Evaluate, Evidence, Phase } from '@domain/models/evidence.model';
import { UserGateway } from '@domain/gateways/user.gateway';
import { AuthService } from '@application/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EvidenceService extends EvidenceGateway {
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

  evidences(
    grade: string,
    tribeId: number,
    courseId: number,
    phase: Phase
  ): Promise<Evidence[]> {
    const config = this.buildConfig();
    return new Promise<Evidence[]>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.evidence.getAll
          .replace('{{grade}}', grade)
          .replace('{{tribeId}}', tribeId.toString())
          .replace('{{courseId}}', courseId.toString())
          .replace('{{phase}}', phase);
      this.http.get<Response>(url, config).subscribe(
        (response: Response) => {
          resolve(response.result);
        },
        (err: any) => {
          reject(err.error);
        }
      );
    });
  }

  download(evidenceId: string): Promise<any> {
    const config = this.buildConfig();
    return new Promise<any>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.evidence.download.replace('{{evidenceId}}', evidenceId);
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

  evaluate(evaluateData: Evaluate): Promise<boolean> {
    const config = this.buildConfig();
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post<Response>(
          API.baseUrl + API.evidence.evaluate,
          evaluateData,
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.code ? response.code === 200 : false);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  upload(phase: Phase, tribeId: number, form: FormData): Promise<boolean> {
    const config = this.buildConfig();
    return new Promise<boolean>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.evidence.upload
          .replace('{{phase}}', phase)
          .replace('{{tribeId}}', tribeId.toString());
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

  checkIfAlreadySubmitted(phase: Phase, tribeId: number): Promise<boolean> {
    const config = this.buildConfig();

    return new Promise<boolean>((resolve, reject) => {
      const url =
        API.baseUrl +
        API.evidence.checkAlreadySubmitted
          .replace('{{phase}}', phase)
          .replace('{{tribeId}}', tribeId.toString());
      this.http.get<Response>(url, config).subscribe(
        (response: Response) => {
          resolve(response.result);
        },
        (err: any) => {
          reject(err.error);
        }
      );
    });
  }
}
