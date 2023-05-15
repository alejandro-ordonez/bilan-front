import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maloka-exploracion',
  templateUrl: './maloka-exploracion.component.html',
  styleUrls: ['./maloka-exploracion.component.scss'],
})
export class MalokaExploracionComponent implements OnInit {
  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }
}
