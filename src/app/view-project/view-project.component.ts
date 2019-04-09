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
  styleUrls: ['./view-project.component.scss']
})

export class ViewProjectComponent implements OnInit {

  // Property Declarations
  public documentTableHeaders = [ 'Document Name', 'Document Type', 'Uploaded By', 'Uploaded On', 'Actions'];
  public projectDetails : any = {};
  public uploadDocumentDialog : any;

  constructor( private projectViewService : ProjectViewService, private router : Router, private activatedRoute : ActivatedRoute, public dialog: MatDialog ) { 
    this.activatedRoute.paramMap.subscribe(( params : any )=>{
      if ( params.get('id') != "" && params.get('id') != undefined && params.get('id') != null ) {
        this.projectViewService.openProject( params.get('id') ).subscribe(( projectDetails : any )=>{
          this.projectDetails = projectDetails;
        });
      }
    });

    // this.projectViewService.openProject( this.projectViewService.projectId ).subscribe(( projectDetails : any )=>{
    //   this.projectDetails = projectDetails;
    //   console.log("View Comp::",this.projectDetails);
    // });
  }

  ngOnInit() {}

  showConflict(projectDetails) {
    this.router.navigate(['/compare', projectDetails._id]);
  }

  uploadMoreDocuments(){
    this.uploadDocumentDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: false,//true,
      width: '1000px',          
      data: { projectDetails : this.projectDetails }
    });

    this.uploadDocumentDialog.afterClosed().subscribe(result => {
      console.log("View Comp Close Modal::", result);
    });

    // this.projectViewService.projectID(this.projectDetails);
    // this.router.navigate(['/create/' + this.projectDetails._id ]);
  }

}
