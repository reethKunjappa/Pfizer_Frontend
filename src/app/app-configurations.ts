// Dependency Imports
import { Injectable } from '@angular/core';

// Model Imports
import { SessionTimeoutData } from './models/session-timeout.model';

@Injectable({
    providedIn : 'root'
})

export class AppConfigurations {

    // Property Declarations
    public sessionTimeoutData : SessionTimeoutData = new SessionTimeoutData();

  constructor() {
    this.sessionTimeoutData.idleTimeout = 60;
    this.sessionTimeoutData.timeout = 50;
  }

  getSessionTimeoutData() {
      return this.sessionTimeoutData;
  }

}