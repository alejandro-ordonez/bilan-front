import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentType } from '@domain/enums/document-type.enum';
import { UserType } from '@domain/enums/user-type.enum';
import { Auth } from '@domain/models/auth.model';
import { User } from '@domain/models/user.model';
import { Response } from '@domain/models/response.model';
import { UserUseCase } from '@domain/usecases/user.usecase';
import { API_RESPONSE } from '@frameworks/config/Constants';
import { Option } from '@ui/components/select/select.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseToEnroll } from '@domain/models/dashboard.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  options: Option[] = [
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
      key: DocumentType.RC,
      value: 'Registro civil',
    },

    {
      key: DocumentType.PEP,
      value: 'Persona expuesta políticamente',
    },

    {
      key: DocumentType.NES,
      value: 'Número establecido por Sec. Educación.',
    },

    {
      key: DocumentType.TMF,
      value: 'Tarjeta de movilidad fronteriza',
    },

    {
      key: DocumentType.OT,
      value: 'Otro',
    },
  ];
  radioOptions: Option[];
  courseOptions: Option[];
  schoolOptions: Option[];
  gradeOptions: Option[];
  documentTypeOptions: Option[];
  loginForm: FormGroup;
  newStudentForm: FormGroup;
  newStudentFormIsActive: boolean = false;
  newTeacherForm: FormGroup;
  newTeacherFormIsActive: boolean = false;
  userFinded: any;

  loginButtonClicked: boolean = false;

  tribesOptions = [
    {
      value: 'Matemáticas',
      key: 5,
    },
    {
      value: 'Lenguaje',
      key: 4,
    },
    {
      value: 'Ciencias Naturales',
      key: 3,
    },
    {
      value: 'Competencias Ciudadanas',
      key: 2,
    },
    {
      value: 'Competencias Socioemocionales',
      key: 1,
    },
  ];

  departmentOptions: Option[];
  municipalityOptions: Option[];

  auth: Auth;
  user: User;

  courseToEnroll: CourseToEnroll[] = [];

  public href: string = '';

  constructor(
    private fb: FormBuilder,
    private authUser: UserUseCase,
    private router: Router,
    private modal: NgbModal
  ) {
    this.documentTypeOptions = this.options;

    this.radioOptions = [
      {
        key: UserType.Student,
        value: 'Estudiante',
      },
      {
        key: UserType.Teacher,
        value: 'Maestro',
      },
    ];
    this.loginForm = this.fb.group({
      documentType: ['', Validators.required],
      document: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });

    this.newStudentForm = this.fb.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.newTeacherForm = this.fb.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.auth = Auth.getDefault();
  }

  ngOnInit(): void {
    this.href = this.router.url;
    localStorage.setItem('usuario', 'Juan');
  }

  private buildNewUserAuth(): Auth {
    let auth = new Auth();

    auth.document = this.loginForm.value.document;
    auth.documentType = this.loginForm.value.documentType?.slice(3,5);
    auth.userType = this.loginForm.value.userType;
    auth.password = this.loginForm.value.password;
    return auth;
  }

  async onLogin(event: any) {
    event.preventDefault();
    try {
      const result = await this.authUser.validate(this.buildNewUserAuth());
      this.parseAuthError(result as Response);
    } catch (error) {
      console.error("Someting went wrong");
      this.parseAuthError(error as Response);
    }
  }

  private parseAuthError(response: Response): void {
    this.user;
    switch (response.result) {
      case API_RESPONSE.auth.userNotFound:
        this.userNotFound();
        break;
      case API_RESPONSE.auth.userRequireUpdate:
        this.userRequireUpdate();
        break;
      case API_RESPONSE.auth.userExists:
        this.login();
        break;
      case undefined:
        this.user500();
        break;
    }
  }

  private userNotFound() {
    this.openModal(
      'Datos incorrectos, comunícate con un directivo docente de tu institución educativa',
      'xs'
    );
    return;
  }

  private user500(){
    this.openModal(
      'No te encuentras registrado en el SIMAT.  Por favor comunícate con el directivo docente de tu institución.',
      'xs'
    );
    return;
  }

  private async userRequireUpdate() {
    if (this.loginForm.value.userType === 'Teacher') {
      this.newTeacherFormIsActive = true;
    } else {
      this.newStudentFormIsActive = true;
    }
  }

  private async login(auth: any = this.buildNewUserAuth()) {
    try {
      if (await this.authUser.login(auth)) {
        if (this.loginForm.value.userType === 'Teacher') {
          this.router.navigateByUrl('/teacher');
        } else {
          this.router.navigateByUrl('/home');
        }
      }
    } catch (error) {
      this.openModal(
        'Ups! Algo ha pasado mientras buscábamos tú identificación',
        'xs'
      );
    }
  }

  async updatePassword() {
    let user = new User();
    if (this.loginForm.value.userType === 'Student') {
      user.document = this.loginForm.value.document;
      user.documentType = this.loginForm.value.documentType.slice(3,5);
      user.userType = this.loginForm.value.userType;
      user.password = this.newStudentForm.value.password;
      user.email = this.newStudentForm.value.email;
    } else {
      user.document = this.loginForm.value.document;
      user.documentType = this.loginForm.value.documentType.slice(3,5);
      user.userType = this.loginForm.value.userType;
      user.password = this.newTeacherForm.value.password;
      user.email = this.newTeacherForm.value.email;
    }

    const response = await this.authUser.update(user);

    if (response.result === API_RESPONSE.auth.userUpdated) {
      this.login(user);
    } else {
      alert('Ha ocurrido un error, inténtalo más tarde');
    }
  }

  openModal(contenido: any, size = 'lg') {
    this.modal.open(contenido, {
      size,
      centered: true,
      scrollable: true,
    });
  }
}
