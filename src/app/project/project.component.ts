// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

// Component Imports
import { CreateProjectModalComponent } from 'app/create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  // Property Declarations
  public projectTableHeaders: any = [
    { 'headerName': 'Project Name', 'width': '30%' },
    { 'headerName': 'Country', 'width': '15%' },
    { 'headerName': 'Created By', 'width': '20%' },
    { 'headerName': 'Created On', 'width': '15%' },
    { 'headerName': 'Conflicts', 'class': 'text-center', 'width' : '10%' },
    { 'headerName': 'Actions', 'class': 'text-center', 'width' : '10%' }
  ];

  public allProjectList: any[] = [];
  public createProjectDialog: any;

  constructor(private projectViewService: ProjectViewService, private router: Router, public dialog: MatDialog, private loggedInUserService : LoggedInUserService) {
    this.projectViewService.fetchAllProjects({ user: this.loggedInUserService.getNativeWindowRef() }).subscribe((allProjects: any) => {
      this.allProjectList = allProjects;
    });
  }

  ngOnInit() { }

  openProject(projectDetails: any) {
    this.projectViewService.projectID(projectDetails);
    this.projectViewService._initializeProjectId$.next(projectDetails);
    this.router.navigate(['/view', projectDetails._id]);
  }

  createProject() {
    this.createProjectDialog = this.dialog.open(CreateProjectModalComponent, {
      disableClose: false,//true,
      width: '650px',
      data: {}
    });

    this.createProjectDialog.afterClosed().subscribe(result => {
      if (result != undefined && result.status == 'Created') {
        this.router.navigate(['/view', result.data.result._id]);
      }
    });
  }

  openHistory(projectDetails: any) {
    this.router.navigate(['/history', projectDetails._id]);
  }

  openComments(projectDetails: any) {
    this.router.navigate(['/comments', projectDetails._id]);
  }

  markFavorite(projectDetails: any) {
    this.projectViewService.markFavorite({
      user: this.loggedInUserService.getNativeWindowRef(),
      project: projectDetails._id
    }).subscribe((markFavoriteResponse: any) => {
      if (markFavoriteResponse.status.code == 0) {
        this.allProjectList.map((e) => {
          if (e._id == markFavoriteResponse.result.project) {
            e.favorite = true;
          }
        });
      }
    });
  }

  unMarkFavorite(projectDetails: any) {
    this.projectViewService.unMarkFavorite({
      user: this.loggedInUserService.getNativeWindowRef(),
      project: projectDetails._id
    }).subscribe((unMarkFavoriteResponse: any) => {
      if (unMarkFavoriteResponse.status.code == 0) {
        // this.updateFavouriteStatus(unMarkFavoriteResponse.result.project, false);
        this.allProjectList.map((e) => {
          if (e._id == unMarkFavoriteResponse.result.project) {
            e.favorite = false;
          }
        });
      }
    });
  }

  updateFavouriteStatus(id: string, status: boolean) {
    this.allProjectList.filter(function (currentValue, index, arr) {
      if (currentValue._id == id) {
        arr[index].isFavourite = status;
      }
    });
  }

  openConflicts(projectDetails: any) {
    this.router.navigate(['/compare', projectDetails._id, 'viewProjectConflicts']);
  }

}
