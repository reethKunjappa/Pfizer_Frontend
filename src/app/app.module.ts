import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { MdePopoverModule } from '@material-extended/mde';

// Services Imports
import { ProjectViewService } from './services/project-view.service';
import { I1 } from './interceptor';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    MaterialModule,
    ReactiveFormsModule,
    // MdePopoverModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // MdePopoverModule,
  ],
  providers: [
    ProjectViewService,
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: I1,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
