import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { signupStart } from '~/auth/state/auth.actions';
import { setLoadingSpinner } from '~/store/shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  controls = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  };

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.signupForm = formBuilder.group(this.controls);
  }

  ngOnInit(): void {
    // this.signupForm = this.formBuilder.group(this.controls);
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const { email, password } = this.signupForm.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }
}
