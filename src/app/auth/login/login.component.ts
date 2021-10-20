import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { loginStart } from '~/auth/state/auth.actions';
import { TAppState } from '~/store/app.state';
import { setLoadingSpinner } from '~/store/shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  controls = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  };

  constructor(private formBuilder: FormBuilder, private store: Store<TAppState>) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(this.controls);
  }

  onLoginSubmit() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(setLoadingSpinner({ status: { showLoading: true } }));
    this.store.dispatch(loginStart({ email, password }));
    this.loginForm.reset();
  }
}
