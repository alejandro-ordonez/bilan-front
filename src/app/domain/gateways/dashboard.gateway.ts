import {
  Classroom,
  College,
  CourseToEnroll,
  GradeCourseResponse,
  Statistic,
  StatisticGovernment,
  StudentScore,
  Teacher,
} from '@domain/models/dashboard.model';

export abstract class DashboardGateway {
  abstract colleges(locationId: string): Promise<College[]>;
  abstract gradeCourses(collegeId: number): Promise<GradeCourseResponse[]>;
  abstract gradeCoursesDane(codDane: number): Promise<GradeCourseResponse[]>;
  abstract teacherEnroll(teacher: Teacher): Promise<boolean>;
  abstract classrooms(): Promise<CourseToEnroll[]>;
  abstract classroom(classroomId: number | string): Promise<Classroom>;
  abstract studentClassroom(): Promise<StudentScore>;
  abstract singleStudent(document: string): Promise<StudentScore>;
  abstract collegeStatistics(collegeId: string): Promise<Statistic>;
  abstract collegeDaneStatistics(codDane: string): Promise<Statistic>;
  abstract stateStatistics(state: string): Promise<StatisticGovernment>;
  abstract governmentStatistics(): Promise<StatisticGovernment>;
  abstract munStatistics(munId: string): Promise<any>;
  abstract courseStatistics(
    grade: string,
    collegeId: string,
    courseId: string
  ): Promise<any>;
}
