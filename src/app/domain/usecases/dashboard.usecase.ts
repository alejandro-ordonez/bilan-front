import { Injectable } from '@angular/core';
import { DashboardGateway } from '@domain/gateways/dashboard.gateway';
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
@Injectable({
  providedIn: 'root',
})
export class DashboardUseCase {
  constructor(private dashboardGateway: DashboardGateway) {}

  getColleges(locationId: string): Promise<College[]> {
    return this.dashboardGateway.colleges(locationId);
  }

  enrollTeacher(teacher: Teacher): Promise<boolean> {
    return this.dashboardGateway.teacherEnroll(teacher);
  }

  getClassrooms(): Promise<CourseToEnroll[]> {
    return this.dashboardGateway.classrooms();
  }

  getClassroom(classroomId: string | number): Promise<Classroom> {
    return this.dashboardGateway.classroom(classroomId);
  }

  getGradeCoursesByDane(codDane: number): Promise<GradeCourseResponse[]> {
    return this.dashboardGateway.gradeCoursesDane(codDane);
  }

  getGradeCourses(collegeId: number): Promise<GradeCourseResponse[]> {
    return this.dashboardGateway.gradeCourses(collegeId);
  }

  getStudentScore(): Promise<StudentScore> {
    return this.dashboardGateway.studentClassroom();
  }

  getSingleStudent(document: string): Promise<any> {
    return this.dashboardGateway.singleStudent(document);
  }

  getCollegeStatistics(collegeId: string): Promise<Statistic> {
    return this.dashboardGateway.collegeStatistics(collegeId);
  }

  getCollegeDaneStatistics(codDane: string): Promise<Statistic> {
    return this.dashboardGateway.collegeDaneStatistics(codDane);
  }

  getGovernmentStatistics(): Promise<StatisticGovernment> {
    return this.dashboardGateway.governmentStatistics();
  }

  getStateStatistics(state: string): Promise<StatisticGovernment> {
    return this.dashboardGateway.stateStatistics(state);
  }

  getMunStatistics(munId: string): Promise<any> {
    return this.dashboardGateway.munStatistics(munId);
  }

  getCourseStatistics(
    grade: string,
    collegeId: string,
    courseId: string
  ): Promise<any> {
    return this.dashboardGateway.courseStatistics(grade, collegeId, courseId);
  }
}
