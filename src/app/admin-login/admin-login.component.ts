import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@domain/models/auth.model';
import { User } from '@domain/models/user.model';
import { Response } from '@domain/models/response.model';
import { UserUseCase } from '@domain/usecases/user.usecase';
import { API_RESPONSE } from '@frameworks/config/Constants';
import { Option } from '@ui/components/select/select.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserType } from '@domain/enums/user-type.enum';
import { DocumentType } from '@domain/enums/document-type.enum';

import { AuthService } from '@application/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  @ViewChild('errorModal', { static: false }) private errorModal: any;
  options: Option[];
  radioOptions: Option[];
  courseOptions: Option[];
  schoolOptions: Option[];
  gradeOptions: Option[];
  loginForm: FormGroup;
  registerForm: FormGroup;
  newUserForm: FormGroup;
  newUserFormIsActive: boolean = false;
  userFinded: any;

  loginButtonClicked: boolean = false;

  auth: Auth;
  user: User;

  public href: string = '';

  constructor(
    private fb: FormBuilder,
    private authUser: UserUseCase,
    private router: Router,
    private modal: NgbModal
  ) {
    this.radioOptions = [
      {
        key: UserType.Admin,
        value: 'Administrador',
      },
      {
        key: UserType.Min,
        value: 'Ministerio',
      },
      {
        key: UserType.SecEdu,
        value: 'Secretaría de Educación',
      },
      {
        key: UserType.DirectiveTeacher,
        value: 'Directivo Docente',
      },
    ];

    this.loginForm = this.fb.group({
      document: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });

    this.auth = Auth.getDefault();
  }

  ngOnInit(): void {}

  async onSubmit(event: any) {
    event.preventDefault();
    this.auth = new Auth();

    this.auth.document = this.loginForm.value.document;
    this.auth.password = this.loginForm.value.password;
    this.auth.documentType = DocumentType.CC;
    this.auth.userType = this.loginForm.value.userType;

    this.login();
  }

  async login() {
    let response: boolean = false;
    try {
      response = await this.authUser.login(this.auth);

      if(!response){
        alert('Ups! algo paso mientras buscabamos tú identificacíon');
        return;
      }

      switch(this.auth.userType){
        case UserType.Admin:
          this.router.navigateByUrl('/admin/panel-edit/1/ ');
          break;

        case UserType.DirectiveTeacher:
          this.router.navigateByUrl('/admin/panel-directivo');
          break;

        case UserType.Min:
        default:
          this.router.navigateByUrl(
            '/admin/panel-control/GovermentStatistics'
          );
          break;
      }


    } catch (error) {}
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }
}
