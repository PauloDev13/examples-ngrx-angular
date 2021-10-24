import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { autoLogout } from '~/auth/state/auth.actions';
import { selectIsAuthenticated } from '~/auth/state/auth.selectors';
import { TAppState } from '~/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store<TAppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
