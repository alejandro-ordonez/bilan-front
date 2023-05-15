import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerRecord, Stat, TribePoint } from '@domain/models/stat.model';
import { GameUseCase } from '@domain/usecases/game.usecase';
import { Router } from '@angular/router';

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
  selector: 'app-retos-preguntas',
  templateUrl: './retos-preguntas.component.html',
  styleUrls: ['./retos-preguntas.component.scss'],
})
export class RetosPreguntasComponent implements OnInit, OnDestroy {
  @ViewChild('challengeFinished')
  private challengeFinishedTpl: TemplateRef<any>;

  @ViewChild('challengeStoped')
  private challengeStopedTpl: TemplateRef<any>;

  @ViewChild('challengeFailed')
  private challengeFailedTpl: TemplateRef<any>;

  @ViewChild('answerWrong')
  private answerWrongTpl: TemplateRef<any>;

  @ViewChild('answerCorrect')
  private answerCorrectTpl: TemplateRef<any>;

  buttonIsDisabled: boolean = false;

  initChallengeTime: DateTime;
  finishChallengeTime: DateTime;
  challengeDuration: any;

  quitButton: Boolean = false;
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
  townPoint: boolean = false;
  challengePoints: number = 0;
  difficulty: number = 0;
  answerRecords: AnswerRecord[] = [];

  challengeName: string;

  constructor(
    private route: ActivatedRoute,
    private userStats: UserDataUseCase,
    private modal: NgbModal,
    private game: GameUseCase,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initChallengeTime = DateTime.now();
    this.route.params.subscribe((params: Params) => {
      this.currentTribeName = params.materia;
      this.currentActionName = params.type;
      this.challengeId = params.challenge || '1';

      this.grade = params.grade;
      const stats: Stat = getItem(STORAGE.userStats);
      this.stats = stats;

      this.challengeName = params.name;
    });

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

    if (!allActionPoints) {
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
    this.openModalRegular(this.challengeFinishedTpl);
    this.goToHome();

    const extraPoints = this.townPoint ? 4 : 0;

    const newStats: Stat = this.userStats.calculateStats(
      this.currentAction,
      this.currentChallenge,
      this.currentTribe,
      this.stats,
      this.answerRecords,
      this.challengePoints + extraPoints,
      this.questions.length
    );
    await this.userStats.updateStats(newStats);
  }

  async stopedChallenge() {
    this.openModalRegular(this.challengeStopedTpl);

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
    this.goToHome();
  }

  async quitChallenge() {
    this.buttonIsDisabled = true;
    this.openModalRegular(this.challengeFinishedTpl);

    const newStats: Stat = this.userStats.calculateStats(
      this.currentAction,
      this.currentChallenge,
      this.currentTribe,
      this.stats,
      this.answerRecords,
      this.challengePoints / 2,
      this.questions.length
    );
    await this.userStats.updateStats(newStats);
    this.goToHome();
    this.buttonIsDisabled = false;
  }

  goToHome() {
    this.router.navigateByUrl(`/modulos`);
  }

  openModal(modalCorrect: any, modalWrong: any, correctAnswer: boolean) {
    if (correctAnswer) {
      this.modal.open(modalCorrect, {
        size: 'lg',
        centered: true,
        scrollable: true,
      });
    } else {
      this.modal.open(modalWrong, {
        size: 'lg',
        centered: true,
        scrollable: true,
      });
    }
  }
  async onAnswer(stoped?: Boolean) {
    this.buttonIsDisabled = true;
    // validar pregunta
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
      this.challengePoints += 0 + this.difficulty + this.currentQuestionNumber;
      this.answerRecords.push({
        answerId: this.selectedAnswer.id,
        questionId: this.currentQuestion.id,
      });
    } else {
      this.openModalRegular(this.answerWrongTpl);

      this.challengePoints = 0;
      this.goToHome();
      return;
    }

    if (stoped) {
      this.stopedChallenge();
      return;
    }

    if (this.currentQuestionNumber >= 2) {
      this.townPoint = true;
      this.quitButton = true;
    }
    this.currentQuestionNumber++;

    if (this.currentQuestionNumber > this.questions.length) {
      this.finishChallenge();
      return;
    }
    this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
    this.selectedAnswer = { id: 0 };

    this.openModalRegular(this.answerCorrectTpl);
    this.buttonIsDisabled = false;
  }
  openModalRegular(contenido: any) {
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
