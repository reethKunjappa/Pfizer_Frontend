// Dependency Imports
import { Injectable } from '@angular/core';

// Model Imports
import { AdminRulesDetailsData } from './admin-rules-details-data.model';

@Injectable()
export class AdminRulesData {

    ruleName : string = "";
    action : string = "";
    details : AdminRulesDetailsData[] = [];

    constructor() { }
}
