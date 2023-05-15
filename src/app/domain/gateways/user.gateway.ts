import { Auth } from '@domain/models/auth.model';
import { Response } from '@domain/models/response.model';
import { StudentDto } from '@domain/models/student.model';
import { TeacherDto } from '@domain/models/teacher.model';
import { User } from '@domain/models/user.model';

export abstract class UserGateway {
  abstract validate(auth: Auth): Promise<Response>;
  abstract update(auth: Auth): Promise<Response>;
  abstract create(user: User): Promise<Response>;
  abstract updateUsers(user: User): Promise<Response>;
  abstract updateTeacher(teacher: TeacherDto): Promise<Response>;
  abstract updateStudent(student: StudentDto): Promise<Response>;
  abstract login(auth: Auth): Promise<boolean>;
  abstract getToken(): string;
  abstract isLoggedIn(): boolean;
}
