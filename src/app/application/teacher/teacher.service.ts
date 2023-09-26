import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@application/auth/auth.service";
import { TeacherDataGateway } from "@domain/gateways";
import { ResponseDto, TeacherDto } from "@domain/models";
import { API } from "@frameworks/config/Constants";

@Injectable({ providedIn: 'root' })
export class TeacherService extends TeacherDataGateway {

    constructor(private _httpClient: HttpClient, private _authService: AuthService) {
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


    update(teacher: TeacherDto): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._httpClient
                .put<ResponseDto<string>>(
                    API.baseUrl + API.user.updateTeacher,
                    teacher,
                    this.buildConfig()
                )
                .subscribe(
                    (response: ResponseDto<string>) => {
                        resolve(response.description);
                    },
                    () => {
                        reject(null);
                    }
                );
        });
    }

    enroll(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    classrooms(): void {
        throw new Error("Method not implemented.");
    }

}