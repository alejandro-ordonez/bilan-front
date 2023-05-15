import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maloka-civil',
  templateUrl: './maloka-civil.component.html',
  styleUrls: ['./maloka-civil.component.scss'],
})
export class MalokaCivilComponent implements OnInit {
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
