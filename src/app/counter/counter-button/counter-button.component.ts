import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.scss'],
})
export class CounterButtonComponent implements OnInit {
  @Output() handleIncrement = new EventEmitter<void>();
  @Output() handleDecrement = new EventEmitter<void>();
  @Output() handleReset = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onIncrement() {
    this.handleIncrement.emit();
  }

  onDecrement() {
    this.handleDecrement.emit();
  }

  onReset() {
    this.handleReset.emit();
  }
}
