import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maloka-espiritual',
  templateUrl: './maloka-espiritual.component.html',
  styleUrls: ['./maloka-espiritual.component.scss'],
})
export class MalokaEspiritualComponent implements OnInit {
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
