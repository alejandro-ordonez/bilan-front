import { StudentDto } from "@domain/models/student.model";

export abstract class StudenGateway{

    abstract update(student: StudentDto): Promise<string>;
}