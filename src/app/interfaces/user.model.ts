export class UserModel {
  constructor(
    private _email: string,
    private _token: string,
    private _localId: string,
    private _expirationDate: Date,
  ) {}

  get expirationDate(): Date {
    return this._expirationDate;
  }

  get email(): string {
    return this._email;
  }

  get token(): string {
    return this._token;
  }

  get localId(): string {
    return this._localId;
  }
}
