import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionPoint, Stat, TribePoint } from '@domain/models/stat.model';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { getItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';
import { Action, Challenge, GameInfo, Tribe } from '@domain/models/game.model';

@Component({
  selector: 'app-intro-retos',
  templateUrl: './intro-retos.component.html',
  styleUrls: ['./intro-retos.component.scss'],
})
export class IntroRetosComponent implements OnInit {
  stats: Stat;
  actions: Action[];

  isValidModule: boolean = true;
  currentTribe: Tribe;
  currentTribeName: string;
  actionPoints: ActionPoint[] = [];

  constructor(private route: ActivatedRoute, private modal: NgbModal) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTribeName = params.materia;
      this.manageData();
      this.isValidModule = !!this.currentTribe.id;
    });
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  manageData = () => {
    const gameInfo: GameInfo = getItem(STORAGE.gameInfo);
    const stats: Stat = getItem(STORAGE.userStats);

    this.currentTribe =
      gameInfo.tribes?.find((tribe: any) => {
        if (
          tribe.name?.replace(' ', '-')?.replace('á', 'a').toLowerCase() ===
          this.currentTribeName
        ) {
          return tribe;
        }
      }) || {};

    this.actions = gameInfo.actions;

    if (stats.tribesPoints) {
      const points: any = stats.tribesPoints?.find((tribePoint: TribePoint) => {
        if (tribePoint.id === this.currentTribe.id) {
          return tribePoint;
        }
      });
      this.actionPoints = points ? points.actionsPoints : [];
    } else {
      this.actionPoints = [];
    }
  };

  getActionScore(actionId: number) {
    const actionPoint: any = this.actionPoints.find(
      (action: ActionPoint) => action.actionId === actionId
    );

    return actionPoint ? actionPoint.score : 0;
  }
}
