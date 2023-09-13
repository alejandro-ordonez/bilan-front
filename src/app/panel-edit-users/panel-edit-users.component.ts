import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemePalette } from '@angular/material/core';
import { Option } from '@ui/components/select/select.component';
import { DocumentType } from '@domain/enums/document-type.enum';
import { UserType } from '@domain/enums/user-type.enum';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { Router, ActivatedRoute, Params } from '@angular/router';
import depmun from '../login-page/dep-mun.json';
import { GradeCourseResponse } from '@domain/models/dashboard.model';
import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { AuthUserUseCase } from '@domain/usecases/auth-user.usecase';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-panel-edit-users',
  templateUrl: './panel-edit-users.component.html',
  styleUrls: ['./panel-edit-users.component.scss'],
})
export class PanelEditUsersComponent implements OnInit {
  @ViewChild('sureEnabledModal')
  private sureEnabledModalTpl: TemplateRef<any>;

  states: Option[];
  municipalities: Option[];
  colleges: Option[];
  gradeCourses: GradeCourseResponse[];
  grades: Option[];
  courses: Option[];
  userTypesFileUpload: Option[] = [
    {
      key: UserType.Student,
      value: 'Estudiante',
    },

    {
      key: UserType.Teacher,
      value: 'Profesor',
    },
  ];

  userTypes: any = UserType;

  selectedUserType: any = '';
  selectedUserTypeLoad: any = '';

  uploadForm: FormGroup;

  documentTypeOptions: Option[] = [
    {
      key: DocumentType.CC,
      value: 'Cédula de ciudadanía',
    },
    {
      key: DocumentType.CE,
      value: 'Cédula de extranjería',
    },
    {
      key: DocumentType.TI,
      value: 'Tarjeta de identidad',
    },
    {
      key: DocumentType.OT,
      value: 'Otro',
    },
  ];

  createUserForm: FormGroup;
  createUserDirectiveForm: FormGroup;
  createUserSecEduForm: FormGroup;
  createUserMinForm: FormGroup;

  updateUserMinForm: FormGroup;

  searchUserForm: FormGroup;

  radioOptions: Option[];

  loginButtonClicked: boolean = false;

  isValidFile: boolean = false;

  burgerButtonIsActive: boolean = false;

  users: any;
  page: number;
  partialDocument: string = '';

  userSelected: any;

  isAdmin: boolean = false;

