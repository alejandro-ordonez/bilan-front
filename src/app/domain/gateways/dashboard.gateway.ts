import {
  Classroom,
  College,
  CourseToEnroll,
  GradeCourseResponse,
  Statistics,
  StudentStatistics,
  Teacher,
} from '@domain/models/dashboard.model';

export abstract class DashboardGateway {
  abstract colleges(locationId: string): Promise<College[]>;
  abstract gradeCourses(collegeId: number): Promise<GradeCourseResponse[]>;
  abstract gradeCoursesDane(codDane: number): Promise<GradeCourseResponse[]>;
  abstract teacherEnroll(teacher: Teacher): Promise<boolean>;
  abstract classrooms(): Promise<CourseToEnroll[]>;
  abstract classroom(classroomId: number | string): Promise<Classroom>;
  abstract studentClassroom(): Promise<StudentStatistics>;
  abstract singleStudent(document: string): Promise<StudentStatistics>;
  abstract collegeStatistics(collegeId: string): Promise<Statistics>;
  abstract collegeDaneStatistics(codDane: string): Promise<Statistics>;
  abstract stateStatistics(state: string): Promise<Statistics>;
  abstract governmentStatistics(): Promise<Statistics>;
  abstract munStatistics(munId: number): Promise<any>;
  abstract courseStatistics(
    collegeId: string,
    grade: string,
    courseId: string
  ): Promise<Statistics>;
}
