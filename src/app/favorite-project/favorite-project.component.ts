// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service Imports
import { ProjectViewService } from 'app/services/project-view.service';

@Component({
  selector: 'app-favorite-project',
  templateUrl: './favorite-project.component.html',
  styleUrls: ['./favorite-project.component.css']
})

export class FavoriteProjectComponent implements OnInit {

  // Property Declarations
  public projectTableHeaders : string[] = [ '', 'Project Name', 'Country', 'Created By', 'Created On', 'Conflicts']; // 'Id',
  public allFavoriteList : any[] = [];

  constructor(private projectViewService : ProjectViewService, private router : Router) { 
    // Favorite API needs to be INtegrated. This is a dummy API  
    this.projectViewService.fetchFavoriteProjects({ user : this.projectViewService.loggedInUser }).subscribe(( allFavProjects : any )=>{
      // allFavProjects.forEach(element => {element.favorite = true;});
      this.allFavoriteList = allFavProjects;
    });
  }

  ngOnInit() {}

  markFavorite( projectDetails : any ) {
    this.projectViewService.markFavorite({
      user : this.projectViewService.loggedInUser,
      project: projectDetails._id
    }).subscribe(( markFavoriteResponse : any ) =>{
      console.log("markFavoriteResponse", markFavoriteResponse);
    });
  }

  unMarkFavorite( projectDetails : any ) {
    this.projectViewService.unMarkFavorite({
      user : this.projectViewService.loggedInUser,
      project : projectDetails._id
    }).subscribe((unMarkFavoriteResponse : any)=>{
      console.log("unMarkFavoriteResponse::",unMarkFavoriteResponse);      
    });
  }

  openProject(projectDetails : any){
    this.projectViewService.projectID(projectDetails);
    this.projectViewService._initializeProjectId$.next(projectDetails);
    this.router.navigate(['/view', projectDetails._id]);
  }

  openHistory( projectDetails : any ) {
    this.router.navigate(['/history', projectDetails._id]);    
  }

  openComments( projectDetails : any ) {
    this.router.navigate(['/comments', projectDetails._id]);
  }

}
