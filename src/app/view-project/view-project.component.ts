// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})

export class ViewProjectComponent implements OnInit {

  // Property Declarations
  public documentTableHeaders = [ 'Document Name', 'Document Type', 'Uploaded By', 'Uploaded On'];
  public projectDetails : any = {};

  constructor( private projectViewService : ProjectViewService, private router : Router, private activatedRoute : ActivatedRoute ) { 
    this.activatedRoute.paramMap.subscribe(( params : any )=>{
      if ( params.get('id') != "" && params.get('id') != undefined && params.get('id') != null ) {
        this.projectViewService.openProject( params.get('id') ).subscribe(( projectDetails : any )=>{
          this.projectDetails = projectDetails;
          console.log("View Comp::",this.projectDetails);
        });        
      }
    });

    // this.projectViewService.openProject( this.projectViewService.projectId ).subscribe(( projectDetails : any )=>{
    //   this.projectDetails = projectDetails;
    //   console.log("View Comp::",this.projectDetails);
    // });
  }

  ngOnInit() {}

  uploadMoreDocuments(){
    this.projectViewService.projectID(this.projectDetails);
    this.router.navigate(['/create/' + this.projectDetails._id ]);
  }

}
