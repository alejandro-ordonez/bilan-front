import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Params } from '@angular/router';
import { Option } from '@ui/components/select/select.component';
import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { UserType } from '@domain/enums/user-type.enum';
import { getItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import {
  Classroom,
  CourseToEnroll,
  GradeCourseResponse,
  Statistic,
  StatisticGovernment,
} from '@domain/models/dashboard.model';

import depmun from '../login-page/dep-mun.json';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss'],
})
export class 
PanelControlComponent implements OnInit {
  states: Option[];
  municipalities: Option[];
  colleges: Option[];
  gradeCourses: GradeCourseResponse[];
  grades: Option[];
  courses: Option[];

  isDirectiveTeacher: boolean;

  selectedState: any = '';
  selectedMunicipality: any = '';
  selectedCollege: any = '';
  selectedGrade: any = '';
  selectedCourse: any = '';

  governmentStatistics: StatisticGovernment;
  statistics: Statistic;

  userType: UserType;
  classRooms: CourseToEnroll[];
  classroomOptions: Option[];

  buttonRouter: string = '/admin/panel-control/entidades-territoriales';

  type: string;

  diesA: number = 53;

  switchObject: any = {
    colegio: () => {
      this.getCollege();
    },
    'entidades-territoriales': () => {
      this.getAllStates();
    },
    departamento: () => {
      this.getState();
    },
    municipio: () => {
      this.getMun();
    },
    estudiante: () => {
      this.getStudent();
    },
    modulos: () => {
      this.getCollege();
    },
    grado: () => {
      this.getGrade();
    },
  };

  courseYear: string;
  courseSection: string;
  studentId: string;
  collegeName: string;
  courseId: string;
  stateId: string;
  munId: string;
  collegeId: string;
  collegeString: string;
  gradeString: string;
  courseString: string;

  college: any;
  grade: any;
  student: any;
  allStates: any;
  state: any;
  mun: any;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private dashboard: DashboardUseCase,
    private userData: UserDataUseCase
  ) {}

  ngOnInit(): void {
    this.userType = getItem(STORAGE.userInfo).userType;

    this.states = depmun.map<Option>((dep) => {
      return {
        key: dep.state,
        value: dep.state,
      };
    });
    this.route.params.subscribe((params: Params) => {
      this.type = params.type;
      this.courseYear = params.param1;
      this.courseSection = params.param2;

      this.courseId = params.param1;

      this.collegeName = params.param1;

      this.studentId = params.param6;

      this.stateId = params.param1;
      this.munId = params.param2;
      this.collegeId = params.param1;
      this.collegeString = params.param3;
      this.gradeString = params.param2;
      this.courseString = params.param1;
      this.switchObject[this.type]();
      this.setMenu();
    });

    if (this.userType === 'Teacher') {
      this.buttonRouter = '/admin/panel-control/grado';
      this.getClassrooms();
    }

    this.typeIsDirective();
  }

  async typeIsDirective() {
    this.isDirectiveTeacher =
      (await (await this.userData.info()).userType) === 'DirectiveTeacher';
  }

  onClassroomChange(event: any) {}

  async getClassrooms() {
    this.classRooms = await this.dashboard.getClassrooms();

    const obColleges: any = new Object();
    this.classRooms.forEach((cls: CourseToEnroll) => {
      obColleges[cls.collegeId.toString()] = cls;
    });
    this.colleges = Object.values(obColleges).map((ob: any) => {
      return {
        value: ob.collegeName,
        key: ob.collegeId,
      };
    });
  }

  setDepartmentMunicipality(option?: any) {
    this.selectedMunicipality = '';
    this.selectedCollege = '';
    this.selectedGrade = '';
    this.selectedCourse = '';
    this.colleges = [];
    this.grades = [];
    this.courses = [];

    this.municipalities =
      depmun
        .find((dep) => dep.state === this.selectedState)
        ?.municipalities.map((mun) => {
          return {
            value: mun.name,
            key: mun.id,
          };
        }) || [];

  }
  async setColleges(option?: any) {
    this.selectedCollege = '';
    this.selectedGrade = '';
    this.selectedCourse = '';
    this.grades = [];
    this.courses = [];
    const response = await this.dashboard.getColleges(
      this.selectedMunicipality
    );
    this.colleges = response.map((col) => {
      return {
        key: col.id,
        value: `${col.name} - Sede: ${col.campus}`,
      };
    });
  }

  async setGrades(option?: any) {
    this.selectedGrade = '';
    this.selectedCourse = '';
    this.courses = [];
    const response = await this.dashboard.getGradeCourses(this.selectedCollege);
    this.gradeCourses = response;
    this.grades = this.gradeCourses.map((gc) => {
      return {
        key: gc.grade,
        value: gc.grade,
      };
    });
  }

  setCourses(option?: any) {
    this.selectedCourse = '';
    const grade = this.gradeCourses.find(
      (gd) => gd.grade === this.selectedGrade
    );
    this.courses = !grade
      ? []
      : grade.courses.map((c) => {
          return {
            key: c.id,
            value: c.name,
          };
        }) || [];
  }

  async getStatistics(type: string) {
    if (type === 'government') {
      const response = await this.dashboard.getGovernmentStatistics();
      this.governmentStatistics = response;
      return;
    }
    if (type === 'state') {
      const response = await this.dashboard.getStateStatistics(
        this.selectedState
      );
      this.governmentStatistics = response;
      return;
    }
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  async getCollege() {
    this.college = await this.dashboard.getCollegeStatistics(this.collegeId);
  }

  async getStudent() {
    this.student = this.dashboard.getSingleStudent(this.studentId);
  }

  async getGrade() {
    this.grade = await this.dashboard.getCourseStatistics(
      this.gradeString,
      this.collegeString,
      this.courseString
    );

  }

  async getAllStates() {
    this.allStates = await this.dashboard.getGovernmentStatistics();
  }

  async getState() {
    this.state = await this.dashboard.getStateStatistics(this.stateId);
  }

  async getMun() {
    this.mun = await this.dashboard.getMunStatistics(this.munId);
  }

  burgerButtonIsActive: boolean = false;

  hideShow() {
    this.burgerButtonIsActive = !this.burgerButtonIsActive;
  }
  async testingEndpoints() {

    let colleges = await this.dashboard.getColleges('5');

    let classroom = await this.dashboard.getClassroom(1);

    let studentScore = await this.dashboard.getStudentScore();

    let classrooms = await this.dashboard.getClassrooms();

    let singleStudent = await this.dashboard.getSingleStudent('1020345660');
  }

  async getCollegesMenu(municipality: any) {
    municipality.colleges = await this.dashboard.getColleges(municipality.id);
  }

  setButton() {
    if (
      this.selectedState &&
      this.selectedMunicipality &&
      this.selectedCollege &&
      this.selectedGrade &&
      this.selectedCourse
    ) {
      this.buttonRouter = `/admin/panel-control/grado/${this.selectedState}/${this.selectedMunicipality}/${this.selectedCollege}/${this.selectedGrade}/${this.selectedCourse}`;
    } else if (
      this.selectedState &&
      this.selectedMunicipality &&
      this.selectedCollege &&
      this.selectedGrade
    ) {
      this.buttonRouter = `/admin/panel-control/no disponible`;

    } else if (
      this.selectedState &&
      this.selectedMunicipality &&
      this.selectedCollege
    ) {
      this.buttonRouter = `/admin/panel-control/colegio/${this.selectedState}/${this.selectedMunicipality}/${this.selectedCollege}`;
    } else if (this.selectedState && this.selectedMunicipality) {
      this.buttonRouter = `/admin/panel-control/municipio/${this.selectedState}/${this.selectedMunicipality}`;
    } else if (this.selectedState) {
      this.buttonRouter = `/admin/panel-control/departamento/${this.selectedState}`;
    } else {
      this.buttonRouter = '/admin/panel-control/entidades-territoriales';
    }
  }

  async setMenu() {
    switch (this.type) {
      case 'departamento':
        this.selectedState = this.stateId;
        this.setDepartmentMunicipality();
        break;

      case 'municipio':
        this.selectedState = this.stateId;
        this.setDepartmentMunicipality();
        this.selectedMunicipality = this.munId;
        await this.setColleges();
        break;

      case 'colegio':
        this.selectedState = this.stateId;
        this.setDepartmentMunicipality();
        this.selectedMunicipality = this.munId;
        await this.setColleges();
        this.selectedCollege = this.collegeId;
        this.setGrades();
        break;

      case 'grado':
        this.selectedState = this.stateId;
        this.setDepartmentMunicipality();
        this.selectedMunicipality = this.munId;
        await this.setColleges();
        this.selectedCollege = this.collegeId;
        await this.setGrades();
        this.selectedGrade = this.gradeString;
        this.setCourses();
        this.selectedCourse = this.courseString;
        break;

      case 'estudiante':
        this.selectedState = this.stateId;
        this.setDepartmentMunicipality();
        this.selectedMunicipality = this.munId;
        await this.setColleges();
        this.selectedCollege = this.collegeId;
        await this.setGrades();
        this.selectedGrade = this.gradeString;
        await this.setCourses();
        this.selectedCourse = this.courseString;
        break;

      default:
        break;
    }

    this.setButton();
  }
}
