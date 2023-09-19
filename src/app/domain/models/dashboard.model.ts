import { DocumentType } from '@domain/enums/document-type.enum';

export class College {
  id: number;
  name: string;
  campus: string;
  campusCode: string;
}

export class Course {
  id: number;
  name: string;
}

export class GradeCourseResponse {
  grade: string;
  courses: Course[];
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

export class StudentScore {
  document: string;
  name: string;
  lastName: string;
  timeInPlatformPerWeek: number;
  activityScore: any;
  gameScore: any;
  timeInApp: number;
  progressActivities: number;
}

export class Classroom {
  groupProgress: number;
  students: number;
  studentStatsRecords: StudentScore[];
}

export class GameModule {
  id: number;
  name: string;
  logins: string;
  performanceActivityScore: number;
  points?: number;
  performanceGameScore: number;
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