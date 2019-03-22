// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  // Property Declarations
  public projectTableHeaders : string[] = [ 'Favorite', 'Project Name', 'Country', 'Created By', 'Created On', 'Conflicts']; // 'Id',
  public allProjectList : any[] = [];

  constructor( private projectViewService : ProjectViewService, private router : Router ) { 
    this.projectViewService.fetchAllProjects().subscribe(( allProjects : any )=>{
      this.allProjectList = allProjects;
      console.log("Fetch All Projects Resp::", this.allProjectList);
    });   
  }

  ngOnInit() {}

  openProject(projectDetails : any){
    this.projectViewService.projectID(projectDetails);
    this.router.navigate(['/view',{}]);
  }

}
