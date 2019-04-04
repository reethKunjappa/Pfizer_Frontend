import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  /* showFiller = false; */
  
   sampleImages: any[] = [];
   sampleRevImages: any[] = [];
   comments: any[] = [];
   _opened: boolean = false;

   _router: Subscription;
   lastPoppedUrl: string;
   yScrollStack: number[] = [];

  constructor(public location: Location,  private router: Router) {
    this.comments = [
      {
        'id': 1,
        'comment': "chunk {layouts-admin-layout-admin-layout-module} layouts-admin-layout-admin-layout-module.js, layouts-admin-layout-admin-layout-module.js.map (layouts-admin-layout-admin-layout-module) 321 kB  [rendered]"
      },
      {
        'id': 1,
        'comment': "Comment 2"
      },
      {
        'id': 1,
        'comment': "Comment 3"
      },
      {
        'id': 1,
        'comment': "Comment 4"
      },
      {
        'id': 1,
        'comment': "Comment 5"
      },
    ];

    this.sampleImages = [
      {
        'id': 1,
        'url': "../../assets/img/Sample_Images/1.png"
      },
      {
        'id': 2,
        'url': "../../assets/img/Sample_Images/2.png"
      },
      {
        'id': 3,
        'url': "../../assets/img/Sample_Images/3.png"
      },
      {
        'id': 4,
        'url': "../../assets/img/Sample_Images/4.png"
      },
      {
        'id': 5,
        'url': "../../assets/img/Sample_Images/5.png"
      },
      {
        'id': 6,
        'url': "../../assets/img/Sample_Images/6.png"
      },
      {
        'id': 7,
        'url': "../../assets/img/Sample_Images/7.png"
      },
      {
        'id': 8,
        'url': "../../assets/img/Sample_Images/8.png"
      },
      {
        'id': 9,
        'url': "../../assets/img/Sample_Images/9.png"
      },
      {
        'id': 10,
        'url': "../../assets/img/Sample_Images/10.png"
      },
    ];

    this.sampleRevImages = [
      {
        'id': 1,
        'url': "../../assets/img/Sample_Images/1.png"
      },
      {
        'id': 2,
        'url': "../../assets/img/Sample_Images/2.png"
      },
      {
        'id': 3,
        'url': "../../assets/img/Sample_Images/3.png"
      },
      {
        'id': 4,
        'url': "../../assets/img/Sample_Images/4.png"
      },
      {
        'id': 5,
        'url': "../../assets/img/Sample_Images/5.png"
      },
      {
        'id': 6,
        'url': "../../assets/img/Sample_Images/6.png"
      },
      {
        'id': 7,
        'url': "../../assets/img/Sample_Images/7.png"
      },
      {
        'id': 8,
        'url': "../../assets/img/Sample_Images/8.png"
      },
      {
        'id': 9,
        'url': "../../assets/img/Sample_Images/9.png"
      },
      {
        'id': 10,
        'url': "../../assets/img/Sample_Images/10.png"
      },
    ];
  }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    // if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
    //     // if we are on windows OS we activate the perfectScrollbar function
    //     document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    // } else {
    //     document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    // }

    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev:PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event:any) => {
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
        //  elemSidebar.scrollTop = 0;
    });
    if (window.matchMedia(`(min-width: 960px)`).matches) {
        let ps = new PerfectScrollbar(elemMainPanel);
        ps = new PerfectScrollbar(elemSidebar);
    }
  }

  // ngAfterViewInit() {
  //   this.runOnRouteChange();
  // }

  // runOnRouteChange(): void {
  //   console.log("Inisde dimension change");
  //   // if (window.matchMedia(`(min-width: 960px)`).matches) {
  //     const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
  //     const ps = new PerfectScrollbar(elemMainPanel);
  //     ps.update();
  //   // }
  // }

  openNav() {
    console.log("OpenNav");
    document.getElementById("mySidebar").style.width = "550px";
    document.getElementById("main").style.marginRight = "420px";
    // document.getElementById("main").style.marginRight = "420px";
    // document.getElementById("page-wrap").classList.remove("toggled");
  }

  closeNav() {
    console.log("closeNav");
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }
   _toggleSidebar() {
    this._opened = !this._opened;
  }


}
