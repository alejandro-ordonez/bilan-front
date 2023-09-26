import { Injectable } from '@angular/core';
import { DashboardGateway } from '@domain/gateways/dashboard.gateway';
import {
  Classroom,
  College,
  CourseToEnroll,
  GradeCourseResponse,
  Statistics,
  StudentStatistics,
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

  getStudentScore(): Promise<StudentStatistics> {
    return this.dashboardGateway.studentClassroom();
  }

  getSingleStudent(document: string): Promise<any> {
    return this.dashboardGateway.singleStudent(document);
  }

  getCollegeStatistics(collegeId: string): Promise<Statistics> {
    return this.dashboardGateway.collegeStatistics(collegeId);
  }

  getCollegeDaneStatistics(codDane: string): Promise<Statistics> {
    return this.dashboardGateway.collegeDaneStatistics(codDane);
  }

  getGovernmentStatistics(): Promise<Statistics> {
    return this.dashboardGateway.governmentStatistics();
  }

  getStateStatistics(state: string): Promise<Statistics> {
    return this.dashboardGateway.stateStatistics(state);
  }

  getMunStatistics(munId: number): Promise<any> {
    return this.dashboardGateway.munStatistics(munId);
  }

  getCourseStatistics(
    collegeId: string,
    grade: string,
    courseId: string
  ): Promise<Statistics> {
    return this.dashboardGateway.courseStatistics(collegeId, grade, courseId);
  }
}
