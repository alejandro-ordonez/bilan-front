import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Response } from '@domain/models/response.model';
import { API } from '@frameworks/config/Constants';
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
import { UserGateway } from '@domain/gateways/user.gateway';
import { AuthService } from '@application/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends DashboardGateway {
  constructor(private http: HttpClient, private userAuth: AuthService) {
    super();
  }
  buildConfig() {
    const token = this.userAuth.getToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return options;
  }

  colleges(locationId: string): Promise<College[]> {
    const config = this.buildConfig();
    return new Promise<College[]>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.colleges.replace('{{locationId}}', locationId),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  gradeCourses(collegeId: number): Promise<GradeCourseResponse[]> {
    const config = this.buildConfig();

    return new Promise<GradeCourseResponse[]>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.gradesCourses.replace(
              '{{collegeId}}',
              collegeId.toString()
            ),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  gradeCoursesDane(codDane: number): Promise<GradeCourseResponse[]> {
    const config = this.buildConfig();

    return new Promise<GradeCourseResponse[]>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.gradesCoursesDane.replace(
              '{{codDane}}',
              codDane.toString()
            ),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }


  classrooms(): Promise<CourseToEnroll[]> {
    const config = this.buildConfig();
    return new Promise<CourseToEnroll[]>((resolve, reject) => {
      this.http
        .get<Response>(API.baseUrl + API.dashboard.classRooms, config)
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  classroom(classroomId: string | number): Promise<Classroom> {
    const config = this.buildConfig();
    return new Promise<Classroom>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.classRoom.replace(
              '{{classroomId}}',
              classroomId.toString()
            ),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  teacherEnroll(teacher: Teacher): Promise<boolean> {
    const config = this.buildConfig();
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post<Response>(
          API.baseUrl + API.dashboard.enrollTeacher,
          teacher,
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.code ? response.code === 200 : false);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  studentClassroom(): Promise<StudentStatistics> {
    const config = this.buildConfig();

    return new Promise<StudentStatistics>((resolve, reject) => {
      this.http
        .get<Response>(API.baseUrl + API.dashboard.studentDashboard, config)
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  singleStudent(document: string): Promise<StudentStatistics> {
    const config = this.buildConfig();

    return new Promise<StudentStatistics>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.studentDashboardSingle.replace(
              '{{studentDocument}}',
              document
            ),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  collegeStatistics(collegeId: string): Promise<Statistics> {
    const config = this.buildConfig();

    return new Promise<Statistics>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.collegeStatistics.replace('{{collegeId}}', collegeId),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  collegeDaneStatistics(codDane: string): Promise<Statistics> {
    const config = this.buildConfig();

    return new Promise<Statistics>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.collegeDaneStatistics.replace('{{codDane}}', codDane),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  governmentStatistics(): Promise<Statistics> {
    const config = this.buildConfig();

    return new Promise<Statistics>((resolve, reject) => {
      this.http
        .get<Response>(API.baseUrl + API.dashboard.governmentStatistics, config)
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  stateStatistics(state: string): Promise<Statistics> {
    const config = this.buildConfig();

    return new Promise<Statistics>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.stateStatistics.replace('{{state}}', state),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  munStatistics(munId: number): Promise<any> {
    const config = this.buildConfig();

    return new Promise<any>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl + API.dashboard.munStatistics.replace('{{munId}}', munId.toString()),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  courseStatistics(
    collegeId: string,
    grade: string,
    courseId: string
  ): Promise<Statistics> {
    const config = this.buildConfig();

    return new Promise<any>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.dashboard.courseStatistics
              .replace('{{collegeId}}', collegeId)
              .replace('{{grade}}', grade)
              .replace('{{courseId}}', courseId),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }
}
