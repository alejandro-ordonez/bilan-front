import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentType } from '@domain/enums/document-type.enum';
import { Auth } from '@domain/models/auth.model';
import { User } from '@domain/models/user.model';
import { AuthUserUseCase } from '@domain/usecases/auth-user.usecase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Option } from '@ui/components/select/select.component';
import { API_RESPONSE } from '@frameworks/config/Constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  auth: Auth;
  user: User;
  options: Option[];
  radioOptions: Option[];
  courseOptions: Option[];
  selectCourseOptions: Option[];
  schoolOptions: Option[];
  gradeOptions: Option[];
  loginButtonClicked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authUser: AuthUserUseCase,
    private router: Router,
    private modal: NgbModal
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
    this.options = [
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
  }

  ngOnInit(): void {}

  async updatePassword(event: any) {
    event.preventDefault();
    this.auth = new Auth();
    this.auth.password = this.resetForm.value.newPassword;
    const response = await this.authUser.update(this.auth);
    if (response.result === API_RESPONSE.auth.userUpdated) {
      this.resetForm.reset();
      this.loginButtonClicked = false;
      this.openModal('La contraseña ha sido modificada', 'xs');
    } else {
      this.openModal(
        'Ha ocurrido un error actualizando tus datos, vuelve a intentarlo.',
        'xs'
      );
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
