import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TAppState } from '~/store/app.state';
import { selectErrorMessage, selectShared } from '~/store/shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Example NgRx';
  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<TAppState>) {
    this.showLoading$ = this.store.select(selectShared);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  ngOnInit(): void {}
}
