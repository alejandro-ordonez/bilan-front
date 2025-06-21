import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-totem-special',
  templateUrl: './totem-special.component.html',
  styleUrls: ['./totem-special.component.scss'],
})
export class TotemSpecialComponent implements OnInit {
  @Input() activeTotems: number = 2;
  @Input() totalTotems: number = 6;
  totems: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.activeTotems; i++) {
      this.totems.push({
        active: true,
      });
    }
    for (let i = 0; i < this.totalTotems - this.activeTotems; i++) {
      this.totems.push({
        active: false,
      });
    }
  }
}