  prueba: any;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private userData: UserDataUseCase,
    private router: Router,
    private route: ActivatedRoute,
    private authUser: AuthUserUseCase,
    private dashboard: DashboardUseCase
  ) {
    this.radioOptions = [
      {
        key: UserType.Min,
        value: 'Ministerio',
      },
      {
        key: UserType.SecEdu,
        value: 'Secretaria de educación',
      },
      {
        key: UserType.Directive,
        value: 'Directivo docente',
      },
      {
        key: UserType.Teacher,
        value: 'Docente',
      },
      {
        key: UserType.Student,
        value: 'Estudiante',
      },
    ];

    this.uploadForm = this.fb.group({
      file: ['', Validators.required],
      campusCodeDane: ['', Validators.required],
      userTypeLoad: ['', Validators.required],
    });

    this.createUserForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      selectedState: ['', Validators.required],
      selectedMunicipality: ['', Validators.required],
      selectedCollege: ['', Validators.required],
      selectedGrade: ['', Validators.required],
      selectedCourse: ['', Validators.required],
      codDane: ['', Validators.required],
    });

    this.createUserDirectiveForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      selectedState: ['', Validators.required],
      selectedMunicipality: ['', Validators.required],
      codDane: ['', Validators.required],
    });

    this.createUserSecEduForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      selectedState: ['', Validators.required],
    });

    this.createUserMinForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    //Update users
    this.updateUserMinForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.searchUserForm = this.fb.group({
      document: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }
  ngOnInit(): void {
    this.states = depmun.map<Option>((dep) => {
      return {
        key: dep.state,
        value: dep.state,
      };
    });
    this.route.params.subscribe((params: Params) => {
      this.page = Number(params.page);
      this.partialDocument = params.partialDocument;

      this.searchUsers();
    });

    this.userType();
  }

  async userType() {
    this.isAdmin = (await (await this.userData.info()).userType) === 'Admin';
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize <= 5) {
        this.uploadForm.value.file = file;
        this.isValidFile = true;
      } else {
        this.isValidFile = false;
        alert('Archivo muy grande, máximo 5MB');
        this.uploadForm.value.file = '';
      }
    }
  }

  async uploadFile() {
    try {
      this.isValidFile = false;
      const formData = new FormData();
      formData.append('file', this.uploadForm.value.file);
      await this.userData.load(
        this.uploadForm.value.campusCodeDane,
        this.uploadForm.value.userTypeLoad,
        formData
      );
      this.uploadForm.value.file = '';
      alert('Enviado con exito');
    } catch {
      this.isValidFile = true;
      alert('Lo sentimos hubo un error, intentelo mas tarde');
    }
  }

  async onSubmit() {
    try {
      await this.register();
    } catch (error) {
      alert(error);
    }
  }

  async register() {
    try {
      switch (this.selectedUserType) {
        case UserType.Directive:
          await this.authUser.create({
            document: this.createUserDirectiveForm.value.document,
            documentType: this.createUserDirectiveForm.value.documentType.slice(3,5),
            userType: this.selectedUserType,
            password: this.createUserDirectiveForm.value.password,
            email: this.createUserDirectiveForm.value.email,
            name: this.createUserDirectiveForm.value.name,
            lastName: this.createUserDirectiveForm.value.lastName,
            selectedState: this.createUserDirectiveForm.value.selectedState,
            selectedMunicipality:
              this.createUserDirectiveForm.value.selectedMunicipality,
            codDane: this.createUserDirectiveForm.value.codDane,
            grantedAuthorities: [],
          });
          break;
        case UserType.SecEdu:
          await this.authUser.create({
            document: this.createUserSecEduForm.value.document,
            documentType: this.createUserSecEduForm.value.documentType.slice(3,5),
            userType: this.selectedUserType,
            password: this.createUserSecEduForm.value.password,
            email: this.createUserSecEduForm.value.email,
            name: this.createUserSecEduForm.value.name,
            lastName: this.createUserSecEduForm.value.lastName,
            selectedState: this.createUserSecEduForm.value.selectedState,
            grantedAuthorities: [],
          });
          break;
        case UserType.Min:
          await this.authUser.create({
            document: this.createUserMinForm.value.document,
            documentType: this.createUserMinForm.value.documentType.slice(3,5),
            userType: this.selectedUserType,
            password: this.createUserMinForm.value.password,
            email: this.createUserMinForm.value.email,
            name: this.createUserMinForm.value.name,
            lastName: this.createUserMinForm.value.lastName,
            grantedAuthorities: [],
          });
          break;
        default:
          await this.authUser.create({
            document: this.createUserForm.value.document,
            documentType: this.createUserForm.value.documentType.slice(3,5),
            userType: this.selectedUserType,
            password: this.createUserForm.value.password,
            email: this.createUserForm.value.email,
            grade: this.createUserForm.value.selectedGrade.slice(3),
            courseId: this.createUserForm.value.selectedCourse.slice(3),
            collegeId: this.createUserForm.value.selectedCollege.slice(3),
            name: this.createUserForm.value.name,
            lastName: this.createUserForm.value.lastName,
            codDane: this.createUserForm.value.codDane,
            grantedAuthorities: [],
          });
          break;
      }
      this.resetForm();
      alert('Usuario creado con exito');
    } catch (error) {
      alert('Lo sentimos hubo un error');
    }
  }

  async onSubmitUpdate() {
    try {
      await this.update();
    } catch (error) {
      alert(error);
    }
  }

  async update() {
    try {
      if(this.updateUserMinForm.value.document == ''){
        delete this.updateUserMinForm.value.document
      }
      if(this.updateUserMinForm.value.documentType == ''){
        delete this.updateUserMinForm.value.documentType
      }
      if(this.selectedUserType == ''){
        delete this.selectedUserType
      }
      if(this.updateUserMinForm.value.password == ''){
        delete this.updateUserMinForm.value.password
      }
      if(this.updateUserMinForm.value.name == ''){
        delete this.updateUserMinForm.value.name
      }
      if(this.updateUserMinForm.value.lastName == ''){
        delete this.updateUserMinForm.value.lastName
      }

      switch (this.selectedUserType) {
        case UserType.Directive:
          await this.authUser.updateUsers({
            document: this.updateUserMinForm.value.document,
            documentType: this.updateUserMinForm.value.documentType,
            userType: this.selectedUserType,
            password: this.updateUserMinForm.value.password,
            name: this.updateUserMinForm.value.name,
            lastName: this.updateUserMinForm.value.lastName,
          });
          break;
        case UserType.SecEdu:
          await this.authUser.updateUsers({
            document: this.updateUserMinForm.value.document,
            documentType: this.updateUserMinForm.value.documentType,
            userType: this.selectedUserType,
            password: this.updateUserMinForm.value.password,
            name: this.updateUserMinForm.value.name,
            lastName: this.updateUserMinForm.value.lastName,
          });
          break;
        case UserType.Min:
          await this.authUser.updateUsers({
            document: this.updateUserMinForm.value.document,
            documentType: this.updateUserMinForm.value.documentType,
            userType: this.selectedUserType,
            password: this.updateUserMinForm.value.password,
            name: this.updateUserMinForm.value.name,
            lastName: this.updateUserMinForm.value.lastName,
          });
          break;
        default:
          await this.authUser.updateUsers({
            document: this.updateUserMinForm.value.document,
            documentType: this.updateUserMinForm.value.documentType,
            userType: this.selectedUserType,
            password: this.updateUserMinForm.value.password,
            name: this.updateUserMinForm.value.name,
            lastName: this.updateUserMinForm.value.lastName,
          });
          break;
      }

      alert('Usuario actualizado con exito');
    } catch (error) {
      alert('Lo sentimos hubo un error');
    }
  }

  hideShow() {
    this.burgerButtonIsActive = !this.burgerButtonIsActive;
  }

  datosUsers(user: any) {
    console.log(user);

    return user;
  }

  selectUser(index: number, enabled: boolean) {
    this.userSelected = index;

    this.users.data[this.userSelected].enabled = enabled;
    this.openModal(this.sureEnabledModalTpl);
  }

  async selectUserUpdate (index: number, user:any){
    console.log(user);
    this.prueba=user;
  }

  async changeEnabled() {
    this.users.data[this.userSelected].isEnabled =
      !this.users.data[this.userSelected].isEnabled;

    await this.userData.enableUser({
      document: this.users.data[this.userSelected].document,
      documentType: this.users.data[this.userSelected].documentType,
      enabled: this.users.data[this.userSelected].isEnabled,
    });

    this.searchUsers();
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  async searchUsers() {
    this.users = [];
    try {
      this.users = await this.userData.searchUsers({
        page: Number(this.page).toString(),
        document: this.partialDocument,
      });
    } catch (error) {}
  }

  searchForm() {
    this.router.navigateByUrl(
      `/admin/panel-edit/0/${this.searchUserForm.value.document}`
    );
  }

  setDepartmentMunicipality(form: FormGroup, option?: any) {
    form.value.selectedMunicipality = '';
    form.value.selectedCollege = '';
    form.value.selectedGrade = '';
    form.value.selectedCourse = '';
    this.colleges = [];
    this.grades = [];
    this.courses = [];

    this.municipalities =
      depmun
        .find((dep) => dep.state === form.value.selectedState.slice(3))
        ?.municipalities.map((mun) => {
          return {
            value: mun.name,
            key: mun.id,
          };
        }) || [];
  }
  async setColleges(form: FormGroup, option?: any) {
    form.value.selectedCollege = '';
    form.value.selectedGrade = '';
    form.value.selectedCourse = '';
    this.grades = [];
    this.courses = [];
    const response = await this.dashboard.getColleges(
      form.value.selectedMunicipality.slice(3)
    );
    this.colleges = response.map((col) => {
      return {
        key: col.id,
        value: `${col.name} - Sede: ${col.campus}`,
      };
    });
  }

  async setGrades(form: FormGroup, option?: any) {
    form.value.selectedGrade = '';
    form.value.selectedCourse = '';
    this.courses = [];
    const response = await this.dashboard.getGradeCourses(
      form.value.selectedCollege.slice(3)
    );
    this.gradeCourses = response;
    this.grades = this.gradeCourses.map((gc) => {
      return {
        key: gc.grade,
        value: gc.grade,
      };
    });
  }

  setCourses(form: FormGroup, option?: any) {
    form.value.selectedCourse = '';
    const grade = this.gradeCourses.find(
      (gd) => gd.grade === form.value.selectedGrade
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
  resetForm(): void {
    this.createUserMinForm.reset();
    this.createUserForm.reset()
    this.createUserDirectiveForm.reset();
    this.createUserSecEduForm.reset();
    this.createUserMinForm.reset();
    this.updateUserMinForm.reset();
  }
  check() {}
}
