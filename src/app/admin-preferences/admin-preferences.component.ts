// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

// Service Imports
import { CountryCodeService } from '../services/country-code.service';
import { ProjectViewService } from '../services/project-view.service';

// Model Imports
import { AdminPreferencesData } from '../models/admin-preferences.model';

// Component Imports
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'app-admin-preferences',
  templateUrl: './admin-preferences.component.html',
  styleUrls: ['./admin-preferences.component.css'],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } }, StatusComponent],
})

export class AdminPreferencesComponent implements OnInit {

  //Property Declarations
  public adminPreferencesData : AdminPreferencesData = new AdminPreferencesData();
  public countryName : string = "";
  public language : string = "";
  public countryData: any[] = [];
  public languages: any[] = [
    { name: 'English (UK)' },
    { name: 'English (US)' },
    { name: 'German' },
    { name: 'French' },
  ];
  public countrySelected: any = {
    id: "",
    name: ""
  };
  public countryLanguageTableHeaders = [
    { 'headerName': 'Country Name', 'class': 'px-2', 'width': '45%' },
    { 'headerName': 'Language', 'class': 'px-2', 'width': '45%' },
    { 'headerName': 'Actions', 'class' : 'px-2', 'width': '10' }
  ];
  public panelOpenState: boolean = false;
  public adminPrefData : any;
  public adminPrefDataStore : any;
  public selectedIndex : number = -1;
  public setLanguageDialog : any;

  constructor(private countryCodeService: CountryCodeService, private projectViewService : ProjectViewService, public dialog: MatDialog) {
    this.countryData = this.countryCodeService.getCountryCodeData();
    this.projectViewService.fetchAdminPreferences().subscribe(( fetchAdminPrefResp : any )=>{
      if ( fetchAdminPrefResp != null && fetchAdminPrefResp != undefined && fetchAdminPrefResp.result != null ) {
        this.adminPrefDataStore = Object.assign({}, fetchAdminPrefResp.result);
        this.adminPrefData = Object.assign({}, this.adminPrefDataStore);
      }
    });
  }

  ngOnInit() { }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  setCountry(event, item) {
    if (event.isUserInput) {
      if (item != "" && item != undefined) {
        if (this.countrySelected.id != item['flag']) {
          this.countrySelected.id = item['flag'];
          this.countrySelected.name = item['name'];
        }
      }
    }
  }

  setCountryLanguage() {
    let count = 0;
    if ( this.adminPrefData ) {
      this.adminPrefData.countryPreferences.filter((e)=>{
        if( e.countryName == this.countryName ){
          count++;
        }
      });        
    }

    if ( count < 1 ) {
      this.adminPreferencesData.countryPreferences.push({ 'countryName' : this.countryName, 'language' : this.language });
      this.countryName = "";
      this.language = "";
      this.countrySelected = { id: "", name: "" };
      this.projectViewService.addAdminPreferences( this.adminPreferencesData ).subscribe((addAdminPrefResp : any)=>{
        if ( addAdminPrefResp != undefined && addAdminPrefResp != null && addAdminPrefResp.result != null ) {
          this.adminPrefDataStore = Object.assign({}, addAdminPrefResp.result);
          this.adminPrefData = Object.assign({}, this.adminPrefDataStore);          
        }
      });        
    }else {
      this.setLanguageDialog = this.dialog.open(StatusComponent, {
        disableClose: true,
        width: '400px',
        data: {
          statusText: 'Country already exists. Edit the language from the table.',
          statusTitle: 'Warning',
          showSubmit: true,
          showCancel: false,
          submitText: 'Ok',
          cancelText: 'Cancel',
        },
      });

      this.setLanguageDialog.afterClosed().subscribe(result => {
          this.countryName = "";
          this.language = "";            
      });
    }

  }

  editLanguage( index : number ) {
    this.adminPrefData = Object.assign({}, this.adminPrefDataStore);
    this.selectedIndex = index;
  }

  saveLanguage(index : number){
    let obj = {
      'countryPreferences' : this.adminPrefData.countryPreferences[index]
    }; 
    this.projectViewService.updateCountryLanguage(obj).subscribe((updateCtryLangResp:any)=>{
      if ( updateCtryLangResp != undefined && updateCtryLangResp != null && updateCtryLangResp.result != null ) {
        this.adminPrefDataStore = Object.assign({}, updateCtryLangResp.result);
        this.adminPrefData = Object.assign({}, this.adminPrefDataStore);
      }
    });
    this.selectedIndex = -1;
  }

}
