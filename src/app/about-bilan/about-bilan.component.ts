import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-about-bilan',
  templateUrl: './about-bilan.component.html',
  styleUrls: ['./about-bilan.component.scss'],
})
export class AboutBilanComponent implements OnInit {
  about: string;
  isValidAbout: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.about = params.about;
      this.isValidAbout =
        this.about == 'aprendizaje' ||
        this.about == 'objetivo-del-juego' ||
        this.about == 'el-libro-de-bilan' ||
        this.about == 'pueblos-de-bilan' ||
        this.about == 'faq';
    });
  }
}
