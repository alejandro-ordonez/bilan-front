import { Injectable } from "@angular/core";
import { StudenGateway } from "@domain/gateways";
import { StudentDto } from "@domain/models/student.model";

@Injectable({ providedIn: 'root'})
export class StudentUseCase{
    constructor(private _studentGateway: StudenGateway){}

    update = (student: StudentDto): Promise<string> => this._studentGateway.update(student);
}