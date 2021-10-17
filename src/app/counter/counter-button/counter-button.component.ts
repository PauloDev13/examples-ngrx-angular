import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TAppState } from '../../store/app.state';
import { decrement, increment, reset } from '../state/counter.actions';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.scss'],
})
export class CounterButtonComponent implements OnInit {
  constructor(private store: Store<TAppState>) {}

  ngOnInit(): void {}

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
