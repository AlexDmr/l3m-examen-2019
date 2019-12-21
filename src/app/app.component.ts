import { Component } from '@angular/core';
import {CounterService} from './counter.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  a = 0;
  b = 128;
  dim = 8;

  constructor(private bs: CounterService) {
  }

  get dimensions(): number[] {
    return new Array(this.dim).fill(0).map( (v, i) => i + 1);
  }

  get maxValue(): number {
    return Math.pow(2, this.dim) - 1;
  }

  get valueObs(): Observable<number> {
    return this.bs.valueObs;
  }

  reset() {
    this.bs.reset();
  }

  pause() {
    this.bs.pause();
  }

  start() {
    this.bs.start();
  }

}
