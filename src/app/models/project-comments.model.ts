// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectCommentsData {

    projectId: string = "";
    commentedBy: any = {
        email : "",
        name : "",
        userId : ''
    };
    commentedText: string = "";

    constructor() { }
}