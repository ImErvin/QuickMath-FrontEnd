import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from '../../model/user';

@Injectable()
export class AuthProvider {

  private baseURL: String = 'https://restify-face-service.herokuapp.com';
  private user: User;

  constructor(private http: Http) { }

  public registerUser(username: String, imageUrl: String): void {
    const credentials = {
      username: username,
      imageUrl: imageUrl
    };

    this.http.post(`${this.baseURL}/accounts/register`, credentials)
      .map((res) => res.json())
      .subscribe((JSONResponse: User) => {
        this.user = JSONResponse;
        console.log('Logging out user from JSON response', this.user);
      });
  }

  public loginUser(username: String, imageUrl: String): void {
    const credentials = {
      username: username,
      imageUrl: imageUrl
    };

    this.http.post(`${this.baseURL}/accounts/login`, credentials)
      .map((res) => res.json())
      .subscribe((JSONResponse: User) => {
        this.user = JSONResponse;
        console.log('Logging out user from JSON response', this.user);
      });
  }
}
