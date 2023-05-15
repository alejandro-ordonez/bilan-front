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
import { getItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';

@Component({
  selector: 'app-reto-de-los-espiritus',
  templateUrl: './reto-de-los-espiritus.component.html',
  styleUrls: ['./reto-de-los-espiritus.component.scss'],
})
export class RetoDeLosEspiritusComponent implements OnInit, OnDestroy {
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
  totalQuestions: number = 0;

  currentQuestionNumber: number;
  currentQuestion: Question;
  questions: Question[];
  challengePoints: number = 0;
  difficulty: number = 0;
  answerRecords: AnswerRecord[] = [];

  questionNumberOptions: Option[];
  questionNumberForm: FormGroup;

  onQuestionNumber: boolean = true;
  onQuestionChoice: boolean = false;
  onQuestion: boolean = false;

  challengeName: string;

  constructor(
    private route: ActivatedRoute,
    private userStats: UserDataUseCase,
    private modal: NgbModal,
    private game: GameUseCase,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.questionNumberOptions = [
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
    ];

    this.questionNumberForm = this.fb.group({
      questionNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initChallengeTime = DateTime.now();
    this.route.params.subscribe((params: Params) => {
      this.currentTribeName = params.materia;
      this.currentActionName = params.type;
      this.challengeId = params.challenge || '2';

      this.grade = params.grade;
      this.challengeName = params.name;
      const stats: Stat = getItem(STORAGE.userStats);
      this.stats = stats;
    });

    this.manageData();
    this.calculateDifficult();
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
  };

  getQuestions = async () => {
    this.totalQuestions = this.generateNumberOfQuestions() || 0;

    this.questions = await this.game.getQuestions({
      numberOfQuestions: this.totalQuestions,
      tribeId: this.currentTribe.id || 1,
    });

    this.currentQuestion = this.questions[0];
    this.currentQuestionNumber = 1;
    this.onQuestionNumber = false;
    this.onQuestionChoice = true;
    this.onQuestion = false;
  };

  generateNumberOfQuestions() {
    return this.questionNumberForm.value.questionNumber * 2;
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
      this.questions.length / 2
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
      this.challengePoints +=
        this.getRandomBetween(0, 2) + this.currentQuestionNumber;
      this.answerRecords.push({
        answerId: this.selectedAnswer.id,
        questionId: this.currentQuestion.id,
      });
      this.openModal(this.answerCorrectTpl);
    } else {
      this.challengePoints -= this.getRandomBetween(0, 5) + this.difficulty;
      this.openModal(this.answerWrongTpl);
    }

    this.currentQuestionNumber++;

    if (this.currentQuestionNumber > this.questions.length / 2) {
      this.finishChallenge();
      return;
    }
    this.selectedAnswer = { id: 0 };

    this.onQuestionNumber = false;
    this.onQuestionChoice = true;
    this.onQuestion = false;
  }

  getRandomBetween(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  selectAnswer(answer: Answer) {
    this.currentQuestion.answers?.forEach((answer) => {
      answer.selected = false;
    });
    answer.selected = true;

    this.selectedAnswer = answer;
  }

  chooseQuestion(question: Question) {
    this.currentQuestion = question;

    this.onQuestionNumber = false;
    this.onQuestionChoice = false;
    this.onQuestion = true;
  }

  calculateDifficult() {
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
