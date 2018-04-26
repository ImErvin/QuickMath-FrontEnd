import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../../model/user';

@Injectable()
export class AuthProvider {

  private baseURL: String = 'https://restify-face-service.herokuapp.com';
  private user: User;

  constructor(private http: Http) { }

  public registerUser(username: String, imageUrl: String): Observable<User> {
    const credentials = {
      username: username,
      imageUrl: imageUrl
    };

    return this.http.post(`${this.baseURL}/accounts/register`, credentials)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public loginUser(username: String, imageUrl: String): Observable<User> {
    const credentials = {
      username: username,
      imageUrl: imageUrl
    };

    return this.http.post(`${this.baseURL}/accounts/login`, credentials)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
      
  }
}
