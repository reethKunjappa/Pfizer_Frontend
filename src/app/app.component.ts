// Dependency Imports
import { Component, ElementRef } from '@angular/core';
// import { Keepalive } from '@ng-idle/keepalive';
// import { EventTargetInterruptSource, Idle } from '@ng-idle/core';
// import { MatDialog } from '@angular/material';
// import { Router } from '@angular/router';

// Service Imports
import { HttpInterceptorService } from './services/http-interceptor.service';

// // Component Imports
// import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // Property Declarations
  public title: string = "Session Timeout Demo";
  public idleState: string = "NOT_STARTED";
  public timedOut: boolean = false;
  public lastPing?: Date = null;
  public progressBarPopup : any;

  constructor(public spinner: HttpInterceptorService ) {
    // private idle: Idle, private keepalive: Keepalive, private element: ElementRef, public dialog: MatDialog, private router : Router

    // // sets an idle timeout of 15 minutes.
    // idle.setIdle(60); //900
    // // sets a timeout period of 5 minutes.
    // idle.setTimeout(50); //300
    // // sets the interrupts like Keydown, scroll, mouse wheel, mouse down, and etc
    // idle.setInterrupts([
    //   new EventTargetInterruptSource(
    //     this.element.nativeElement, 'keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll')]);

    // idle.onIdleEnd.subscribe(() => {
    //   this.idleState = 'NO_LONGER_IDLE';
    // });

    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'TIMED_OUT';
    //   this.timedOut = true;
    //   this.closeProgressForm();
    // });

    // idle.onIdleStart.subscribe(() => {
    //   this.idleState = 'IDLE_START', this.openProgressForm(1);
    // });

    // idle.onTimeoutWarning.subscribe((countdown: any) => {
    //   this.idleState = 'IDLE_TIME_IN_PROGRESS';
    //   this.progressBarPopup.componentInstance.count = (Math.floor((countdown - 1) / 60) + 1);
    //   this.progressBarPopup.componentInstance.progressCount = this.reverseNumber(countdown);
    //   this.progressBarPopup.componentInstance.countMinutes = (Math.floor(countdown / 60));
    //   this.progressBarPopup.componentInstance.countSeconds = countdown % 60;
    // });

    // // sets the ping interval to 15 seconds
    // keepalive.interval(15);
    // /**
    //  *  // Keepalive can ping request to an HTTP location to keep server session alive
    //  * keepalive.request('<String URL>' or HTTP Request);
    //  * // Keepalive ping response can be read using below option
    //  * keepalive.onPing.subscribe(response => {
    //  * // Redirect user to logout screen stating session is timeout out if if response.status != 200
    //  * });
    //  */
    // this.reset();
  }

  // ngOnDestroy() {
  //   this.resetTimeOut();
  // }

  // reverseNumber(countdown: number) {
  //   return (300 - (countdown - 1));
  // }

  // reset() {
  //   this.idle.watch();
  //   this.idleState = 'Started.';
  //   this.timedOut = false;
  // }

  // openProgressForm(count: number) {
  //   this.progressBarPopup = this.dialog.open(SessionTimeoutModalComponent, {
  //     disableClose: false,//true,
  //     width: '450px',
  //     data: {}
  //   });
  //   this.progressBarPopup.componentInstance.count = count;

  //   this.progressBarPopup.afterClosed().subscribe(result => {
  //     if ( result && result === 'reset' ) {
  //       this.reset();
  //     }else {
  //       this.logout();
  //     }
  //   });
  // }

  // logout() {
  //   this.resetTimeOut();
  //   localStorage.clear();
  //   this.router.navigate(['/login',{}]);
  // }

  // closeProgressForm() {
  //   this.progressBarPopup.close();
  // }

  // resetTimeOut() {
  //   this.idle.stop();
  //   this.idle.onIdleStart.unsubscribe();
  //   this.idle.onTimeoutWarning.unsubscribe();
  //   this.idle.onIdleEnd.unsubscribe();
  //   this.idle.onIdleEnd.unsubscribe();
  // }

}
