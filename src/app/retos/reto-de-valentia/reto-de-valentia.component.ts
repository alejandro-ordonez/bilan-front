import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerRecord, Stat, TribePoint } from '@domain/models/stat.model';
import { GameUseCase } from '@domain/usecases/game.usecase';
import { Router } from '@angular/router';
import { Option } from '@ui/components/select/select.component';

import { DateTime } from 'luxon';

import {
  Answer,
  GameInfo,
  Challenge,
  Tribe,
  Action,
  Question,
  ValidateQuestionRequest,
} from '@domain/models/game.model';
import { getItem, setItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';

@Component({
  selector: 'app-reto-de-valentia',
  templateUrl: './reto-de-valentia.component.html',
  styleUrls: ['./reto-de-valentia.component.scss'],
})
export class RetoDeValentiaComponent implements OnInit, OnDestroy {
  @ViewChild('challengeFinished')
  private challengeFinishedTpl: TemplateRef<any>;

  @ViewChild('answerWrong')
  private answerWrongTpl: TemplateRef<any>;

  @ViewChild('answerCorrect')
  private answerCorrectTpl: TemplateRef<any>;

  initChallengeTime: DateTime;
  finishChallengeTime: DateTime;
  challengeDuration: any;

  selectedAnswer: Answer;

  stats: Stat;
  challenges: Challenge[];
  currentTribe: Tribe;
  currentAction: Action;
  currentActionName: string;
  currentChallenge: Challenge;
  currentTribeName: string;
  challengeId: number;
  grade: number;
  totalQuestions: number;

  currentQuestionNumber: number;
  currentQuestion: Question;
  questions: Question[];
  challengePoints: number = 0;
  difficulty: number = 0;
  answerRecords: AnswerRecord[] = [];

  braveOptions: Option[];
  braveForm: FormGroup;

  challengeName: string;

  label: string = 'Nivel De Valentia En Esta Pregunta';

  constructor(
    private route: ActivatedRoute,
    private userStats: UserDataUseCase,
    private modal: NgbModal,
    private game: GameUseCase,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.braveOptions = [
      {
        key: 1,
        value: '1',
      },
      {
        key: 2,
        value: '2',
      },
      {
        key: 3,
        value: '3',
      },
      {
        key: 4,
        value: '4',
      },
      {
        key: 5,
        value: '5',
      },
    ];

    this.braveForm = this.fb.group({
      braveLevel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initChallengeTime = DateTime.now();
    this.route.params.subscribe((params: Params) => {
      this.currentTribeName = params.materia;
      this.currentActionName = params.type;
      this.challengeId = params.challenge || '3';

      this.grade = params.grade;
      this.challengeName = params.name;
      const stats: Stat = getItem(STORAGE.userStats);
      this.stats = stats;
    });

    if (this.challengeName === 'Reto del Elemento') {
      this.braveOptions = [
        {
          key: 1,
          value: '1 Agua',
        },
        {
          key: 2,
          value: '2 Aire',
        },
        {
          key: 3,
          value: '3 Luz',
        },
        {
          key: 4,
          value: '4 Fuego',
        },
        {
          key: 5,
          value: '5 Tierra',
        },
      ];
      this.label = 'Prueba tu suerte con un elemento';
    }

    this.manageData();
  }

  manageData = async () => {
    const gameInfo: GameInfo = getItem(STORAGE.gameInfo);

    this.challenges = gameInfo.challenges;
    this.currentChallenge = gameInfo.challenges.find((challenge: Challenge) => {
      if (challenge.id?.toString() === this.challengeId.toString()) {
        return challenge;
      }
    }) || { cost: 0 };

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

    this.totalQuestions = this.generateNumberOfQuestions() || 0;

    this.questions = await this.game.getQuestions({
      numberOfQuestions: this.totalQuestions,
      tribeId: this.currentTribe.id || 1,
    });

    this.currentQuestion = this.questions[0];
    this.currentQuestionNumber = 1;
  };

  generateNumberOfQuestions() {
    let allActionPoints = this.stats.tribesPoints
      ?.find((tribe: TribePoint) => tribe.id === this.currentTribe.id)
      ?.actionsPoints.sort((a: any, b: any) => {
        if (!a.score || !b.score) {
          return 0;
        }
        if (a.score > b.score) {
          return 1;
        } else if (a.score < b.score) {
          return -1;
        } else {
          return 0;
        }
      });


    if (!allActionPoints || !allActionPoints[2]) {
      this.difficulty = 2;
    } else {
      this.difficulty =
        allActionPoints[0].actionId === this.currentAction.id
          ? 3
          : allActionPoints[2].actionId === this.currentAction.id
          ? 1
          : 2;
    }

    return 2 + 1 * this.difficulty;
  }

  selectAnswer(answer: Answer) {
    this.questions[this.currentQuestionNumber - 1].answers?.forEach(
      (answer) => {
        answer.selected = false;
      }
    );
    answer.selected = true;

    this.selectedAnswer = answer;
  }

  async finishChallenge() {
    this.openModal(this.challengeFinishedTpl);
    this.goToHome();

    const newStats: Stat = this.userStats.calculateStats(
      this.currentAction,
      this.currentChallenge,
      this.currentTribe,
      this.stats,
      this.answerRecords,
      this.challengePoints,
      this.questions.length
    );
    await this.userStats.updateStats(newStats);
  }

  goToHome() {
    this.router.navigateByUrl(`/modulos`);
  }

  async onAnswer() {
    if (!this.selectedAnswer || this.selectedAnswer.id === 0) {
      return;
    }

    const data: ValidateQuestionRequest = {
      answer: this.selectedAnswer.id,
      questionId: this.currentQuestion.id,
    };

    const isCorrect = await this.game
      .validateQuestion(data)
      .catch((err) => err);

    if (isCorrect) {
      this.challengePoints += Number(this.braveForm.value.braveLevel);
      this.openModal(this.answerCorrectTpl);
    } else {
      this.challengePoints -= Number(this.braveForm.value.braveLevel);
      this.openModal(this.answerWrongTpl);
    }

    this.answerRecords.push({
      answerId: this.selectedAnswer.id,
      questionId: this.currentQuestion.id,
    });


    this.currentQuestionNumber++;

    if (this.currentQuestionNumber > this.questions.length) {
      this.finishChallenge();
      return;
    }
    this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
    this.selectedAnswer = { id: 0 };

  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  ngOnDestroy(): void {
    this.finishChallengeTime = DateTime.now();

    this.challengeDuration = this.finishChallengeTime
      .diff(this.initChallengeTime, 'minutes')
      .toObject().minutes;

    this.userStats.updateStats({
      ...this.stats,
      timeInGame: this.stats.timeInGame + this.challengeDuration,
    });
  }
}
