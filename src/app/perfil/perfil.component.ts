import { Component, OnInit } from '@angular/core';
import { User } from '@domain/models/user.model';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: any;
  user: any;

  constructor(
    private userData: UserDataUseCase,
    private dashboard: DashboardUseCase
  ) {}

  slideBoolean: boolean = true;

  ngOnInit(): void {
    this.getUserData();
  }

  changeSlide() {
    this.slideBoolean = !this.slideBoolean;
  }

  async getUserData() {
    this.user = await this.userData.info().catch((err) => err);
    this.usuario = this.dashboard.getSingleStudent(this.user.document);
  }
}
