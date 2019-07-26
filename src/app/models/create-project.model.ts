// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable()
export class CreateProjectData {

    projectName: string = "";
    country: any =  {
        id : "",
        name : ""
    };
    createdBy: any = {
        email : "",
        name : "",
        userId : ''
    };
    createdOn: string = "";
    _id : string = "";
    documents: any = [];
    proprietaryName : string = "";
    drugName : string = "";

    constructor() { }
}
