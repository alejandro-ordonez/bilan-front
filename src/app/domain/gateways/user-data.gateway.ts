import { AnswerRecord, Stat } from '@domain/models/stat.model';
import { User } from '@domain/models/user.model';
import { Response } from '@domain/models/response.model';
import { Action, Challenge, Tribe } from '@domain/models/game.model';
import { Observable } from 'rxjs';
import { DocumentType } from '@domain/enums/document-type.enum';

export abstract class UserDataGateway {
  abstract stats(): Observable<Stat>;
  abstract updateStats(data: Stat): Promise<Response>;
  abstract info(): Promise<User>;
  abstract updateInfo(user: User): Promise<User>;

  abstract searchUsers(searchUserData: {
    page: string;
    document: string;
  }): Promise<User>;

  abstract searchTeachers(searchUserData: {
    page: string;
    document: string;
  }): Promise<User>;

  abstract searchTeacher(document: string): Promise<User>;

  abstract searchStudents(searchUserData: {
    page: string;
    document: string;
  }): Promise<User>;

  abstract enableUser(user: {
    document: string;
    documentType: DocumentType;
    enabled: boolean;
  }): Promise<boolean>;

  abstract load(
    campusCodeDane: string,
    userType: string | undefined,
    form: FormData
  ): Promise<boolean>;

  abstract getUploads(page: string): Promise<any>

  abstract loadDirective(
    userType: string | undefined,
    form: FormData
  ): Promise<boolean>;

  abstract calculateStats(
    action: Action,
    challenge: Challenge,
    tribe: Tribe,
    currentStats: Stat,
    answerRecords: AnswerRecord[],
    score: number,
    totalQuestions: number
  ): Stat;

  abstract isTeacherIn(): any;
  abstract isStudentIn(): any;
  abstract isAdminIn(): any;
  abstract isMinIn(): any;
}
