// Dependency Imports
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {

    // Property Declarations
    public loginCredentials: any[] = [];

    constructor() {
        this.loginCredentials = [
            { 'email': 'author@pfizer.com', 'name': 'Author Pfizer 1', 'userId': 'author1', 'password': 'author' },
            { 'email': 'reviewer@pfizer.com', 'name': 'Reviewer Pfizer 1', 'userId': 'reviewer1', 'password': 'reviewer' },
            { 'email': 'admin@pfizer.com', 'name': 'Admin Pfizer 1', 'userId': 'admin1', 'password': 'admin' },
            { 'email': 'tester@pfizer.com', 'name': 'Tester Pfizer 1', 'userId': 'tester1', 'password': 'tester' },
        ];
    }

    getLoginCredentials() {
        return this.loginCredentials;
    }


}