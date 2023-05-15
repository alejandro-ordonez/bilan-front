import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor-intro',
  templateUrl: './sponsor-intro.component.html',
  styleUrls: ['./sponsor-intro.component.scss'],
})
export class SponsorIntroComponent implements OnInit, OnDestroy {
  timeOut: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timeOut = setTimeout(() => {
      this.router.navigateByUrl('/description');
    }, 5000);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }
}
