import { ClassRoom } from './classroom.model';
import { User } from './user.model';

export class TeacherDto extends User {
  codDaneMinResidencia: string;
  codDane: string;
  codDaneSede: string;
  classRoomDtoList: ClassRoom[];
}
