import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';
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

  constructor() { }

  ngOnInit(): void {
    this.baseUrl = `/admin/panel-control/${DashboardToDisplay[this.dashboardType]}`;
  }


  buildPathToDashboard(params: RowSummary): string{
   
    switch (this.dashboardType) {
      case DashboardToDisplay.StateStatistics:
        return this.buildPathStateDashboard(params);
    
      case DashboardToDisplay.CityStatistics:
        return this.buildPathCityDashboard(params);

      case DashboardToDisplay.CollegeStatistics:
        return this.buildPathCollegeDashboard(params);

      case DashboardToDisplay.CourseStatistics:
      case DashboardToDisplay.GovermentStatistics:
      default:
        return this.baseUrl;

  }
}

  buildPath(params: Params){
    let url = this.baseUrl;
    let keyParams: string[] = Object.keys(params);
    url +='?'

    for(let key of keyParams){
      url += `${key}=${params[key]}`;
    }

    return url;
  }



  buildPathStateDashboard(data: RowSummary): string{
    const params = paramBuilder.buildStateStatisticsParams(data.name);
    return this.buildPath(params);
  }

  buildPathCityDashboard(data: RowSummary): string{
    const params: Params = paramBuilder.buildCityStatisticsParams(data.id);
    return this.buildPath(params);
  }

  buildPathCollegeDashboard(data: RowSummary): string{
    const params: Params = paramBuilder.buildCollegetatisticsParams(data.id);
    return this.buildPath(params);
  }

  buildPathStudentDashboard(data: RowSummary): string{
    const params: Params = paramBuilder.buildUserStatisticsParams(data.id);
    return this.buildPath(params);
  }


}
