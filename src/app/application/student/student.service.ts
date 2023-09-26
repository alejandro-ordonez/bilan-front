import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@application/auth/auth.service";
import { StudenGateway } from "@domain/gateways";
import { ResponseDto } from "@domain/models";
import { StudentDto } from "@domain/models/student.model";
import { API } from "@frameworks/config/Constants";

@Injectable()
export class StudentService extends StudenGateway{


    constructor(private _httpClient: HttpClient, private _authService: AuthService){
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

    update(student: StudentDto): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._httpClient
              .put<ResponseDto<string>>(
                API.baseUrl + API.user.updateStudent,
                student,
                this.buildConfig()
              )
              .subscribe(
                (response) => {
                  resolve(response.description);
                },
                () => {
                  reject(null);
                }
              );
          });
    }

}