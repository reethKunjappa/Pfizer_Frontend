// Dependency Imports
import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

// import { SimplePdfViewerModule } from 'simple-pdf-viewer';

export interface DialogData {
  commentsList: any;
  projectDetails: any;
  action: string;
}
// Service Imports
import { ProjectViewService } from 'app/services/project-view.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent implements OnInit {

  sampleImages: any[] = [];
  sampleRevImages: any[] = [];
  comments: any[] = [];
  referenceDocuments: any[] = [];
  viewType: string = "";
  url = "";

  coomentsCopy = [];
  public projectId: any;
  public projectDetails: any;
  public updateCommentsArray: any[] = [];
  public selectedIndex: number = -1;
  public labelCopy: string;

  public totalCount: any;
  public fontCount: any;
  public orderCount: any;
  public contentCount: any;
  public spellCheckCount: any;
  public commentsAcceptedRejected = [];
  public conflictCriterias: any[] = [
    { 'value': 'ALL', 'label' : 'All' },
    { 'value': 'CONTENT', 'label' : 'Content' },
    { 'value': 'FONT', 'label' : 'Font' },
    { 'value': 'GRAMMAR_SPELLING', 'label' : 'Spell Check' },
    { 'value': 'ORDER', 'label' : 'Order' },
  ];
  public conflictType: string = "ALL";
  public conflicts = {
    'font': [],
    'order': [],
    'spell': [],
    'content': []
  }
  public filteredItems: any = [];

  constructor(public location: Location, private router: Router, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private projectViewService: ProjectViewService) {
    // private pdfViewer: SimplePdfViewerModule
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

  ngOnInit() { }

  // Get Updated Document
  getDocument() {
    this.projectViewService.getDocument(this.projectId).subscribe((res: any) => {
      if (res != undefined && res != "") {
        this.projectDetails = res.result;
        this.comments = this.projectDetails.comments;
        this.assignCopy();

        this.totalCount = this.projectDetails.comments.length;
        this.conflicts.font = this.comments.filter((x) => {
          return x.conflict_type === 'FONT_NAME' || x.conflict_type === 'FONT_SIZE'
        })
        this.conflicts.order = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'ORDER' });
        this.conflicts.spell = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'GRAMMAR_SPELLING' });
        this.conflicts.content = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'CONTENT' });

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
        this.assignCopy();

        this.totalCount = this.projectDetails.comments.length;
        this.conflicts.font = this.projectDetails.comments.filter((x) => {
          return x.conflict_type === 'FONT_NAME' || x.conflict_type === 'FONT_SIZE'
        })
        this.conflicts.order = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'ORDER' });
        this.conflicts.spell = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'GRAMMAR_SPELLING' });
        this.conflicts.content = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'CONTENT' });

        // Below lines execution for finding unique from an array - Shashank - Implement after Reeth's approval
        // let unique = new Set(this.projectDetails.comments.map(item => item.conflict_type ));
        // console.log("unique::",unique);

        this.projectDetails.project.documents.map(a => {
          if (a.fileType == 'Label') {
            if (a.hasOwnProperty('pdfPath')) {
              let labelDocUrl = this.projectViewService.endPointAddress + this.convertToUTF8(a.pdfPath.destination);
              // + '#page=3';
              // console.log("labelDocUrl::",labelDocUrl);
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

  // Open Confirmation Modal
  openConfirmationModal(action, comments) {
    const dialogRef = this.dialog.open(CommentsConfirmationModal, {
      width: '35vw',
      data: { commentsList: comments, projectDetails: this.projectDetails, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != '') {
        this.projectDetails = result;
        this.comments = result.comments;
        this.totalCount = this.projectDetails.comments.length;

        this.conflicts.font = this.projectDetails.comments.filter((x) => {
          return x.conflict_type === 'FONT_NAME' || x.conflict_type === 'FONT_SIZE'
        })
        this.conflicts.order = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'ORDER' });
        this.conflicts.spell = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'GRAMMAR_SPELLING' });
        this.conflicts.content = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'CONTENT' });
      }
    });
  }

  acceptOrRejectComment(action, item) {
    this.projectDetails.comments.find((x) => {
      if(x.comment_id === item.comment_id) {
        if (action == 'Accept') {
          if (x.action == '' || x.action == null) {
            x.action = 'ACCEPT';
            x._deleted = true;
          } else {
            x.action = '';
            x._deleted = false;
          }
        }
        if (action == 'Reject') {
          if (x.action == '' || x.action == null) {
            x.action = 'REJECT';
            x._deleted = true;
          } else {
            x.action = '';
            x._deleted = false;
          }
        }
      }
    })
  }


  acceptRejectDocumentsComments() {
    const obj = {
      'user': this.projectViewService.loggedInUser,
      'projectId': this.projectDetails.project._id,
      'comments': this.projectDetails.comments.filter(comment => (comment.action == 'ACCEPT' || comment.action == 'REJECT'))
    };
    if (obj.comments.length) {
      this.projectViewService.acceptRejectDocumentsComments(obj).subscribe((updateDocCommentsResp: any) => {
        if (updateDocCommentsResp != undefined && updateDocCommentsResp != "") {
          this.projectDetails = updateDocCommentsResp.result;
          this.totalCount = this.projectDetails.comments.length;

          this.conflicts.font = this.projectDetails.comments.filter((x) => {
            return x.conflict_type === 'FONT_NAME' || x.conflict_type === 'FONT_SIZE'
          })
          this.conflicts.order = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'ORDER' });
          this.conflicts.spell = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'GRAMMAR_SPELLING' });
          this.conflicts.content = this.projectDetails.comments.filter((x) => { return x.conflict_type === 'CONTENT' });
        }
      });
    }
  }

  downloadCommentedLabelDoc() {
    window.open(this.labelCopy, '_blank');
  }

  setUrl(destination: any) {
    return "https://docs.google.com/gview?url=" + this.projectViewService.endPointAddress + destination + "&embedded=true";
  }

  filterItem(event) {    
    let value = event; //.target.value;
    if ( value ) {
      if ( value == 'ALL' ) {
        this.assignCopy();        
      }else if( value == 'FONT' ){
        this.filteredItems = this.filterAssign( 'FONT_SIZE', 'FONT_NAME' );        
      }else {
        this.filteredItems = this.filterAssign(value, '');
      }
    }else {
      this.assignCopy();      
    }
  }

  filterAssign(value1, value2){
    return this.projectDetails.comments.filter((x) => { return x.conflict_type === value1 || x.conflict_type === value2 });
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.projectDetails.comments)
  }

}


