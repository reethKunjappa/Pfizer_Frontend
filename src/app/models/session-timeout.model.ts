// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable()
export class SessionTimeoutData {

    idleTimeout : number = 900; // In seconds
    timeout : number = 840; // In seconds

    constructor() { }
}