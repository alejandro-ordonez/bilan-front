import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-espiritus-bar',
  templateUrl: './espiritus-bar.component.html',
  styleUrls: ['./espiritus-bar.component.scss'],
})
export class EspiritusBarComponent implements OnInit {
  @Input() espiritus: number = 1;
  spirits: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    for (var i = 0; i < this.espiritus; i++) {
      this.spirits.push({
        active: true,
      });
    }
  }
}
