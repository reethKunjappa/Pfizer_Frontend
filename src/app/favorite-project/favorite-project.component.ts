// Dependency Imports
import { Component, OnInit } from '@angular/core';

// Service Imports
import { ProjectViewService } from 'app/services/project-view.service';

@Component({
  selector: 'app-favorite-project',
  templateUrl: './favorite-project.component.html',
  styleUrls: ['./favorite-project.component.css']
})

export class FavoriteProjectComponent implements OnInit {

  // Property Declarations
  public projectTableHeaders : string[] = [ 'Favorite', 'Project Name', 'Country', 'Created By', 'Created On', 'Conflicts']; // 'Id',
  public allFavoriteList : any[] = [];

  constructor(private projectViewService : ProjectViewService) { 
    // Favorite API needs to be INtegrated. This is a dummy API  
    this.projectViewService.fetchAllProjects().subscribe(( allProjects : any )=>{
      allProjects.forEach(element => {element.favorite = true;});
      this.allFavoriteList = allProjects;
    });  
  }

  ngOnInit() {}

  unMarkFavorite( project : any ) {
    console.log("unMarkFavorite::", project);
    // Call the unMarkFavorite API and in the success response pop the respective records from this.allFavoriteList array    
  }

}
