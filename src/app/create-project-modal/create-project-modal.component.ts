// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { countries } from "country-flags-svg";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Model Imports
import { CreateProjectData } from '../models/create-project.model';

// Services Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css']
})

export class CreateProjectModalComponent implements OnInit {

  // Property Declarations
  public projectForm: FormGroup;
  public createProjectData: CreateProjectData = new CreateProjectData();
  public countryData: any[] = countries;
  public loggedInUser: any = { 'email': 'a@a.aa', 'name': 'Shashank Honrao', 'userId' : 'SHonrao' };

  constructor(private projectViewService: ProjectViewService, public dialogRef: MatDialogRef<CreateProjectModalComponent>) {
    // Form Validations Declarations
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  setCountry(event, item) {
    if (event.isUserInput) {
      if (item != "" && item != undefined) {
        if (this.createProjectData.country.id != item['flag']) {
          this.createProjectData.country.id = item['flag'];
          this.createProjectData.country.name = item['name'];
        }
      }
    }
  }

  createProject() {
    this.createProjectData.createdBy = this.loggedInUser;
    this.projectViewService.createProject(this.createProjectData).subscribe((createStatus: any) => {
      if ( createStatus != "" && createStatus != undefined ) {
        console.log("Create Project Status::", createStatus);
        if ( createStatus.status.code == '0' ) {
          this.dialogRef.close({'status' : 'Created' , 'data' : createStatus});          
        }
      }
    });
  }

}
