import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserGateway } from "@domain/gateways/user.gateway";
import { GeneralInfoGateway } from "@domain/gateways";
import { City } from "@domain/models/city.model";
import { API } from "@frameworks/config/Constants";
import { Response, ResponseDto } from "@domain/models/response.model";
import { College } from "@domain/models/dashboard.model";
import { Course } from "@domain/models/course.model";

@Injectable({ providedIn: 'root'})
export class GeneralInfoService extends GeneralInfoGateway{

    constructor(protected _httpClient: HttpClient, private _authService: UserGateway) {
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

    getCitiesByState(state: string): Promise<City[]> {
        return new Promise<City[]>((resolve, reject) => {
            const options = this.buildConfig();
            this._httpClient
              .get<ResponseDto<City[]>>(API.baseUrl + API.generalInfo.cities.replace('{{state}}', state), options)
              .subscribe(
                (response: Response) => {
                  const data: City[] = response.result;
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