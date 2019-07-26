// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MatDialog, MatFormFieldControl, MatDialogRef } from '@angular/material';

// Model Imports
import { CountryConfigurationsData } from '../models/country-configurations.model';

// Component Imports
import { UploadDocumentsModalComponent } from '../upload-documents-modal/upload-documents-modal.component';

// Service Imports
import { CountryCodeService } from '../services/country-code.service';
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from 'app/services/logged-in-user.service';

@Component({
  selector: 'app-country-config',
  templateUrl: './country-config.component.html',
  styleUrls: ['./country-config.component.css']
})

export class CountryConfigComponent implements OnInit {

  // Property Declaration
  public countryData: any[] = [];
  public languages: any[] = [
    { name: 'English (UK)' },
    { name: 'English (US)' },
  ];
  public documentTableHeaders = [
    { 'headerName': 'Document Name', 'class': '', 'width': '35%' },
    { 'headerName': 'Document Type', 'class': '', 'width': '15%' },
    { 'headerName': 'Uploaded By', 'class': '', 'width': '20%' },
    { 'headerName': 'Uploaded On', 'class': '', 'width': '12%' },
    { 'headerName': 'Actions', 'class': '', 'width': '15%' }
  ];
  public uploadConfigDocDialog : any;
  public countryConfigForm : FormGroup;
  public countryConfig : CountryConfigurationsData = new CountryConfigurationsData();
  public countryConfigData : any;
  public disableCreate : boolean = false;

  constructor(private countryCodeService: CountryCodeService, private projectViewService : ProjectViewService, public dialog: MatDialog, public dialogRef : MatDialogRef<CountryConfigComponent>, private loggedInUserService : LoggedInUserService) {
    this.countryData = this.countryCodeService.getCountryCodeData();
    this.countryConfigForm = new FormGroup({
      country: new FormControl('', Validators.required),
      countryGrouping: new FormControl('', Validators.required),
      languagePreference : new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  createCountryConfig() {
    this.countryConfig.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.projectViewService.createCountryConfig(this.countryConfig).subscribe(( createCountryConfigResp : any )=>{
      this.countryConfigData = createCountryConfigResp.result;
      this.disableCreate = true;
    });
  }

  uploadConfigDoc() {
    this.uploadConfigDocDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: true, //false,
      width: '1000px',
      data: { section : 'configuration', configDetails: this.countryConfigData, allowMultiple: true, documentId: this.countryConfigData._id, fileType: '' }
    });

    this.uploadConfigDocDialog.afterClosed().subscribe((result) => { 
      if ( result.uploadComplete === true ) {}     
    });
  }

  close(){
    this.dialogRef.close('Submit');
  }

}
