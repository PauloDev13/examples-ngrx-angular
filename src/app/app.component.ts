import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TSharedState } from '~/interfaces/shared-state.interface';
import { TAppState } from '~/store/app.state';
import { selectShared } from '~/store/shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Example NgRx';
  showLoading$: Observable<TSharedState>;

  constructor(private store: Store<TAppState>) {
    this.showLoading$ = this.store.select(selectShared);
  }

  ngOnInit(): void {}
}
