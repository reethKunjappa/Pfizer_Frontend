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

// Services Imports
import { ProjectViewService } from './services/project-view.service';
import { I1 } from './interceptor';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';

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
      // apiKey: 'AIzaSyDCvVuTiokiDQdh0RXYCoj0N2n3rlqEBL8'
    }),
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    StatusComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  entryComponents:[ StatusComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
