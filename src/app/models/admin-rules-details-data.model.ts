// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable()

export class AdminRulesDetailsData {

    country : any[] = [];
    createdBy : any = {};
    scope : string = "";
    sectionName : any[] = [];
    content : any[] = [];

    constructor() { }
}