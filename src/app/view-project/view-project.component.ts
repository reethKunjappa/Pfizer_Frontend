// Dependency Imports
import { Component, OnInit } from '@angular/core';

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

  constructor( private projectViewService : ProjectViewService ) { 
    this.projectViewService.openProject( this.projectViewService.projectId ).subscribe(( projectDetails : any )=>{
      this.projectDetails = projectDetails;
      console.log("View Comp::",this.projectDetails);
    });
  }

  ngOnInit() {}
}
