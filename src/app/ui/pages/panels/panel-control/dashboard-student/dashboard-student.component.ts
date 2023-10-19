import { Component, Input, OnInit } from '@angular/core';
import { StudentStatistics } from '@domain/models';
import { DashboardToDisplay } from '../panel-control/panel-control.component';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {

  @Input()
  statistics?: StudentStatistics;

  @Input()
  dashboardType: DashboardToDisplay;
  
  constructor() { }

  ngOnInit(): void {
  }

}
