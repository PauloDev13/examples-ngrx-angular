import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '~/../environments/environment.prod';
import { TAuthResponseData } from '~/interfaces/auth-response-data.interface';
import { TAuthProps } from '~/interfaces/auth.interface';
import { UserModel } from '~/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: TAuthProps): Observable<TAuthResponseData> {
    return this.http.post<TAuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true },
    );
  }

  formatUser({ email, idToken, localId, expiresIn }: TAuthResponseData): UserModel {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    return new UserModel(email, idToken, localId, expirationDate);
  }
}
