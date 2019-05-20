// Dependency Imports
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpInterceptorService } from './services/http-interceptor.service';

// Below Imports only for showing error msg on modal
import { StatusComponent } from './status/status.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@Injectable()

export class I1 implements HttpInterceptor {

  // Property Declarations
  public statusDialog : any;

  constructor(public spinnerService: HttpInterceptorService, public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      },
      (err: any) => {
        if ( err ) {
          this.spinnerService.hide();
          this.statusDialog = this.dialog.open(StatusComponent, {
            disableClose: true,
            width: '400px',
            data: {
              statusText: err.message,
              statusTitle: 'Error',
              showSubmit: false,
              showCancel: true,
              submitText: 'Ok',
              cancelText: 'Close',
            },
          });
          
          this.statusDialog.afterClosed().subscribe(result => {});
        }
      }
    );

  }
}