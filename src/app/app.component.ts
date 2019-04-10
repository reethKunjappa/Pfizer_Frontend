// Dependency Imports
import { Component} from '@angular/core';

// Service Imports
import { HttpInterceptorService } from './services/http-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public spinner : HttpInterceptorService){}

}