/* ================================ Confirmation Modal ================================ */
@Component({
  selector: 'comments-confirmation-modal',
  templateUrl: 'commentsConfirmationModal.html',
})
export class CommentsConfirmationModal {

  public commentsList: any;
  public projectDetails: any;
  public action: string;

  constructor(private projectViewService: ProjectViewService,
    public dialogRef: MatDialogRef<CommentsConfirmationModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.commentsList = data.commentsList;
    this.projectDetails = data.projectDetails;
    this.action = data.action;
  }

  // Accept All
  acceptRejectAll() {
    const acceptedComments = Object.assign([], this.commentsList);
    for (let i = 0; i < this.commentsList.length; i++) {
      if (this.action === 'Accept') {
        this.commentsList[i].action = 'ACCEPT';
        this.commentsList[i]._deleted = true;
      } else {
        this.commentsList[i].action = 'REJECT';
        this.commentsList[i]._deleted = true;
      }
    }

    const object = {
      'user': this.projectViewService.loggedInUser,
      'projectId': this.projectDetails.project._id,
      'comments': acceptedComments
    };
    if (object.comments.length) {
      this.projectViewService.acceptRejectDocumentsComments(object).subscribe((res: any) => {
        if (res.status.code === 0) {
          this.dialogRef.close(res.result);
        } else {
          alert(res.status.message);
          this.dialogRef.close();
        }
      });
    }
  }
}