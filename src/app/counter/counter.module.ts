import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';
import { counterReducer } from './state/counter.reducer';

@NgModule({
  declarations: [CounterComponent, CounterOutputComponent, CounterButtonComponent],
  imports: [
    CommonModule,
    CounterRoutingModule,
    StoreModule.forRoot({ counter: counterReducer }),
  ],
  exports: [CounterComponent],
})
export class CounterModule {}
