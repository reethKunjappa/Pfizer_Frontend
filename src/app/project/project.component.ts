// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';

// Component Imports
import { CreateProjectModalComponent } from 'app/create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  // Property Declarations
  public projectTableHeaders : string[] = [ 'Favorite', 'Project Name', 'Country', 'Created By', 'Created On', 'Conflicts']; // 'Id',
  public allProjectList : any[] = [];
  public createProjectDialog : any;

  constructor( private projectViewService : ProjectViewService, private router : Router, public dialog: MatDialog ) { 
    this.projectViewService.fetchAllProjects().subscribe(( allProjects : any )=>{
      this.allProjectList = allProjects;
    });   
  }

  ngOnInit() {}

  openProject(projectDetails : any){
    this.projectViewService.projectID(projectDetails);
    this.projectViewService._initializeProjectId$.next(projectDetails);
    this.router.navigate(['/view', projectDetails._id]);
  }

  createProject(){
    this.createProjectDialog = this.dialog.open(CreateProjectModalComponent, {
      disableClose: false,//true,
      width: '650px',          
      data: {}
    });

    this.createProjectDialog.afterClosed().subscribe(result => {
      console.log("Project Comp Close Modal::", result);
      if ( result != undefined && result.status == 'Created') {
        this.router.navigate(['/view', result.data.result._id]);
      }
    });
    // this.projectViewService.projectID({ '_id' : "" });
    // this.router.navigate(['/create',{}]);
  }

}
