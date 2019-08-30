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
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ChartsModule } from 'ng2-charts-x';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Services Imports
import { ProjectViewService } from './services/project-view.service';
import { I1 } from './interceptor';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoggedInUserService } from './services/logged-in-user.service';
import { AppConfigurations } from './app-configurations';

// Component Imports
import { LoginComponent } from './login/login.component';
import { StatusComponent } from './status/status.component';
import { CountryConfigComponent } from './country-config/country-config.component';
import { RulesConfigComponent } from './rules-config/rules-config.component';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
import { ReviewLabelChecksModalComponent } from './review-label-checks-modal/review-label-checks-modal.component';
// import { ChartJsComponent } from './chart-js/chart-js.component';

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
    ChartsModule,
    NgSelectModule,
    NgIdleKeepaliveModule.forRoot(),
    MatProgressBarModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    StatusComponent,
    CountryConfigComponent,
    RulesConfigComponent,
    SessionTimeoutModalComponent,
    ReviewLabelChecksModalComponent,
    // ChartJsComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgSelectModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ProjectViewService,
    LoggedInUserService,
    AppConfigurations,  
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: I1,
      multi: true
    },
  ],
  entryComponents:[ StatusComponent, CountryConfigComponent, RulesConfigComponent, SessionTimeoutModalComponent, ReviewLabelChecksModalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
