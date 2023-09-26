import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Response } from '@domain/models/response.model';
import { User } from '@domain/models/user.model';
import { API, STORAGE } from '@frameworks/config/Constants';
import { getItem, setItem } from '@frameworks/storage/Storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _user?: User = undefined;
  private _isLoggedIn: boolean = false;

  constructor() {
  }

  set user(user: User | undefined){
    this._user = user;
    this._isLoggedIn = true;
    setItem(STORAGE.userInfo, user);
  }

  get user(): User | undefined{
    return this._user?? getItem(STORAGE.userInfo);
  }

  getToken() {
    return getItem(STORAGE.auth);
  }

  isLoggedIn() {
    const token = this.getToken();
    const helper = new JwtHelperService();
    const isLogged = !helper.isTokenExpired(token);
    return isLogged;
  }
}
