import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@application/auth/auth.service";
import { UserGateway } from "@domain/gateways/user.gateway";
import { Response, TeacherDto } from "@domain/models";
import { Auth } from "@domain/models/auth.model";
import { StudentDto } from "@domain/models/student.model";
import { User } from "@domain/models/user.model";
import { API, STORAGE } from "@frameworks/config/Constants";
import { setItem } from "@frameworks/storage/Storage";
import { UserDataService } from "./user-data.service";


@Injectable({providedIn: 'root'})
export class UserService extends UserGateway {


    constructor(private _httpClient: HttpClient, 
        private _userData: UserDataService,
        private _authService: AuthService) {
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


    validate(auth: Auth): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this._httpClient.post<Response>(API.baseUrl + API.auth.validate, auth).subscribe(
                (response: Response) => {
                    resolve(response);
                },
                (err: any) => {
                    reject(err.error);
                }
            );
        });
    }

    update(auth: Auth): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this._httpClient.post<Response>(API.baseUrl + API.auth.update, auth).subscribe(
                (response: Response) => {
                    resolve(response);
                },
                (err: any) => {
                    reject(err.error);
                }
            );
        });
    }

    create(user: User): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this._httpClient.post<Response>(API.baseUrl + API.auth.create, user).subscribe(
                (response: Response) => {
                    resolve(response);
                },
                (err: any) => {
                    reject(err.error);
                }
            );
        });
    }

    updateUsers(user: User): Promise<Response> {
        const config = this.buildConfig();
        return new Promise<Response>((resolve, reject) => {
            this._httpClient
                .post<Response>(API.baseUrl + API.auth.updateUsers, user, config)
                .subscribe(
                    (response: Response) => {
                        resolve(response);
                    },
                    (err: any) => {
                        reject(err.error);
                    }
                );
        });
    }

    login(auth: Auth): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._httpClient.post<Response>(API.baseUrl + API.auth.login, auth).subscribe(
                async (response: Response) => {
                    setItem(STORAGE.auth, response.result);
                    const user = await this._userData.info();
                    this._authService.user = user;
                    resolve(true);
                },
                () => {
                    reject(false);
                }
            );
        });
    }
}