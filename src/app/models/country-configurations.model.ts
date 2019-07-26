// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable()
export class CountryConfigurationsData {

    country : any = [];
    countryGrouping : string = "";
    languagePreference : string = "";
    createdBy : any = {};
    // regulatoryDocuments : any = [];    

    constructor() { }
}
