import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit {
  counter$!: Observable<number>;

  // counter!: number;

  constructor(private store: Store<{ counter: ICounterState }>) {}

  ngOnInit(): void {
    this.counter$ = this.store.select('counter').pipe(map((counter) => counter.counter));
  }
}
