import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stat } from '../domain/models/stat.model';
import { getItem, setItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';
import { UserDataUseCase } from '../domain/usecases/user-data.usecase';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  userStats: BehaviorSubject<Stat>

  constructor(private userData: UserDataUseCase) {
    this.userStats = new BehaviorSubject<Stat>(new Stat);
  }

  async updateStats(stats: Stat) {

    setItem(STORAGE.userStats, stats);
    setItem('lastTotemUpdateDate', new Date());

    this.userStats.next(stats);

    await this.userData.updateStats(this.userStats.value)
      .catch(e => console.error("There was an error updating the stats"));
  }

  syncStats() {
    return this.userData.stats();
  }

  getStats(): Observable<Stat> {
    return this.userStats.asObservable();
  }
}
