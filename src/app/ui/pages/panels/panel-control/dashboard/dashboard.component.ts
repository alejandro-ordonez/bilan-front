import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationBehaviorOptions, Params, Router } from '@angular/router';
import { RowSummary, Statistics } from '@domain/models';
import { DashboardToDisplay } from '../panel-control/panel-control.component';
import * as paramBuilder from '@utils/paramBuilder';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input()
  statistics?: Statistics;

  @Input()
  title?: string;

  @Input()
  category?: string;

  @Input()
  subCategory?: string;

  @Input()
  dashboardType: DashboardToDisplay;

  baseUrl: string;

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToDashboard(params: RowSummary){
   
    switch (this.dashboardType) {
      case DashboardToDisplay.GovermentStatistics:
        this.navigateStateDashboard(params);
        break;
    
      case DashboardToDisplay.StateStatistics:
        this.navigateCityDashboard(params);
        break;

      case DashboardToDisplay.CityStatistics:
        this.navigateCollegeDashboard(params);
        break;

      case DashboardToDisplay.CourseStatistics:
      default:
        break;

    }
  }

  navigateStateDashboard(data: RowSummary){
    const params = paramBuilder.buildStateStatisticsParams(data.name);
    this.navigate(params, DashboardToDisplay.StateStatistics);
  }

  navigateCityDashboard(data: RowSummary){
    const params: Params = paramBuilder.buildCityStatisticsParams(data.id);
    this.navigate(params, DashboardToDisplay.CityStatistics);
  }

  navigateCollegeDashboard(data: RowSummary){
    const params: Params = paramBuilder.buildCollegetatisticsParams(data.id);
    this.navigate(params, DashboardToDisplay.CollegeStatistics);
  }

  navigateStudentDashboard(data: RowSummary){
    const params: Params = paramBuilder.buildUserStatisticsParams(data.id);
    this.navigate(params, DashboardToDisplay.StudentStatistics);
  }

  navigate(params: Params, targetDashboard: DashboardToDisplay){
    this._router.navigate(
      [ `../${DashboardToDisplay[targetDashboard]}` ],
      {
        relativeTo:  this._route,
        queryParams: params,
        queryParamsHandling: 'merge'
      }
    ).then(loaded => {
      if(loaded)
        window.location.reload()
    })
  }

}
