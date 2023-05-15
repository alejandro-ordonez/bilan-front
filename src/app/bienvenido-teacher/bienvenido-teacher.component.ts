import { Component, OnInit } from '@angular/core';

import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { CourseToEnroll } from '@domain/models/dashboard.model';

@Component({
  selector: 'app-bienvenido-teacher',
  templateUrl: './bienvenido-teacher.component.html',
  styleUrls: ['./bienvenido-teacher.component.scss'],
})
export class BienvenidoTeacherComponent implements OnInit {
  classrooms: CourseToEnroll[] = [];

  materiaIdIndex: any = {
    1: 'competencias-socioemocionales',
    2: 'lenguaje',
    3: 'ciencias-naturales',
    4: 'competencias-ciudadanas',
    5: 'matematicas',
  };
  courseIdIndex: any = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: '1',
    6: '2',
    7: '3',
    8: '4',
    9: '01',
    10: '02',
    11: '03',
    12: '04',
  };

  tribesId: number[] = [1, 2, 3, 4, 5];

  constructor(private dashboard: DashboardUseCase) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    let allClassrooms = await this.dashboard.getClassrooms();

    this.tribesId.forEach((tribe) => {
      let tribeClassroom = allClassrooms.find(
        (classroom) => classroom.tribeId === tribe
      );

      if (tribeClassroom) {
        this.classrooms.push(tribeClassroom);
      }

      switch(( tribeClassroom ? tribeClassroom.tribeId.toString() : '' ) ){
        case '1' :
          return localStorage.setItem('classTeacher', 'competencias-socioemocionales')
        case '2' :
          return localStorage.setItem('classTeacher', 'lenguaje')
        case '3' :
          return localStorage.setItem('classTeacher', 'ciencias-naturales')
        case '4' :
          return localStorage.setItem('classTeacher', 'competencias-ciudadanas')
        case '5' :
          return localStorage.setItem('classTeacher', 'matematicas')
        
      }
    });

  }
}
