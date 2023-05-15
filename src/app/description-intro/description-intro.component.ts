import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description-intro',
  templateUrl: './description-intro.component.html',
  styleUrls: ['./description-intro.component.scss'],
})
export class DescriptionIntroComponent implements OnInit, OnDestroy {
  timeOut: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timeOut = setTimeout(() => {
      this.router.navigateByUrl('/inicio');
    }, 5000);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }
}
