import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the ScoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScoresProvider {

  constructor(public http: Http) {
  }

  private baseURL: String = 'https://restify-face-service.herokuapp.com';

  public updateAddition(username: String, additionScore: Number): Observable<void> {
    const payload = {
      username: username,
      score: additionScore
    };

    return this.http.put(`${this.baseURL}/scores/addition`, payload)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public updateSubtraction(username: String, additionScore: Number): Observable<void> {
    const payload = {
      username: username,
      score: additionScore
    };

    return this.http.put(`${this.baseURL}/scores/subtraction`, payload)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public updateMultiplication(username: String, additionScore: Number): Observable<void> {
    const payload = {
      username: username,
      score: additionScore
    };

    return this.http.put(`${this.baseURL}/scores/multiplication`, payload)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }
}
