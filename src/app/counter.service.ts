import { Injectable } from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private obsIntervale = interval(1000);
  private valueSubj = new BehaviorSubject<number>(0);
  private subscription: Subscription;
  valueObs: Observable<number> = this.valueSubj.asObservable();


  constructor() {}

  reset() {
    this.valueSubj.next(0);
  }

  pause() {
    this.unsubscribe();
  }

  start() {
    this.unsubscribe();
    this.subscription = this.obsIntervale.subscribe(
      () => this.valueSubj.next( this.valueSubj.getValue() + 1 )
    );
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
