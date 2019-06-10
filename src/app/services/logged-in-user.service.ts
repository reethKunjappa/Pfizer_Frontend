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
    
  constructor() {}

  getNativeWindowRef() {
    if (window['loggedInUser']) {
      this.loggedInUserData = window['loggedInUser'];
      return this.loggedInUserData;
    }else {
      this.loggedInUserData = JSON.parse(localStorage.getItem('loggedInUser'));
      return this.loggedInUserData;
    }
  }

}
