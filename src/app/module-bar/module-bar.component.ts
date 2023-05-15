import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-module-bar',
  templateUrl: './module-bar.component.html',
  styleUrls: ['./module-bar.component.scss'],
})
export class ModuleBarComponent implements OnInit {
  materia: any;

  townOptions: { [index: string]: any } = {
    matematicas: 'Yarkin',
    'competencias-ciudadanas': 'Nebulan',
    'competencias-socioemocionales': 'Talio',
    'ciencias-naturales': 'Warten',
    lenguaje: 'Geodin',
  };

  townOptionDefault = 'Geodin';

  townName: string;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.materia = params.materia;
      this.townName = this.townOptions[this.materia] || this.townOptionDefault;
    });
  }

  back(): void {
    this.location.back();
  }
}
