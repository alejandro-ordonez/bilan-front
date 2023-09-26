import { TeacherDto } from "@domain/models/teacher.model";

export abstract class TeacherDataGateway{
    abstract update(teacher: TeacherDto): Promise<string>;
    abstract enroll(): Promise<string>;
    abstract classrooms(): void;
}