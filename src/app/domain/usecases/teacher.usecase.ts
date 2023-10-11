import { Injectable } from "@angular/core";
import { TeacherDataGateway } from "@domain/gateways";
import { TeacherDto } from "@domain/models";

@Injectable({
    providedIn: 'root',
  })
export class TeacherUseCase{
    constructor(private _teacherGateway: TeacherDataGateway) {        
    }

    update = (teacher: TeacherDto): Promise<string> => this._teacherGateway.update(teacher);
}