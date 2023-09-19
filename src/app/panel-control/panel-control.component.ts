import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Params, Router } from '@angular/router';
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
  Statistics,
} from '@domain/models/dashboard.model';

import depmun from '../login-page/dep-mun.json';
import { GeneralInfoUseCase } from '@domain/usecases/general-info.usecase';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export enum DashboardToDisplay{
  GovermentStatistics = 0,
  StateStatistics = 8,
  CityStatistics = 12,
  CollegeStatistics = 14,
  CourseStatistics = 15
}


@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss'],
})
export class 
PanelControlComponent implements OnInit {

  //TODO: Add a NoneSelected option to all the options


  // Options to filter
  states: Option[];
  municipalities: Option[];
  colleges: Option[];
  grades: Option[];
  courses: Option[];

  // DashboardLoaded
  dashboardSelected: DashboardToDisplay = DashboardToDisplay.GovermentStatistics;
  dashboardCases: typeof DashboardToDisplay = DashboardToDisplay;
  
  // Statistics
  statistics: Statistics;

  gradeCourses: GradeCourseResponse[];
  isDirectiveTeacher: boolean;

  selectedState: any = '';
  selectedMunicipality: any = '';
  selectedCollege: any = '';
  selectedGrade: any = '';
  selectedCourse: any = '';  

  userType: UserType;
  classRooms: CourseToEnroll[];
  classroomOptions: Option[];

  buttonRouter: string = '/admin/panel-control/entidades-territoriales';

  type: string;

  diesA: number = 53;

  filterForm: FormGroup;

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
  cities: Option[];
  mun: any;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private dashboard: DashboardUseCase,
    private userData: UserDataUseCase,
    private generalInfo: GeneralInfoUseCase,
    private fb: FormBuilder
  ) {

    this.filterForm = this.fb.group({
      state: ['', Validators.required],
      city: [''],
      college: [''],
      course: ['']
    });
  }

  async ngOnInit(): Promise<void> {
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
      this.collegeId = '218150000578';
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


    this.getStateControl()?.valueChanges.subscribe(async(option: Option) => {
      this.cities = await this.getCitiesOption(option.value);
    });

    this.getCityControl()?.valueChanges.subscribe(async(option: Option) => {
      this.colleges = await this.getCollegesOption(option.key as number);
    });

    this.courses = await this.getCoursesOption();
  }


  isStateSet(): boolean{
    const value = this.getStateControl()?.value;
    return value && value !== null && value != '';
  }

  isCitySet(): boolean{
    const value = this.getCityControl()?.value;
    return value && value !== null && value != '';
  }

  isCollegeSet(): boolean{
    const value = this.getCollegeControl()?.value;
    return value && value !=null && value != '';
  }

  isCourseSet(): boolean{
    const value = this.getCourseControl()?.value;
    return value && value !=null && value != '';
  }

  getStateControl(): AbstractControl | null{
    return this.filterForm.get('state');
  }

  getCityControl(): AbstractControl | null{
    return this.filterForm.get('city');
  }

  getCollegeControl(): AbstractControl | null{
    return this.filterForm.get('college');
  }

  getCourseControl(): AbstractControl | null{
    return this.filterForm.get('course');
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

  async setDepartmentMunicipality(option?: Option) {
    this.selectedMunicipality = '';
    this.selectedCollege = '';
    this.selectedGrade = '';
    this.selectedCourse = '';
    this.colleges = [];
    this.grades = [];
    this.courses = [];
    this.selectedState = option?.value;

    this.cities = await this.getCitiesOption(this.selectedState);

  }
  async setColleges(option?: any) {
    this.selectedCollege = '';
    this.selectedGrade = '';
    this.selectedCourse = '';
    this.grades = [];
    this.courses = [];
    const response = await this.dashboard.getColleges(
      this.selectedMunicipality.slice(3)
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
    const response = await this.dashboard.getGradeCourses(this.selectedCollege.slice(3));
    this.gradeCourses = response;
    this.grades = this.gradeCourses.map((gc) => {
      return {
        key: gc.grade,
        value: gc.grade,
      };
    });
    
    this.grades.unshift({key: '0', value: 'Seleccion'})
  }

  setCourses(option?: any) {
    this.selectedCourse = '';
    const grade = this.gradeCourses.find(
      (gd) => gd.grade === this.selectedGrade.slice(3)
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
      this.gradeString.slice(3),
      this.collegeString.slice(3),
      this.gradeString.slice(3)
    );
  }

  async getAllStates() {
    this.allStates = await this.generalInfo.getStates();
  }

  async getState() {
    this.state = await this.dashboard.getStateStatistics(this.stateId);
  }

  async getMun() {
    //this.mun = await this.dashboard.getMunStatistics(this.munId as number);
  }

  async getCitiesOption(state: string) {
    return (await this.generalInfo.getCities(state)).map(
      city => {
        const option: Option = {
          value: city.name,
          key: city.cityId
        }
        return option;
      }
    );
  }

  async getCollegesOption(city: number){
    return (await this.generalInfo.getColleges(city)).map(
      college => {
        const option: Option = {
          value: `${college.campus}  (${college.campusCode})`,
          key: college.campusCode
        }
        return option;
      }
    );
  }

  async getCoursesOption(){
    return (await this.generalInfo.getCourses()).map(
      course => {
        const value = `${course.grade} - ${course.course}`
        const option: Option = {
          value: value,
          key: value
        }
        return option;
      }
    );
  }

  async onSubmitFilter(){
    const states = [+this.isStateSet(), +this.isCitySet(), +this.isCollegeSet(), +this.isCourseSet()];
    const dashboardCode = states.reduce((res, x) =>  res << 1 | x )

    switch (dashboardCode) {
      case DashboardToDisplay.StateStatistics:
        await this.displayStateStatistics();
        break;
    
      case DashboardToDisplay.CityStatistics:
        await this.displayCityStatistics();
        break;

      case DashboardToDisplay.CollegeStatistics:
        await this.displayCollegeStatistics();
        break;

      case DashboardToDisplay.CourseStatistics:
        await this.displayCourseStatistics();
        break;

      case DashboardToDisplay.GovermentStatistics:
      default:
        await this.displayGovermentStatistics();
        break;
    }
  }


  async displayStateStatistics(){
    this.dashboardSelected = DashboardToDisplay.StateStatistics;

    await this.displayStatistics(
      this.getStateControl(), 
      async(option) => this.dashboard.getStateStatistics(option.key as string));
  }

  async displayCityStatistics(){
    this.dashboardSelected = DashboardToDisplay.StateStatistics;
    
    await this.displayStatistics(
      this.getCityControl(), 
      async(option) => this.dashboard.getMunStatistics(option.key as number));
  }

  async displayCollegeStatistics(){
    this.dashboardSelected = DashboardToDisplay.CollegeStatistics;
    
    await this.displayStatistics(
      this.getCollegeControl(), 
      async(option) => this.dashboard.getCollegeDaneStatistics(option.key as string));
  }

  async displayCourseStatistics(){
    this.dashboardSelected = DashboardToDisplay.CourseStatistics;

    await this.displayStatistics(
      this.getCourseControl(), 
      async(option) => {
        const [grade, course] = (option.key as string)
          .split('-');
        const college = this.getCollegeControl()?.value;
        const statistics = await this.dashboard.getCourseStatistics(college.key, grade.trim(), course.trim());
        return statistics;
      });
  }

  async displayGovermentStatistics(){
    this.dashboardSelected = DashboardToDisplay.GovermentStatistics;

    await this.displayStatistics(
      null, 
      (option) => this.dashboard.getGovernmentStatistics());
  }

  async displayStatistics(control: AbstractControl | null, getStatistics: (option: Option) => Promise<Statistics>){
    let option: Option = {} as Option;
    
    if(control != null){
      option = control?.value;
      const params = this.buildParams(option);
      this.setParams(params);
    }
    
    this.statistics = await getStatistics(option);
  }

  buildParams(option: Option): Params {
    return {
      type: DashboardToDisplay[this.dashboardSelected],
      city: option.value
    }
  }

  setParams(params: Params){
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: 'merge'
      }
    )
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
