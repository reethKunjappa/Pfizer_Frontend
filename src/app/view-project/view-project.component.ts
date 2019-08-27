// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

// Component Imports
import { UploadDocumentsModalComponent } from 'app/upload-documents-modal/upload-documents-modal.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})

export class ViewProjectComponent implements OnInit {

  // Property Declarations
  public documentTableHeaders = [
    { 'headerName': 'Document Name', 'class': '', 'width': '35%' },
    { 'headerName': 'Document Type', 'class': '', 'width': '15%' },
    { 'headerName': 'Uploaded By', 'class': '', 'width': '20%' },
    { 'headerName': 'Uploaded On', 'class': '', 'width': '12%' },
    { 'headerName': 'Actions', 'class': '', 'width': '18%' }
  ];
  public projectDetails: any = {};
  public uploadDocumentDialog: any;
  public reUploadDocumentDialog: any;

  constructor(private projectViewService: ProjectViewService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private loggedInUserService : LoggedInUserService) {
    this.viewProject();
  }

  viewProject() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      if (params.get('id') != "" && params.get('id') != undefined && params.get('id') != null) {
        this.projectViewService.openProject(params.get('id')).subscribe((projectDetails: any) => {
          this.projectDetails = projectDetails;
        });
      }
    });
  }

  ngOnInit() { }

  showConflict(projectDetails) {
    // this.router.navigate(['/compare', projectDetails._id, 'getConflicts']);
    this.projectDetails.inProcess = true;
    this.projectViewService.getDocument(projectDetails._id).subscribe((res: any) => {
      if (res != undefined && res != "" && res.status.code === 0) {
        let obj = {};
        obj = res.result;
        this.projectDetails.inProcess = false; 
        this.router.navigate(['/compare', projectDetails._id, 'viewProjectConflicts']);
      }
    })
  }

  uploadMoreDocuments() {
    this.uploadDocumentDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: true,//true,
      width: '1000px',
      data: { section : 'project', projectDetails: this.projectDetails, allowMultiple: true } //, allowMultiple : true
    });

    this.uploadDocumentDialog.afterClosed().subscribe((result) => { 
      if ( result.uploadComplete === true ) {
        this.viewProject();
      }
    });
  }

  showMappingSpec(doc) {
    this.router.navigate(['/mappingSpec', this.projectDetails._id]);
  }

  viewConflict(projectDetails: any) {
    this.router.navigate(['/compare', projectDetails._id, 'viewProjectConflicts']);
  }

  // Re-upload document
  reUploadDocument(document: any) {
    this.reUploadDocumentDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: true,//true,
      width: '1000px',
      data: { section : 'project', projectDetails: this.projectDetails, allowMultiple: false, documentId: document._id, fileType: document.fileType } //, allowMultiple : false
    });

    this.reUploadDocumentDialog.afterClosed().subscribe((result) => { 
      if ( result.uploadComplete === true ) {
        this.viewProject();
      }     
    });
  }

  // Download a document
  downloadDocument(documentDetails: any) {
    window.open(this.projectViewService.endPointAddress + documentDetails.destination, '_blank');  
  }

  // View a document
  viewDocument(documentDetails: any) {
    window.open(this.projectViewService.endPointAddress + documentDetails.destination, '_blank');
  }

  downloadCommentedLabelDoc(documentDetails: any) {    
    window.open(this.projectViewService.endPointAddress + documentDetails.labelCopy.destination, '_blank');
  }

  deleteDocument(documentDetails: any) {
    this.projectViewService.deleteDocument({ 'projectId': documentDetails.projectId, 'documentId': documentDetails._id, 'deletedBy' : this.loggedInUserService.getNativeWindowRef() }).subscribe((deleteDocumentResponse: any) => {
      if (deleteDocumentResponse.status.code === 0) {
        this.projectDetails.documents.map((e) => {
          if (e._id == deleteDocumentResponse.result.documentId) {
            let index = this.projectDetails.documents.indexOf(e);
            this.projectDetails.documents.splice(index, 1);
          }
        });
      }
    });
  }

  showCheckList( projectDetails : any ) {
    this.router.navigate([ '/checklist', projectDetails._id ]);
  }

}
