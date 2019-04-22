// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';

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
    { 'headerName': 'Uploaded On', 'class': '', 'width': '15%' },
    { 'headerName': 'Actions', 'class': '', 'width': '15%' }
  ];
  public projectDetails: any = {};
  public uploadDocumentDialog: any;
  public reUploadDocumentDialog: any;
  // public projectLength : boolean = false;

  constructor(private projectViewService: ProjectViewService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
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
    this.router.navigate(['/compare', projectDetails._id, 'getConflicts']);
  }

  uploadMoreDocuments() {
    this.uploadDocumentDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: false,//true,
      width: '1000px',
      data: { projectDetails: this.projectDetails, allowMultiple: true } //, allowMultiple : true
    });

    this.uploadDocumentDialog.afterClosed().subscribe(result => { });
  }

  showMappingSpec() {
    this.router.navigate(['/mappingSpec', this.projectDetails._id]);
  }

  viewConflict(projectDetails: any) {
    this.router.navigate(['/compare', projectDetails._id, 'viewProjectConflicts']);
  }

  // Re-upload document
  reUploadDocument(document: any) {
    this.reUploadDocumentDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: false,//true,
      width: '1000px',
      data: { projectDetails: this.projectDetails, allowMultiple: false, documentId: document._id, fileType: document.fileType } //, allowMultiple : false
    });

    this.reUploadDocumentDialog.afterClosed().subscribe(result => { });
  }

  // Download a document
  downloadDocument(documentDetails: any) {
    console.log(documentDetails);
    // var a = document.createElement('a');
    // a.href = this.projectViewService.endPointAddress + documentDetails.destination;
    // a.download = documentDetails.documentName;
    // a.click();

    const pdfUrl = (window.URL).createObjectURL(new Blob([this.projectViewService.endPointAddress + documentDetails.destination], { type: 'application/pdf' }));
    const anchor = document.createElement('a');
    anchor.href = pdfUrl;
    anchor.setAttribute("download", documentDetails.documentName);
    anchor.click();
  }

  deleteDocument(documentDetails: any) {
    this.projectViewService.deleteDocument({ 'projectId': documentDetails.projectId, 'documentId': documentDetails._id }).subscribe((deleteDocumentResponse: any) => {
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

}
