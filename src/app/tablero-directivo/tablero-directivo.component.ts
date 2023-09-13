import { Component, OnInit } from '@angular/core';
import { User } from '@domain/models/user.model';
import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';

@Component({
  selector: 'app-tablero-directivo',
  templateUrl: './tablero-directivo.component.html',
  styleUrls: ['./tablero-directivo.component.scss'],
})
export class TableroDirectivoComponent implements OnInit {
  userInfo: User;
  userInfoData: any;
  dashboardData: any;

  constructor(
    private userData: UserDataUseCase,
    private dashboard: DashboardUseCase
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    const response = await this.userData.info();

    this.userInfo = response;
    this.userInfoData = await this.userData.searchTeacher(
      this.userInfo.document as string
    );

    this.dashboardData = await this.dashboard.getCollegeDaneStatistics(
      this.userInfoData.codDaneSede
    );
      console.table(this.dashboardData.data[0].modules);
      
    console.log(response, this.userInfoData, this.dashboardData);
  }
}
