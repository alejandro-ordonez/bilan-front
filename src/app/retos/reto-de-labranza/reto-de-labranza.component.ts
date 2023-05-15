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
  selector: 'app-reto-de-labranza',
  templateUrl: './reto-de-labranza.component.html',
  styleUrls: ['./reto-de-labranza.component.scss'],
})
export class RetoDeLabranzaComponent implements OnInit, OnDestroy {
  @ViewChild('challengeFinished')
  private challengeFinishedTpl: TemplateRef<any>;

  @ViewChild('answerWrong')
  private answerWrongTpl: TemplateRef<any>;

  @ViewChild('answerCorrect')
  private answerCorrectTpl: TemplateRef<any>;

  initChallengeTime: DateTime;
  finishChallengeTime: DateTime;
  challengeDuration: any;

  selectedAnswer: Answer | undefined;

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
  difficulty: number = 0;
  answerRecords: AnswerRecord[] = [];

  challengePoints: number = 0;
  temporalPoints: number = 0;
  securePoints: number = 0;

  challengeName: string;

  constructor(
    private route: ActivatedRoute,
    private userStats: UserDataUseCase,
    private modal: NgbModal,
    private game: GameUseCase,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initChallengeTime = DateTime.now();
    this.route.params.subscribe((params: Params) => {
      this.currentTribeName = params.materia;
      this.currentActionName = params.type;
      this.challengeId = params.challenge || '5';

      this.grade = params.grade;
      this.challengeName = params.name;
      const stats: Stat = getItem(STORAGE.userStats);
      this.stats = stats;
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
    return 3;
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

  async onAnswer(userAnswer: boolean) {
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

    if (userAnswer && isCorrect) {
      this.securePoints += 4;
      this.challengePoints += 4;

      this.openModal(this.answerCorrectTpl);
    } else if (!userAnswer && !isCorrect) {
      this.challengePoints += 2;

      this.openModal(this.answerCorrectTpl);
    } else if (!userAnswer && isCorrect) {
      this.challengePoints = 0;
      this.challengePoints = this.securePoints;
      this.openModal(this.answerWrongTpl);
    } else if (userAnswer && !isCorrect) {
      this.challengePoints = 0;
      this.challengePoints = this.securePoints;
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
    this.selectedAnswer = undefined;
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
      timeInGame: this.challengeDuration,
    });
  }
}
