// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable()
export class RulesConfigurationsData {
    
    rulesSetup : any = {
        "ruleName" : "",
        "ruleDescription" : "" 
    };
    rulesApplication : any = {
        "countryGroup" : "",
        "country" : [],
        "global" : false,
        "sections": { 
            "value" : [],
            "condition" : "include/exclude"
        },
        "allSections" : false
    };
    action : any = {
        "conflictType" : "",
        "comments" : "",
        "modifyLabelOnAccept" : false,
        "allowReject" : false
    };
    additionalInformation : any = {
        "additionalInfo" : false,
        "addInfo" : []
    };        
    exceptionData : string[] = [];
    createdBy : any = {};
    // documents : any = [];
    // _id : string = "";
        
    constructor() { }
}
