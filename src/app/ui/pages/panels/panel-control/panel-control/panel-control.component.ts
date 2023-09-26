import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Option } from '@ui/components/select/select.component';
import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { UserType, UserTypeValues } from '@domain/enums/user-type.enum';

import {
  CourseToEnroll,
  GradeCourseResponse,
  Statistics,
  StudentStatistics,
} from '@domain/models/dashboard.model';

import { GeneralInfoUseCase } from '@domain/usecases/general-info.usecase';
import { AbstractControl, FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@application/auth/auth.service';
import * as paramBuilder from '@utils/paramBuilder';
import { State } from '@domain/models';


export enum DashboardToDisplay{
  GovermentStatistics = 0,
  StateStatistics = 8,
  CityStatistics = 12,
  CollegeStatistics = 14,
  CourseStatistics = 15,
  StudentStatistics = 100
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
  statesData: State[] = [];
  states: Option[] = [];
  cities: Option[] = [];
  colleges: Option[] = [];
  grades: Option[] = [];
  courses: Option[] = [];

  // DashboardLoaded
  dashboardSelected: DashboardToDisplay = DashboardToDisplay.GovermentStatistics;
  dashboardCases: typeof DashboardToDisplay = DashboardToDisplay;
  
  // Statistics
  statistics: Statistics;
  studentStatistics: StudentStatistics;

  gradeCourses: GradeCourseResponse[];

  userType: UserType;
  userTypeValues = UserTypeValues;

  classRooms: CourseToEnroll[];
  classroomOptions: Option[];
  filterForm: FormGroup;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private dashboard: DashboardUseCase,
    private userAuth: AuthService,
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

    this.statesData = await this.generalInfo.getStatesAndCities();
    this.states = this.getStateOptions();

    this.userType = this.userAuth.user?.userType!;

    // Params from URL
    const urlParams = this.route.snapshot.params;
    const type: keyof typeof DashboardToDisplay = urlParams.type;
    this.dashboardSelected = DashboardToDisplay[type];
    
    // Load params
    const queryParams = this.route.snapshot.queryParams;
    this.setStateControl(queryParams.State);
    this.setCityControl(queryParams.CityId);
    this.setCollegeControl(queryParams.collegeId);
    this.setCourseControl(queryParams.course);


    this.loadDashboard(this.dashboardSelected);

    this.courses = await this.getCoursesOption();

    // When dropdowns changes
    this.stateControl?.valueChanges.subscribe(async(option: Option) => {
      this.cities = this.getCityOptionsByStateName(option.value);
    });

    this.cityControl?.valueChanges.subscribe(async(option: Option) => {
      if(this.isCitySet())
        this.colleges = await this.getCollegesOption(option.key as number);
    });
  }


  isStateSet(): boolean{
    const value = this.stateControl?.value;
    return value && value !== null && value != '';
  }

  isCitySet(): boolean{
    const value = this.cityControl?.value;
    return value && value !== null && value != '';
  }

  isCollegeSet(): boolean{
    const value = this.collegeControl?.value;
    return value && value !=null && value != '';
  }

  isCourseSet(): boolean{
    const value = this.courseControl?.value;
    return value && value !=null && value != '';
  }

  showStateControl(): boolean{
    return this.userType == UserType.Min;
  }

  showCityControl(): boolean{
    return this.isStateSet() && 
      (this.userType == UserType.SecEdu || this.userType == UserType.Min);
  }

  showCollegeControl(): boolean{
    return this.isCitySet() && 
     ( this.userType == UserType.Min || this.userType == UserType.SecEdu );
  }

  showCourseControl(): boolean{
    return this.isCollegeSet() && 
     ( this.userType == UserType.Min || this.userType == UserType.SecEdu || this.userType == UserType.DirectiveTeacher)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/inicio');
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  async onSubmitFilter(){
    const states = [+this.isStateSet(), +this.isCitySet(), +this.isCollegeSet(), +this.isCourseSet()];
    const dashboardCode = states.reduce((res, x) =>  res << 1 | x )
    await this.loadDashboard(dashboardCode);    
  }


  async loadDashboard(dashboard: DashboardToDisplay){
    switch (dashboard) {
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
    this.states = this.getStateOptions();

    await this.displayStatistics(
      async() => this.dashboard.getStateStatistics(this.stateControl?.value.key as string),
      paramBuilder.buildStateStatisticsParams(this.stateControl?.value.value));
  }

  async displayCityStatistics(){
    this.dashboardSelected = DashboardToDisplay.CityStatistics;
    
    await this.displayStatistics(
      async() => this.dashboard.getMunStatistics(this.cityControl?.value.key as number),
      paramBuilder.buildCityStatisticsParams(this.cityControl?.value.key));
  }

  async displayCollegeStatistics(){
    this.dashboardSelected = DashboardToDisplay.CollegeStatistics;
    
    await this.displayStatistics(
      async() => this.dashboard.getCollegeDaneStatistics(this.collegeControl?.value.key as string),
      paramBuilder.buildCollegetatisticsParams(this.collegeControl?.value.key as string));
  }

  async displayCourseStatistics(){
    this.dashboardSelected = DashboardToDisplay.CourseStatistics;
    const college = this.collegeControl?.value;
    const courseValue = this.courseControl?.value.key as string;
    await this.displayStatistics(
      async() => {
        const [grade, course] = courseValue.split('-');
        const statistics = await this.dashboard.getCourseStatistics(college.key, grade.trim(), course.trim());
        return statistics;
      },
      paramBuilder.buildCourseStatisticsParams(college.key, courseValue));
  }

  async displayStudentStatistics(document: string){
    this.dashboardSelected = DashboardToDisplay.StudentStatistics;
    this.studentStatistics = await this.dashboard.getSingleStudent(document);

    this.setParams({
      type: DashboardToDisplay[this.dashboardSelected],
      id: document
    })
  }

  async displayGovermentStatistics(){
    this.dashboardSelected = DashboardToDisplay.GovermentStatistics;
    this.states = this.getStateOptions();
    await this.displayStatistics( 
      () => this.dashboard.getGovernmentStatistics());
  }

  async displayStatistics(getStatistics: () => Promise<Statistics>, params: Params | undefined = undefined){    
    if(params && params != null){
      this.setParams(params);
    }
    
    this.statistics = await getStatistics();
  }


  setParams(params: Params){
    this.router.navigate(
      [ `../${DashboardToDisplay[this.dashboardSelected]}` ],
      {
        relativeTo:  this.route,
        queryParams: params,
        queryParamsHandling: 'merge'
      }
    )
  }
  

  burgerButtonIsActive: boolean = false;

  hideShow() {
    this.burgerButtonIsActive = !this.burgerButtonIsActive;
  }


  //#region Utilities
  getCityOptionsByStateName(stateName: string): Option[]{
    const state = this.statesData.find(state => state.stateName === stateName);
    return this.getCityOptions(state);      
  }

  getCityOptionsByCityId(cityId: number): Option[]{
    const state = this.statesData.find(state => state.cities.some(city => city.cityId === cityId));
    return this.getCityOptions(state);
  }

  getCityOptions(state: State | undefined){
    if(!state)
      return [];

    return state.cities.map(city => {
      return {
        key: city.cityId,
        value: city.name
      }
    });
  }

  getStateOptions(): Option[]{
    return this.statesData.map(state => {
      return {
        key: state.stateName,
        value: state.stateName
      }
    })
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
  //#endregion

  //#region Getters/Setters Controls
  get stateControl(): AbstractControl | null{
    return this.filterForm.get('state');
  }

  setStateControl(state: string){
    if(!state)
      return;
    this.stateControl?.setValue({ key: state, value: state});
  }

  get cityControl(): AbstractControl | null{
    return this.filterForm.get('city');
  }

  setCityControl(city: string){
    if(!city)
      return;

    let option: Option = { key: '', value: ''};

    if(this.cities.length === 0){
      this.cities = this.getCityOptionsByCityId(Number.parseInt(city));
    }
 
    option = this.cities.find(cityOption => cityOption.key == city) ?? option;
    this.cityControl?.setValue(option);
  }

  get collegeControl(): AbstractControl | null{
    return this.filterForm.get('college');
  }

  setCollegeControl(college: string){
    this.collegeControl?.setValue(college);
  }

  get courseControl(): AbstractControl | null{
    return this.filterForm.get('course');
  }

  setCourseControl(course: string){
    this.collegeControl?.setValue(course);
  }
  //#endregion
}
