import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [CounterComponent, CounterOutputComponent, CounterButtonComponent],
  imports: [CommonModule, CounterRoutingModule],
  exports: [CounterComponent],
})
export class CounterModule {}
