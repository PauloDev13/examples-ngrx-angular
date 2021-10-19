import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TAuthProps } from '~/interfaces/auth.interface';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: TAuthProps) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true },
    );
  }
}
