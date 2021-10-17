import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCounter } from '../state/counter.selectors';
import { TCounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit {
  counter$!: Observable<TCounterState>;

  constructor(private store: Store<{ counter: TCounterState }>) {}

  ngOnInit(): void {
    this.counter$ = this.store.select(selectCounter);
  }
}
