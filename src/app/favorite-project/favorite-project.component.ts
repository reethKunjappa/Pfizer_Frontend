// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service Imports
import { ProjectViewService } from 'app/services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

@Component({
  selector: 'app-favorite-project',
  templateUrl: './favorite-project.component.html',
  styleUrls: ['./favorite-project.component.css']
})

export class FavoriteProjectComponent implements OnInit {

  // Property Declarations
  public projectTableHeaders: any = [
    { 'headerName': 'Project Name', 'width': '30%' },
    { 'headerName': 'Country', 'width': '15%' },
    { 'headerName': 'Created By', 'width': '20%' },
    { 'headerName': 'Created On', 'width': '15%' },
    { 'headerName': 'Conflicts', 'class': 'text-center', 'width' : '10%' },
    { 'headerName': 'Actions', 'class': 'text-center', 'width' : '10%' }
  ];

  public allFavoriteList: any[] = [];

  constructor(private projectViewService: ProjectViewService, private router: Router, private loggedInUserService : LoggedInUserService) {
    // Favorite API needs to be INtegrated. This is a dummy API  
    this.projectViewService.fetchFavoriteProjects({ user: this.loggedInUserService.getNativeWindowRef() }).subscribe((allFavProjects: any) => {
      // allFavProjects.forEach(element => {element.favorite = true;});
      this.allFavoriteList = allFavProjects;
    });
  }

  ngOnInit() { }

  unMarkFavorite(projectDetails: any) {
    this.projectViewService.unMarkFavorite({
      user: this.loggedInUserService.getNativeWindowRef(),
      project: projectDetails._id
    }).subscribe((unMarkFavoriteResponse: any) => {
      if (unMarkFavoriteResponse.status.code == 0) {
        this.allFavoriteList.map((e) => {
          if (e._id == unMarkFavoriteResponse.result.project) {
            let index = this.allFavoriteList.indexOf(e);
            this.allFavoriteList.splice(index, 1);
          }
        });
      }
    });
  }

  openProject(projectDetails: any) {
    this.projectViewService.projectID(projectDetails);
    this.projectViewService._initializeProjectId$.next(projectDetails);
    this.router.navigate(['/view', projectDetails._id]);
  }

  openHistory(projectDetails: any) {
    this.router.navigate(['/history', projectDetails._id]);
  }

  openComments(projectDetails: any) {
    this.router.navigate(['/comments', projectDetails._id]);
  }

  openConflicts(projectDetails: any) {
    this.router.navigate(['/compare', projectDetails._id, 'viewProjectConflicts']);
  }

}
