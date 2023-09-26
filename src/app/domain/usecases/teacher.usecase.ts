import { TeacherDataGateway } from "@domain/gateways";
import { TeacherDto } from "@domain/models";

export class TeacherUseCase{

    constructor(private _teacherGateway: TeacherDataGateway) {        
    }

    update = (teacher: TeacherDto): Promise<string> => this._teacherGateway.update(teacher);
}