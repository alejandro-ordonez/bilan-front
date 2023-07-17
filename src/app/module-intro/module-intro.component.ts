import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-module-intro',
  templateUrl: './module-intro.component.html',
  styleUrls: ['./module-intro.component.scss'],
})
export class ModuleIntroComponent implements OnInit {
  materia: any;
  info: any | null;
  isValidMateria: any;

  constructor(private route: ActivatedRoute, private modal: NgbModal) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      
      const storedInfo = localStorage.getItem("info");
      if (storedInfo) {
        this.info = JSON.parse(storedInfo);
      }
      this.materia = params.materia;
      this.isValidMateria =
        this.materia === 'matematicas' ||
        this.materia === 'competencias-ciudadanas' ||
        this.materia === 'competencias-socioemocionales' ||
        this.materia === 'ciencias-naturales' ||
        this.materia === 'lenguaje';
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
