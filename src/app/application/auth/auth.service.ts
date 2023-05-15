import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response } from '@domain/models/response.model';
import { User } from '@domain/models/user.model';
import { UserGateway } from '@domain/gateways/user.gateway';
import { Auth } from '@domain/models/auth.model';
import { API, STORAGE } from '@frameworks/config/Constants';
import { getItem, setItem } from '@frameworks/storage/Storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TeacherDto } from '@domain/models/teacher.model';
import { StudentDto } from '@domain/models/student.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends UserGateway {
  constructor(private http: HttpClient) {
    super();
  }

  buildConfig() {
    const token = this.getToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return options;
  }

  validate(auth: Auth): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http.post<Response>(API.baseUrl + API.auth.validate, auth).subscribe(
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
      this.http.post<Response>(API.baseUrl + API.auth.update, auth).subscribe(
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
      this.http.post<Response>(API.baseUrl + API.auth.create, user).subscribe(
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
      this.http
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
      this.http.post<Response>(API.baseUrl + API.auth.login, auth).subscribe(
        (response: Response) => {
          setItem(STORAGE.auth, response.result);
          resolve(true);
        },
        () => {
          reject(false);
        }
      );
    });
  }

  updateTeacher(teacher: TeacherDto): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http
        .put<Response>(
          API.baseUrl + API.user.updateTeacher,
          teacher,
          this.buildConfig()
        )
        .subscribe(
          (response: Response) => {
            resolve(response);
          },
          () => {
            reject(null);
          }
        );
    });
  }
  updateStudent(student: StudentDto): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.http
        .put<Response>(
          API.baseUrl + API.user.updateStudent,
          student,
          this.buildConfig()
        )
        .subscribe(
          (response: Response) => {
            resolve(response);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  getToken() {
    return getItem(STORAGE.auth);
  }

  isLoggedIn() {
    const token = this.getToken();
    const helper = new JwtHelperService();
    const isLogged = !helper.isTokenExpired(token);
    return isLogged;
  }
}
