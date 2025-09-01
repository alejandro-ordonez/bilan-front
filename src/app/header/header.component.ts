import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Stat } from '@domain/models/stat.model';
import { User } from '@domain/models/user.model';
import { CourseToEnroll } from '@domain/models/dashboard.model';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { StatsService } from '../services/stats-service';
import { Observable, Subject, Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { UserType } from '@domain/enums/user-type.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  stats: Stat;
  isTeacher: boolean;

  homeLink: string = '/home';

  menu: boolean = false;
  mobile: boolean = false;
  switchToUpdate: boolean;
  college: CourseToEnroll;
  tableroLink: string = '/admin/panel-control';

  constructor(
    private router: Router,
    private modal: NgbModal,
    private statsService: StatsService,
    private userData: UserDataUseCase,
    private cd: ChangeDetectorRef,
    private dashboard: DashboardUseCase
  ) { }

  ngOnInit(): void {
    if (window.innerWidth <= 1100) {
      this.mobile = true;
    }

    this.getUserData();
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  menuClick() {
    this.menu = !this.menu;
  }

  private async getUserData() {
    try {
      this.user = await this.userData.info();
      this.isTeacher = this.user.userType === 'Teacher'

      switch (this.user?.userType) {

        case UserType.Teacher:
          this.homeLink = '/teacher';
          this.getClassrooms();
          break;

        case UserType.Student:
          this.statsService.syncStats().subscribe((stat) => {
            this.stats = stat;
            this.cd.detectChanges();
          });
          break;
      }

    } catch (error) {
    }
  }

  updateUserStats() {
    this.stats.generalTotems++;
    this.statsService.updateStats(this.stats);
    this.switchToUpdate = !this.switchToUpdate;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/inicio');
  }

  async getClassrooms() {
    const classRooms = await this.dashboard.getClassrooms();

    if(classRooms.length == 0)
      return;

    const obColleges: any = new Object();
    classRooms.forEach((cls: CourseToEnroll) => {
      obColleges[cls.collegeId.toString()] = cls;
    });
    const obCollege: any[] = Object.values(obColleges);

    this.college = obCollege[0];
    this.tableroLink = `${this.tableroLink}${this.college.collegeId}/${this.college.grade}/${this.college.courseId}`;
  }

  onClick() {
    switch (this.user.userType) {
        case UserType.Admin:
          this.router.navigateByUrl('/admin/panel-edit/0/ ');
          break;

        case UserType.DirectiveTeacher:
          this.router.navigateByUrl('/admin/panel-directivo');
          break;

        case UserType.SecEdu:
          this.router.navigateByUrl(`/admin/panel-control/StateStatistics?State=${this.user.metadata.state}`);
          break;

        case UserType.Min:
        default:
          this.router.navigateByUrl(
            '/admin/panel-control/GovermentStatistics'
          );
          break;
    }
  }
}
