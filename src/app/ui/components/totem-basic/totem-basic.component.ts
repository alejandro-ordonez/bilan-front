import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-totem-basic',
  templateUrl: './totem-basic.component.html',
  styleUrls: ['./totem-basic.component.scss'],
})
export class TotemBasicComponent implements OnInit {
  @Input() activeTotems: number = 1;
  @Input() totalTotems: number = 4;
  totems: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    for (var i = 0; i < this.activeTotems; i++) {
      this.totems.push({
        active: true,
      });
    }
    for (var i = 0; i < this.totalTotems - this.activeTotems; i++) {
      this.totems.push({
        active: false,
      });
    }
  }
}
