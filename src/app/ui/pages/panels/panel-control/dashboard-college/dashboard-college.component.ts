import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from '@domain/models';
import { User } from '@domain/models/user.model';
import { DashboardUseCase, UserDataUseCase } from '@domain/usecases';
import { DashboardToDisplay } from '../panel-control/panel-control.component';

@Component({
  selector: 'app-dashboard-college',
  templateUrl: './dashboard-college.component.html',
  styleUrls: ['./dashboard-college.component.scss']
})
export class DashboardCollegeComponent implements OnInit {
  @Input()
  statistics?: Statistics;

  @Input()
  dashboardType: DashboardToDisplay;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
