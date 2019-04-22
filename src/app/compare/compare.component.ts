// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, Params } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

// Service Imports
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
  referenceDocuments: any[] = [];
  viewType: string = "";
  url = "";

  public projectId: any;
  public projectDetails: any;
  public updateCommentsArray : any[] = [];
  public selectedIndex : number = -1;

  constructor(public location: Location, private router: Router, private activatedRoute: ActivatedRoute, private projectViewService: ProjectViewService ) {
    // let x = "C:\Users\Reeth\projects\Pfizer_Backend\fs\94746132-2bb6-4ec9-abe8-700a6f77efa5\Saudi arabia  LPD vs. USPI.doc";
    // console.log("x:",x.split());
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.projectId = params.get('id');
      this.viewType = params.get('view');
    });

    if (this.viewType == 'viewProjectConflicts') {
      this.viewDocuments();
    } else {
      this.getDocument();
    }

  }

  ngOnInit() {}

  // Get Updated Document
  getDocument() {
    this.projectViewService.getDocument(this.projectId).subscribe((res: any) => {
      if (res != undefined && res != "") {
        this.projectDetails = res.result;
        this.comments = res.result.conflicts.comments;
        this.projectDetails.documents.map(a => {
          if (a.fileType == 'Label') {
            this.url = 'https://docs.google.com/gview?url=http://34.204.2.145:3005' + a.destination + '&embedded=true'
          }
        })
      }
    })
  }

  viewDocuments() {
    this.projectViewService.viewProjectConflicts({ '_id': this.projectId }).subscribe((res: any) => {
      if (res != undefined && res != "") {
        this.projectDetails = res.result;
        this.comments = res.result.conflicts.comments;
        this.comments.map((c) => { c['commentStatus'] = "" });
        this.projectDetails.documents.map(a => {
          console.log(a);          
          if ( a.fileType == 'Label' ) {
            if ( a.hasOwnProperty('pdfPath') ) {
              let labelDocUrl = this.projectViewService.endPointAddress + a.pdfPath.destination;
              setTimeout(()=>{
                document.getElementById('showLabelDoc').setAttribute('src', labelDocUrl);
              },1000);
            }              
          }
        });
      }
    })
  }

  // Get Reference Document
  getReferenceDocument(docDetails: any) {
    console.log("docDetails::", docDetails);
    this.referenceDocuments = [];
    this.projectDetails.documents.map((element: any) => {
      if (docDetails.referenceDoc.substring(docDetails.referenceDoc.lastIndexOf('\\') + 1) == element.documentName) {
        this.referenceDocuments.push(element);
        let refDocUrl = this.projectViewService.endPointAddress + element.pdfPath.destination;
        setTimeout(()=>{
          document.getElementById('showRefDoc').setAttribute('src', refDocUrl );
        },1000);
      }
    });
  }

  // Accept Comment
  acceptComment( commentReq, index ) {
    console.log("Accept::", commentReq, index);
    this.updateCommentsArray.map((e) => {
      if ( e._id == commentReq._id ) {
        this.updateCommentsArray.splice(e, 1);
      }
    });
    let obj = {};
    obj['_id'] = commentReq._id;
    obj['action'] = 'ACCEPT';
    this.updateCommentsArray.push(obj);
    this.selectedIndex = index;
    this.comments[index].commentStatus = "ACCEPT";
    console.log("A: main::",this.projectDetails.conflicts.comments);
    console.log("New::",this.updateCommentsArray);
  }

  // Reject Comment
  rejectComment( commentReq, index ) {
    console.log("Reject::", commentReq, index);
    this.updateCommentsArray.map((e) => {
      if ( e._id == commentReq._id ) {
        this.updateCommentsArray.splice(e, 1);
      }
    });
    let obj = {};
    obj['_id'] = commentReq._id;
    obj['action'] = 'REJECT';
    this.updateCommentsArray.push(obj);
    this.comments[index].commentStatus = "REJECT";
    console.log("R: main::",this.projectDetails.conflicts.comments);
    console.log("New::",this.updateCommentsArray);
  }

  acceptRejectDocumentsComments() {
    var obj = {};
    obj['user'] = this.projectViewService.loggedInUser;
    obj['projectId'] = this.projectDetails._id;
    obj['comments'] = this.updateCommentsArray;
    this.projectViewService.acceptRejectDocumentsComments(obj).subscribe((updateDocCommentsResp: any) => {
      console.log("updateDocCommentsResp::", updateDocCommentsResp);
    });
  }

  setUrl(destination: any) {
    return "https://docs.google.com/gview?url=" + this.projectViewService.endPointAddress + destination + "&embedded=true";
  }

}
