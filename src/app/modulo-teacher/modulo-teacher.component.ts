import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-modulo-teacher',
  templateUrl: './modulo-teacher.component.html',
  styleUrls: ['./modulo-teacher.component.scss'],
})
export class ModuloTeacherComponent implements OnInit {
  materia: string;
  socioemocional: boolean = false;
  matematicas: boolean = false;
  lenguaje: boolean = false;
  ciudadanas: boolean = false;
  naturales: boolean = false;
  constructor(private modal: NgbModal, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.materia = params.materia;
      console.log(params);
      switch(this.materia){
        case 'matematicas':
          return this.matematicas = true;
        case 'lenguaje':
          return this.lenguaje = true;
        case 'ciencias-naturales':
          return this.naturales = true;
        case 'competencias-ciudadanas':
          return this.ciudadanas = true;
        case 'competencias-socioemocionales':
          return this.socioemocional = true;
      }
    });
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }
}
