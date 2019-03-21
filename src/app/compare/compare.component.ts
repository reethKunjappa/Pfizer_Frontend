import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  showFiller = false;
  
  private sampleImages: any[] = [];
  private sampleRevImages: any[] = [];
  private comments: any[] = [];
  private _opened: boolean = false;

  constructor() {
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

  ngOnInit() { }

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
  private _toggleSidebar() {
    this._opened = !this._opened;
  }


}
