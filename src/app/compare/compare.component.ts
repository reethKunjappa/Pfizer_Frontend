// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
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
  public updateCommentsArray: any[] = [];
  public selectedIndex: number = -1;
  public labelCopy : string;

  public totalCount : any;
  public fontCount : any;
  public orderCount : any;
  public contentCount : any;
  public spellCheckCount : any; 

  constructor(public location: Location, private router: Router, private activatedRoute: ActivatedRoute, private projectViewService: ProjectViewService) {
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

        this.totalCount = this.projectDetails.comments.length;
        this.fontCount = this.projectDetails.comments.filter((x) => {
          return x.conflict_type == 'FONT_NAME' || x.conflict_type == 'FONT_SIZE'           
        }).length;
        this.orderCount = this.projectDetails.comments.filter((x) => { return x.conflict_type == 'ORDER' }).length;
        this.spellCheckCount = this.projectDetails.comments.filter((x) => { return x.conflict_type == 'GRAMMAR_SPELLING' }).length;

        this.projectDetails.project.documents.map(a => {
          if (a.fileType == 'Label') {
            if (a.hasOwnProperty('pdfPath')) {
              let labelDocUrl = this.projectViewService.endPointAddress + this.convertToUTF8(a.pdfPath.destination);
              setTimeout(() => {
                document.getElementById('showLabelDoc').setAttribute('src', labelDocUrl);
              }, 1000);
              this.labelCopy = this.projectViewService.endPointAddress + a.labelCopy.destination;
            }
          }
        });
      }
    })
  }

  convertToUTF8(url) {
    url = encodeURIComponent(url);
    var urlSplit = url.split('%2F');
    url = urlSplit.join('/');
    return url;
  }

  viewDocuments() {
    this.projectViewService.viewProjectConflicts({ '_id': this.projectId }).subscribe((res: any) => {
      if (res != undefined && res != "") {
        this.projectDetails = res.result;
        this.comments = res.result.comments;

        this.totalCount = this.projectDetails.comments.length;
        this.fontCount = this.projectDetails.comments.filter((x) => {
          return x.conflict_type == 'FONT_NAME' || x.conflict_type == 'FONT_SIZE'           
        }).length;
        this.orderCount = this.projectDetails.comments.filter((x) => { return x.conflict_type == 'ORDER' }).length;
        this.spellCheckCount = this.projectDetails.comments.filter((x) => { return x.conflict_type == 'GRAMMAR_SPELLING' }).length;

        this.projectDetails.project.documents.map(a => {
          if (a.fileType == 'Label') {
            if (a.hasOwnProperty('pdfPath')) {
              let labelDocUrl = this.projectViewService.endPointAddress + this.convertToUTF8(a.pdfPath.destination);
              setTimeout(() => {
                document.getElementById('showLabelDoc').setAttribute('src', labelDocUrl);
              }, 1000);
              this.labelCopy = this.projectViewService.endPointAddress + a.labelCopy.destination;
            }
          }
        });
      }
    })
  }

  // Get Reference Document
  getReferenceDocument(docDetails: any) {
    this.referenceDocuments = [];
    this.projectDetails.project.documents.map((element: any) => {
      if (docDetails.reference_doc.substring(docDetails.reference_doc.lastIndexOf('\\') + 1) == element.documentName) {
        this.referenceDocuments.push(element);
        let refDocUrl = this.projectViewService.endPointAddress + this.convertToUTF8(element.pdfPath.destination);
        setTimeout(() => {
          document.getElementById('showRefDoc').setAttribute('src', refDocUrl);
        }, 1000);
      }
    });
  }

  // Accept Comment
  acceptOrRejectComment(action, index) {
    if (action == 'Accept') {
      if (this.projectDetails.comments[index].action == '' || this.projectDetails.comments[index].action == null) {
        this.projectDetails.comments[index].action = 'ACCEPT';
        this.projectDetails.comments[index]._deleted = true;
      } else {
        this.projectDetails.comments[index].action = '';
        this.projectDetails.comments[index]._deleted = false;
      }
    }
    if (action == 'Reject') {
      if (this.projectDetails.comments[index].action == '' || this.projectDetails.comments[index].action == null) {
        this.projectDetails.comments[index].action = 'REJECT';
        this.projectDetails.comments[index]._deleted = true;
      } else {
        this.projectDetails.comments[index].action = '';
        this.projectDetails.comments[index]._deleted = false;
      }
    }
  }


  acceptRejectDocumentsComments() {
    var obj = {
      'user': this.projectViewService.loggedInUser,
      'projectId': this.projectDetails.project._id,
      'comments': this.projectDetails.comments.filter(comment => (comment.action == 'ACCEPT' || comment.action == 'REJECT'))
    };
    if (obj.comments.length) {
      this.projectViewService.acceptRejectDocumentsComments(obj).subscribe((updateDocCommentsResp: any) => {
        if (updateDocCommentsResp != undefined && updateDocCommentsResp != "") {
          this.projectDetails = updateDocCommentsResp.result;

          this.totalCount = this.projectDetails.comments.length;
          this.fontCount = this.projectDetails.comments.filter((x) => {
            return x.conflict_type == 'FONT_NAME' || x.conflict_type == 'FONT_SIZE'           
          }).length;
          this.orderCount = this.projectDetails.comments.filter((x) => { return x.conflict_type == 'ORDER' }).length;
          this.spellCheckCount = this.projectDetails.comments.filter((x) => { return x.conflict_type == 'GRAMMAR_SPELLING' }).length;  

        }
      });
    }
  }

  downloadCommentedLabelDoc() {
    window.open( this.labelCopy, '_blank' );
  }

  setUrl(destination: any) {
    return "https://docs.google.com/gview?url=" + this.projectViewService.endPointAddress + destination + "&embedded=true";
  }

}
