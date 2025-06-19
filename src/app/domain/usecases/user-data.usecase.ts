import { Injectable } from '@angular/core';
import { UserDataGateway } from '@domain/gateways/user-data.gateway';
import { AnswerRecord, Stat } from '@domain/models/stat.model';
import { User } from '@domain/models/user.model';
import { Response } from '@domain/models/response.model';
import { Action, Challenge, Tribe } from '@domain/models/game.model';
import { Observable } from 'rxjs';
import { DocumentType } from '@domain/enums/document-type.enum';
import { UploadModel } from '@domain/models/upload.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataUseCase {
  constructor(private userDataGateway: UserDataGateway) { }

  stats(): Observable<Stat> {
    return this.userDataGateway.stats();
  }
  updateStats(data: Stat): Promise<Response> {
    return this.userDataGateway.updateStats(data);
  }

  updateInfo(user: User): Promise<User> {
    return this.userDataGateway.updateInfo(user);
  }
  info(): Promise<User> {
    return this.userDataGateway.info();
  }
  searchUsers(searchUserData: {
    page: string;
    document: string;
  }): Promise<any> {
    return this.userDataGateway.searchUsers(searchUserData);
  }

  searchStudents(searchUserData: {
    page: string;
    document: string;
  }): Promise<any> {
    return this.userDataGateway.searchStudents(searchUserData);
  }

  searchTeachers(searchUserData: {
    page: string;
    document: string;
  }): Promise<any> {
    return this.userDataGateway.searchTeachers(searchUserData);
  }

  searchTeacher(
    document: string
  ): Promise<any> {
    return this.userDataGateway.searchTeacher(document);
  }

  enableUser(enableData: {
    document: string;
    documentType: DocumentType;
    enabled: boolean;
  }): Promise<boolean> {
    return this.userDataGateway.enableUser(enableData);
  }
  load(
    campusCodeDane: string,
    userType: string | undefined = '',
    form: FormData
  ): Promise<boolean> {
    return this.userDataGateway.load(campusCodeDane, userType, form);
  }

  loadDirectivo(
    userType: string | undefined = '',
    form: FormData
  ): Promise<boolean> {
    return this.userDataGateway.loadDirective(userType, form);
  }

  getUploads(page: string): Promise<any> {
    return this.userDataGateway.getUploads(page)
  }

  calculateStats(
    action: Action,
    challenge: Challenge,
    tribe: Tribe,
    currentStats: Stat,
    answerRecords: AnswerRecord[],
    score: number,
    totalQuestions: number
  ): Stat {
    return this.userDataGateway.calculateStats(
      action,
      challenge,
      tribe,
      currentStats,
      answerRecords,
      score,
      totalQuestions
    );
  }

  isTeacherIn() {
    return this.userDataGateway.isTeacherIn();
  }

  isStudentIn() {
    return this.userDataGateway.isStudentIn();
  }
  isAdminIn() {
    return this.userDataGateway.isAdminIn();
  }
  isMinIn() {
    return this.userDataGateway.isMinIn();
  }
}
