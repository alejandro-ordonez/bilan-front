import { DocumentType } from '@domain/enums/document-type.enum';

export class College {
  id: number;
  name: string;
  campus: string;
  campusCode: string;
}

export class CourseId {
  id: number;
  name: string;
}

export class GradeCourseResponse {
  grade: string;
  courses: CourseId[];
}

export class CourseToEnroll {
  id?: number;
  grade: string;
  courseId: number;
  tribeId: number;
  collegeId: number;
  collegeName: string;
}

export class Teacher {
  document: string;
  documentType: DocumentType;
  coursesToEnroll: CourseToEnroll[];
}

export class StudentStatistics {
  id: string;
  name: string;
  timeInApp: number;
  percentage: number;

  data: TribeScores[];
}



export class Classroom {
  groupProgress: number;
  students: number;
  studentStatsRecords: StudentStatistics[];
}

export class GameModule {
  id: number;
  name: string;
  title?: string;
  logins: string;
  performanceActivityScore: number;
  points?: number;
  performanceGameScore: number;
}

export class TribeScores extends GameModule{
  preActivePhase: number;
  postActivePhase: number;
  interactivePhase: number;
  timeInApp: number;
}

export class RowSummary{
  id: string;
  name: string;
  logins: string;
  modules: GameModule[];
}

export class Statistics {
  students: number;
  percentage?: number;
  timeInApp: number;
  data: RowSummary[];
  totalForumAnswers?: number;
}