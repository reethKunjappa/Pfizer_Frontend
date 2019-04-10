// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { countries } from "country-flags-svg";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

// Model Imports
import { CreateProjectData } from '../models/create-project.model';

// Services Imports
import { ProjectViewService } from '../services/project-view.service';

// Component Imports
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css'],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } }, StatusComponent],
})

export class CreateProjectModalComponent implements OnInit {

  // Property Declarations
  public projectForm: FormGroup;
  public createProjectData: CreateProjectData = new CreateProjectData();
  public countryData: any[] = countries;
  public loggedInUser: any = { 'email': 'a@a.aa', 'name': 'Shashank Honrao', 'userId' : 'SHonrao' };
  public statusDialog : any;

  constructor(private projectViewService: ProjectViewService, public dialogRef: MatDialogRef<CreateProjectModalComponent>, public dialog: MatDialog) {
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
    this.createProjectData.createdBy = this.projectViewService.loggedInUser; //this.loggedInUser;
    this.projectViewService.createProject(this.createProjectData).subscribe((createStatus: any) => {
      if ( createStatus != "" && createStatus != undefined ) {
        this.statusDialog = this.dialog.open(StatusComponent, {
          disableClose: true,
          width: '400px',
          data: {
            statusText: createStatus.status.message,
            statusTitle: createStatus.status.code == '0' ? 'Success' : 'Error',
            showSubmit: true,
            showCancel: false,
            submitText: 'Ok',
            cancelText: 'Cancel',
          },
        });

        this.statusDialog.afterClosed().subscribe(result => {
          if ( result == 'Submit' ) {
            this.dialogRef.close({'status' : 'Created' , 'data' : createStatus});                      
          }
        });
      }
    });
  }

}
