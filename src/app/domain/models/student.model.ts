import { User } from './user.model';

export class StudentDto extends User {
  grade: string;
  course: string;
}
