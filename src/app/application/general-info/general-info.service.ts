import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GeneralInfoGateway } from "@domain/gateways";
import { City } from "@domain/models/city.model";
import { API } from "@frameworks/config/Constants";
import { Response, ResponseDto } from "@domain/models/response.model";
import { College } from "@domain/models/dashboard.model";
import { Course } from "@domain/models/course.model";
import { AuthService } from "@application/auth/auth.service";
import { State } from "@domain/models";

@Injectable({ providedIn: 'root'})
export class GeneralInfoService extends GeneralInfoGateway{

    constructor(protected _httpClient: HttpClient, private _authService: AuthService) {
        super();
    }


    buildConfig() {
        const token = this._authService.getToken();
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return options;
      }

    getAllStates(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const options = this.buildConfig();
            this._httpClient
              .get<ResponseDto<string[]>>(API.baseUrl + API.generalInfo.allStates, options)
              .subscribe(
                (response: Response) => {
                  const data: string[] = response.result;
                  resolve(data);
                },
                () => {
                  reject(null);
                }
              );
          });
    }

    getStatesAndCities(): Promise<State[]> {
        return new Promise<State[]>((resolve, reject) => {
            const options = this.buildConfig();
            this._httpClient
              .get<ResponseDto<State[]>>(API.baseUrl + API.generalInfo.allStates, options)
              .subscribe(
                (response: Response) => {
                  const data: State[] = response.result;
                  resolve(data);
                },
                () => {
                  reject(null);
                }
              );
          });
    }

    getColleges(city: number): Promise<College[]> {
        return new Promise<College[]>((resolve, reject) => {
            const options = this.buildConfig();
            this._httpClient
              .get<ResponseDto<City[]>>(API.baseUrl + API.generalInfo.colleges.replace('{{locationId}}', city.toString()), options)
              .subscribe(
                (response: Response) => {
                  const data: College[] = response.result;
                  resolve(data);
                },
                () => {
                  reject(null);
                }
              );
          });
    }

    getCourses(): Promise<Course[]> {
      return new Promise<Course[]>((resolve, reject) => {
        const options = this.buildConfig();
        this._httpClient
        .get<ResponseDto<Course[]>>(API.baseUrl + API.generalInfo.courses, options)
        .subscribe(
          (response: Response) => {
            const data: Course[] = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
      })
    }
}