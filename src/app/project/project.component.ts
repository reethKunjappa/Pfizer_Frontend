import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  public projectTableHeaders : string[] = [ 'Favorite', 'Id', 'Project Name', 'Country', 'Created By', 'Created On', 'Conflicts'];

  public projectList = [
    {
      id : "001",
      sequenceNumber : 1,
      projectName : "Project One",
      country : {
          id : "+91",
          name : "India"
      },
      createdBy : {
          email : "shashank.honrao@dfoundry.ai",
          name : "Shashank Honrao"
      },
      createdOn : "14-Mar-2019",
      conflicts : {
          number : 18,
          types : {
              fontConflicts : 1,
              contentConflicts : 10,
              orderConflicts : 7,
          },
      },
      favorite : true    
    },
    {
      id : "002",
      sequenceNumber : 2,
      projectName : "Project Two",
      country : {
          id : "+91",
          name : "India"
      },
      createdBy : {
          email : "bdev@dfoundry.ai",
          name : "Biplab Dev"
      },
      createdOn : "12-Mar-2019",
      conflicts : {
          number : 17,
          types : {
              fontConflicts : 3,
              contentConflicts : 5,
              orderConflicts : 9,
          },
      },
      favorite : false    
    },
    {
      id : "003",
      sequenceNumber : 3,
      projectName : "Project Three",
      country : {
          id : "+01",
          name : "USA"
      },
      createdBy : {
          email : "prasenjit.ghosh@dfoundry.ai",
          name : "Prasenjit Ghosh"
      },
      createdOn : "25-Feb-2019",
      conflicts : {
          number : 20,
          types : {
              fontConflicts : 8,
              contentConflicts : 10,
              orderConflicts : 2,
          },
      },
      favorite : true    
    },
  ];    

  constructor() { }

  ngOnInit() {}

}
