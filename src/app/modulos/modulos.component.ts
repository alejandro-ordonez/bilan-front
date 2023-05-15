import { Component, OnInit } from '@angular/core';
import { Stat, TribePoint } from '@domain/models/stat.model';
import { GameInfo, Tribe } from '@domain/models/game.model';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { GameUseCase } from '@domain/usecases/game.usecase';
import { setItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss'],
})
export class ModulosComponent implements OnInit {
  tribes: Tribe[] = [];
  stats: Stat;
  balance: TribePoint[] = [];
  currentCycle: any;
  courseData: any;
  constructor(
    private userData: UserDataUseCase,
    private gameData: GameUseCase
  ) {
    this.getGameData.bind(this);
  }

  ngOnInit(): void {
    this.getGameData();
    this.courseData = localStorage.getItem('classTeacher') ? localStorage.getItem('classTeacher') : '';
  }

  async getGameData() {
    this.stats = await this.userData.stats().toPromise();
    setItem(STORAGE.userStats, this.stats);

    const response: GameInfo = await this.gameData.getGameInfo();
    setItem(STORAGE.gameInfo, response);

    this.tribes = response.tribes || [];
    this.balance = this.stats.tribesBalance || [];
    const tribeIndex = this.stats.currentCycle
      ? this.stats.currentCycle - 1
      : 0;
    this.currentCycle = this.tribes[tribeIndex].element;
  }

  getTribePoints(tribeId: number): number | undefined {
    if (this.stats) {
      const tribePoints: TribePoint | undefined = this.stats.tribesPoints?.find(
        (tribesPoints: TribePoint) => tribesPoints.id === tribeId
      );
      return tribePoints && tribePoints.score ? tribePoints.score : 0;
    }
  }
}
