import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';

import { Stat } from '@domain/models/stat.model';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';

import { getItem, setItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Output() public updateTotems = new EventEmitter();

  lastTotemUpdate: DateTime = DateTime.fromISO(getItem('lastTotemUpdateDate'));
  indexHours: number = 0.33333333333333333333333;

  nextTotemUpdate: DateTime;
  timeDiff: any;
  possibleTotems: number;
  nextTotemUpdateDate: Date;
  lastTotemUpdateDate: Date;
  interval: any;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  stats: Stat;

  constructor(private userData: UserDataUseCase) {}

  ngOnInit(): void {
    this.setData();

    this.interval = setInterval(() => {
      var now = new Date().getTime();

      var distance = this.nextTotemUpdateDate.getTime() - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        if (this.stats.generalTotems < 4) {
          this.stats.generalTotems++;
        }
        this.setLastTotemUpdate();
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async setLastTotemUpdate() {
    this.lastTotemUpdate = DateTime.now();

    const newStats: Stat = {
      ...this.stats,
      generalTotems: this.stats.generalTotems,
    };

    await this.userData.updateStats(newStats);

    this.updateLastTotemUpdate();

    this.nextTotemUpdateDate = new Date(this.nextTotemUpdate.toISO());
    this.lastTotemUpdateDate = new Date(this.lastTotemUpdate.toISO());
    setItem('lastTotemUpdateDate', this.lastTotemUpdateDate);

    this.updateTotems.emit();
  }

  calculateTimeDiff() {
    this.timeDiff = DateTime.now()
      .diff(this.lastTotemUpdate, 'hours')
      .toObject().hours;

  }

  updateLastTotemUpdate() {
    while (this.timeDiff > this.indexHours) {
      this.timeDiff -= this.indexHours;
      this.lastTotemUpdate = this.lastTotemUpdate.plus({
        hours: this.indexHours,
      });
    }

    this.nextTotemUpdate = this.lastTotemUpdate.plus({
      hours: this.indexHours,
    });
  }

  calculateTotems() {
    this.possibleTotems = Math.floor(this.timeDiff / this.indexHours);

    if (this.stats.generalTotems < 4) {
      if (this.possibleTotems >= 4) {
        this.stats.generalTotems = 4;
      } else {
        while (this.possibleTotems > 0 && this.stats.generalTotems < 4) {
          this.stats.generalTotems++;
          this.possibleTotems--;
        }
      }
    }
  }

  async updateStats() {

    const newStats: Stat = {
      ...this.stats,
      generalTotems: this.stats.generalTotems,
    };

    await this.userData.updateStats(newStats);
  }

  async getUserStats() {
    this.stats = getItem(STORAGE.userStats);
  }
  async setData() {
    if (!getItem('lastTotemUpdateDate')) {
      setItem('lastTotemUpdateDate', new Date());
    }

    await this.getUserStats();

    this.calculateTimeDiff();

    this.calculateTotems();

    this.updateLastTotemUpdate();

    this.nextTotemUpdateDate = new Date(this.nextTotemUpdate.toISO());
    this.lastTotemUpdateDate = new Date(this.lastTotemUpdate.toISO());
    setItem('lastTotemUpdateDate', this.lastTotemUpdateDate);

    this.updateStats();
  }
}
