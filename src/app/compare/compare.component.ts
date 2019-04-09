import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, Params } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

import { ProjectViewService } from 'app/services/project-view.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

   sampleImages: any[] = [];
   sampleRevImages: any[] = [];
   comments: any[] = [];

   public projectId: any;
   public projectDetails = {};

  constructor(public location: Location,  private router: Router, 
    private activatedRoute: ActivatedRoute, private projectViewService: ProjectViewService) {

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
    this.activatedRoute.paramMap.subscribe(( params : any )=>{
      this.projectId = params.get('id')
    });

    this.getDocument()

  }

  // Get Updated Document
  getDocument() {
    this.projectViewService.getDocument(this.projectId).subscribe((res) => {
      this.comments = res.result.conflicts.comments;
      this.projectDetails = res.result
      console.log(res)
    })
  }

  // Get Reference Document
  getReferenceDocument(){
    this.projectViewService.getReferenceDocument(this.projectId).subscribe((res) => {
      console.log(res)
    })
  }

  // Accept Comment
  acceptComment(commentReq) {
    this.projectViewService.acceptComment(commentReq).subscribe((res) => {
      console.log(res);
    })
  }

  // Reject Comment
  rejectComment(commentReq) {
    this.projectViewService.rejectComment(commentReq).subscribe((res) => {
      console.log(res);
    })
  }

}
