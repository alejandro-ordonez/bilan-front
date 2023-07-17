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
  totalTotems: number = 0;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService,
    private userData: UserDataUseCase,
    private router: Router
  ) {}

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

    const analyticalTotems = Math.max(0, this.stats.analyticalTotems);
    const criticalTotems = Math.max(0, this.stats.criticalTotems);
    const generalTotems = Math.max(0, this.stats.generalTotems);

    this.totalTotems = analyticalTotems + criticalTotems + generalTotems;

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

  async subtractTotems(totemCost: number) {
    this.totalTotems =
      this.totalTotems - totemCost < 0 ? 0 : this.totalTotems - totemCost;
  }

  async goToReto(challenge: Challenge) {
    if (this.totalTotems < challenge.cost) {
      return;
    }
    this.subtractTotems(challenge.cost);
    const newStats: Stat = {
      ...this.stats,
      generalTotems: Math.max(0, this.totalTotems <= 4 ? this.totalTotems : 4),
      analyticalTotems: Math.max(
        0,
        this.totalTotems > 4 || this.totalTotems <= 7
          ? this.totalTotems - 4
          : this.totalTotems > 7
          ? 3
          : 0
      ),
      criticalTotems: Math.max(
        0,
        this.totalTotems > 7 ? this.totalTotems - 7 : 0
      ),
      actionsPoints: this.stats.actionsPoints ? this.stats.actionsPoints : [],
    };

    await this.statsService.updateStats(newStats);

    this.router.navigateByUrl(
      `modulos/${this.currentTribeName}/retos/${this.currentActionName}/${
        challenge.id
      }/${this.user.metadata.grade || 10}/${challenge.name}`
    );
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
