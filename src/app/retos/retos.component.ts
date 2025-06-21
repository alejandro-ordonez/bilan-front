import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Stat } from '@domain/models/stat.model';

import { Router } from '@angular/router';

import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { Action, Challenge, GameInfo, Tribe } from '@domain/models/game.model';
import { getItem, setItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';
import { User } from '@domain/models/user.model';
import { StatsService } from '../services/stats-service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss'],
})
export class RetosComponent implements OnInit {
  currentTribeName: string;
  isValidModule: boolean = true;
  currentTribe: Tribe;
  currentActionName: string;
  currentAction: Action;
  challenges: Challenge[];
  stats: Stat;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService,
    private userData: UserDataUseCase,
    private router: Router
  ) {}

  public get totalTotems(): number{
    return this.stats.analyticalTotems + this.stats.criticalTotems + this.stats.generalTotems;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTribeName = params.materia;
      this.currentActionName = params.type;
    });
    this.manageData();
    this.isValidModule = !!this.currentTribe.id && !!this.currentAction.id;
  }

  manageData = async () => {
    const gameInfo: GameInfo = getItem(STORAGE.gameInfo);
    this.stats = getItem(STORAGE.userStats);

    this.currentTribe =
      gameInfo.tribes?.find((tribe: any) => {
        if (
          tribe.name?.replace(' ', '-')?.replace('á', 'a').toLowerCase() ===
          this.currentTribeName
        ) {
          return tribe;
        }
      }) || {};

    this.currentAction =
      gameInfo.actions.find((action: Action) => {
        if (
          action.name?.replace('ó', 'o').toLowerCase() ===
          this.currentActionName
        ) {
          return action;
        }
      }) || {};

    if (this.currentAction.id === 1) {
      this.challenges = [
        gameInfo.challenges[3],
        gameInfo.challenges[8],
        gameInfo.challenges[4],
      ];
    }
    if (this.currentAction.id === 2) {
      this.challenges = [
        gameInfo.challenges[0],
        gameInfo.challenges[1],
        gameInfo.challenges[2],
      ];
    }
    if (this.currentAction.id === 3) {
      this.challenges = [
        gameInfo.challenges[5],
        gameInfo.challenges[6],
        gameInfo.challenges[7],
      ];
    }

    this.user = await this.userData.info();
  };

  async goToReto(challenge: Challenge) {
    if (this.totalTotems < challenge.cost) {
      return;
    }
    
    let debt = challenge.cost;

    this.stats.analyticalTotems -= debt;
      
    // Cascade until it deducts from general totems.
    if(this.stats.analyticalTotems < 0)
      this.stats.criticalTotems += this.stats.analyticalTotems;
      this.stats.analyticalTotems = 0;

    if(this.stats.criticalTotems < 0){
      this.stats.generalTotems += this.stats.criticalTotems;
      this.stats.criticalTotems = 0;
    }

    const newStats: Stat = {
      ...this.stats,
      actionsPoints: this.stats.actionsPoints ? this.stats.actionsPoints : [],
    };

    await this.statsService.updateStats(newStats);

    const path = `modulos/${this.currentTribeName}/retos/${this.currentActionName}/${challenge.id}/${this.user.metadata.grade || 10}/${challenge.name}`
    this.router.navigateByUrl(path);
  }

  getChallengeName(challenge: Challenge) {
    if (!challenge.name) {
      return '';
    } else {
      const splited = challenge?.name?.split(' ');
      if (challenge.id === 4) {
        return `elementos/${this.currentTribeName}`;
      }
      return splited
        ? splited[splited.length - 1]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        : '';
    }
  }
}
