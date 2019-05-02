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
    { 'headerName': 'Uploaded On', 'class': '', 'width': '12%' },
    { 'headerName': 'Actions', 'class': '', 'width': '18%' }
  ];
  public projectDetails: any = {};
  public uploadDocumentDialog: any;
  public reUploadDocumentDialog: any;

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

  showMappingSpec(doc) {
    var inputResponse = {
      "label_filepath" : "",
      "reference_filepath": []
    }
    
    for(var i = 0 ; i < doc.length;i++){
      if(doc[i].fileType == 'Label'){
        // inputResponse.label_filepath = "C:\\Users\\Reeth\\projects\\Pfizer_Backend\\fs\\"+doc[i].documentid+"\\"+doc[i].documentName;        
        inputResponse.label_filepath = doc[i].pdfPath.location.replace('pdf', 'docx');
      }else if(doc[i].fileType == 'Reference'){
        inputResponse.reference_filepath[0] = doc[i].pdfPath.location;
      }
    }
    this.projectViewService._initializeMappingSpec$.next(inputResponse); 
    this.projectViewService.mappingFileData = inputResponse;   
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

  showCheckList( projectDetails : any ) {
    this.router.navigate([ '/checklist', projectDetails._id ]);
  }

}
