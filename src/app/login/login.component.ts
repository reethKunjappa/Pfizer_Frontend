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
  public loginData : LoginData = new LoginData();
  public loginDatabase : any[] = [
    { 'email' : 'author@pfizer.com', 'name' : 'Author Pfizer 1', 'userId' : 'author1', 'password' : 'author' },
    { 'email' : 'reviewer@pfizer.com', 'name' : 'Reviewer Pfizer 1', 'userId' : 'reviewer1', 'password' : 'reviewer' },
    { 'email' : 'admin@pfizer.com', 'name' : 'Admin Pfizer 1', 'userId' : 'admin1', 'password' : 'admin' },
    { 'email' : 'tester@pfizer.com', 'name' : 'Tester Pfizer 1', 'userId' : 'tester1', 'password' : 'tester' },
  ];
  public loginMessage : string = "";
  public loginStatus : boolean = false;

  constructor( private fb: FormBuilder, private router : Router ) { 
    this.authForm = fb.group({
      'userId': ['', Validators.compose([ Validators.required ])],
      'password': ['', Validators.compose([ Validators.required ])],
    });
  }
  
  ngOnInit() {}

  login(){
    this.loginDatabase.forEach(e => {
      if ( e.userId == this.loginData.userId && e.password == this.loginData.password ) {
        delete e['password'];
        window['loggedInUser'] = e;
        localStorage.setItem('loggedInUser', JSON.stringify(e));
        this.loginStatus = true;
        return;
      }      
    });

    if ( this.loginStatus ) {
      this.loginMessage = "Login successful.";
      setTimeout(()=>{
        this.router.navigate(['/dashboard']);
      },500);      
    } else {
      this.loginMessage = "Enter correct credentials.";
      setTimeout(()=>{
        this.loginData = new LoginData();
        this.loginMessage = "";
      },500);      
    }

  }


}
