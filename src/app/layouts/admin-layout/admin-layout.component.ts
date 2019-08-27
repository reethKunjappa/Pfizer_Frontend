// Dependency Imports
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';

// Session Timout Imports
import { Keepalive } from '@ng-idle/keepalive';
import { EventTargetInterruptSource, Idle } from '@ng-idle/core';
import { MatDialog } from '@angular/material';

// Component Imports
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SessionTimeoutModalComponent } from '../../session-timeout-modal/session-timeout-modal.component';

// Service Imports
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { AppConfigurations } from '../../app-configurations';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit {

    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public hideSideBar: boolean = false;

    // Session Timeout Declarations
    public title: string = "Session Timeout Demo";
    public idleState: string = "NOT_STARTED";
    public timedOut: boolean = false;
    public lastPing?: Date = null;
    public progressBarPopup: any;

    public sessionTimeoutConfigurations : any;

    constructor(public location: Location, private router: Router, private loggedInUserService: LoggedInUserService, private idle: Idle, private keepalive: Keepalive, private element: ElementRef, public dialog: MatDialog, private appConfigurations : AppConfigurations) {
        // // this.sessionTimeoutConfigurations = this.appConfigurations.getSessionTimeoutData();
        // // Session Timout 
        // // sets an idle timeout of 15 minutes.
        // idle.setIdle( this.sessionTimeoutConfigurations.idleTimeout ); //900
        // // sets a timeout period of 5 minutes.
        // idle.setTimeout( this.sessionTimeoutConfigurations.timeout ); //300
        // // sets the interrupts like Keydown, scroll, mouse wheel, mouse down, and etc
        // idle.setInterrupts([
        //     new EventTargetInterruptSource(
        //         this.element.nativeElement, 'keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll')]);

        // idle.onIdleEnd.subscribe(() => {
        //     this.idleState = 'NO_LONGER_IDLE';
        // });

        // idle.onTimeout.subscribe(() => {
        //     this.idleState = 'TIMED_OUT';
        //     this.timedOut = true;
        //     this.closeProgressForm();
        // });

        // idle.onIdleStart.subscribe(() => {
        //     this.idleState = 'IDLE_START', this.openProgressForm(1);
        // });

        // idle.onTimeoutWarning.subscribe((countdown: any) => {
        //     this.idleState = 'IDLE_TIME_IN_PROGRESS';
        //     this.progressBarPopup.componentInstance.count = (Math.floor((countdown - 1) / 60) + 1);
        //     this.progressBarPopup.componentInstance.progressCount = this.reverseNumber(countdown);
        //     this.progressBarPopup.componentInstance.countMinutes = (Math.floor(countdown / 60));
        //     this.progressBarPopup.componentInstance.countSeconds = countdown % 60;
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
        // // Session Timeout Code Ends here
    }

    sideBarToggleCondition(event: any) {
        this.hideSideBar = event;
    }

    ngOnInit() {
        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function
            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }

        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });

        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });

        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }
    }

    ngAfterViewInit() {
        this.runOnRouteChange();
    }

    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }

    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    /* Session Timeout Code */

    // ngOnDestroy() {
    //     this.resetTimeOut();
    // }

    // reverseNumber(countdown: number) {
    //     return (300 - (countdown - 1));
    // }

    // reset() {
    //     this.idle.watch();
    //     this.idleState = 'Started.';
    //     this.timedOut = false;
    // }

    // openProgressForm(count: number) {
    //     this.progressBarPopup = this.dialog.open(SessionTimeoutModalComponent, {
    //         disableClose: false,//true,
    //         width: '450px',
    //         data: {}
    //     });
    //     this.progressBarPopup.componentInstance.count = count;

    //     this.progressBarPopup.afterClosed().subscribe(result => {
    //         if (result && result === 'reset') {
    //             this.reset();
    //         } else {
    //             this.logout();
    //         }
    //     });
    // }

    // logout() {
    //     this.resetTimeOut();
    //     localStorage.clear();
    //     this.router.navigate(['/login', {}]);
    // }

    // closeProgressForm() {
    //     this.progressBarPopup.close();
    // }

    // resetTimeOut() {
    //     this.idle.stop();
    //     // this.idle.onIdleStart.unsubscribe();
    //     // this.idle.onTimeoutWarning.unsubscribe();
    //     // this.idle.onIdleEnd.unsubscribe();
    //     // this.idle.onIdleEnd.unsubscribe();
    // }

}
