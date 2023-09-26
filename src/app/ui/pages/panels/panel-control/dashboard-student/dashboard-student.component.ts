import { Component, Input, OnInit } from '@angular/core';
import { StudentStatistics } from '@domain/models';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {

  @Input()
  statistics: StudentStatistics;

  constructor() { }

  ngOnInit(): void {
  }

}
