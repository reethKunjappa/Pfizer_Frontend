// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

// Model Imports
import { LoginData } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // Property Declarations
  public authForm: FormGroup;
  public loginData: LoginData = new LoginData();
  public loginDatabase: any[] = [
    // Local User Credentials
    { 'email': 'author1@pfizer.com', 'name': 'Author Pfizer 1', 'userId': 'author1', 'password': 'author' },
    { 'email': 'admin1@pfizer.com', 'name': 'Admin Pfizer 1', 'userId': 'admin1', 'password': 'admin' },
    { 'email': 'reviewer1@pfizer.com', 'name': 'Reviewer Pfizer 1', 'userId': 'reviewer1', 'password': 'reviewer' },
    { 'email': 'tester1@pfizer.com', 'name': 'Tester Pfizer 1', 'userId': 'tester1', 'password': 'tester' },

    // Pfizer User Credentials
    { 'email': 'saudi_hlm@pfizer.com', 'name': 'Saudi HLM', 'userId': 'Saudi_HLM', 'password': 'Manage' },
    { 'email': 'southafrica_hlm@pfizer.com', 'name': 'South Africa HLM', 'userId': 'SouthAfrica_HLM', 'password': 'Manage' },
    { 'email': 'bosnia_hlm@pfizer.com', 'name': 'Bosnia HLM', 'userId': 'Bosnia_HLM', 'password': 'Manage' },

    { 'email': 'author@datafoundry.ai', 'name': 'Author DF User', 'userId': 'authorDFUser', 'password': 'Manage' },
    { 'email': 'admin1@datafoundry.ai', 'name': 'Admin DF User', 'userId': 'adminDFUser', 'password': 'Manage' },
    { 'email': 'tester@datafoundry.ai', 'name': 'Tester DF User', 'userId': 'testerDFUser', 'password': 'Manage' },
  ];
  public loginMessage: string = "";
  public loginStatus: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = fb.group({
      'userId': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() { }

  login() {
    this.loginDatabase.forEach(e => {
      if (e.userId == this.loginData.userId && e.password == this.loginData.password) {
        delete e['password'];
        window['loggedInUser'] = e;
        localStorage.setItem('loggedInUser', JSON.stringify(e));
        this.loginStatus = true;
        return;
      }
    });

    if (this.loginStatus) {
      // this.loginMessage = "Login successful.";
      this.router.navigate(['/dashboard',{}]);
    } else {
      this.loginMessage = "Enter correct credentials.";
      this.loginData = new LoginData();
      this.loginMessage = "";
    }

  }


}
