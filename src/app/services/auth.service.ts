import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from '~/../environments/environment.prod';
import { autoLogout } from '~/auth/state/auth.actions';
import { TAuthResponseData } from '~/interfaces/auth-response-data.interface';
import { TAuthProps } from '~/interfaces/auth.interface';
import { UserModel } from '~/interfaces/user.model';
import { TAppState } from '~/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;

  constructor(private http: HttpClient, private store: Store<TAppState>) {}

  login({ email, password }: TAuthProps): Observable<TAuthResponseData> {
    return this.http.post<TAuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true },
    );
  }

  logout() {
    localStorage.removeItem('user');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

  signup({ email, password }: TAuthProps): Observable<TAuthResponseData> {
    return this.http.post<TAuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true },
    );
  }

  setUserLocalStorage(user: UserModel) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.runTimeoutInterval(user);
  }

  formatUser({ email, idToken, localId, expiresIn }: TAuthResponseData): UserModel {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    return new UserModel(email, idToken, localId, expirationDate);
  }

  getUserFromLocalStorage() {
    const userLocalStorage = localStorage.getItem('user');

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      const expirationDate = new Date(userData._expirationDate);
      const user = new UserModel(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate,
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        return 'E-mail e/ou Senha inválido';
      case 'USER_DISABLED':
        return 'Usuário bloqueado';
      case 'EMAIL_EXISTS':
        return 'Usuário já cadastrado para esse e-mail';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Todos os acessos foram bloqueados. Tente mais tarde';
      default:
        return 'Erro inesperado. Tente novamente';
    }
  }

  private runTimeoutInterval(user: UserModel) {
    const todayDate = new Date().getTime();
    const expirationDate = user.expirationDate.getTime();
    const timeInterval = expirationDate - todayDate;
    console.log('timeInterval ' + timeInterval);

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }
}
