// Dependency Imports
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class LoggedInUserService {

  // Property Declarations
  public loggedInUserData: any;

  // RXJS BehaviorSubject Property Declarations
  public _loggedInUser$: BehaviorSubject<any> = new BehaviorSubject<any>(this.loggedInUserData);
  public _loggedInUser = this._loggedInUser$.asObservable();   // asObservable declarations for listening to the BehaviorSubject Property

  constructor() { }

  getNativeWindowRef() {
    if (window['loggedInUser']) {
      this.loggedInUserData = window['loggedInUser'];
      this._loggedInUser$.next(this.loggedInUserData);
      return this.loggedInUserData;
    }else {
      this.loggedInUserData = JSON.parse(localStorage.getItem('loggedInUser'));
      this._loggedInUser$.next(this.loggedInUserData);
      return this.loggedInUserData;
    }
  }

}
