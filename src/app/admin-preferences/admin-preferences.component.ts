// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

// Service Imports
import { CountryCodeService } from '../services/country-code.service';
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

// Component Imports
import { StatusComponent } from '../status/status.component';
import { SpeedDialFabPosition } from '../speed-dial-fab/speed-dial-fab.component';
import { CountryConfigComponent } from '../country-config/country-config.component';
import { RulesConfigComponent } from '../rules-config/rules-config.component';

@Component({
  selector: 'app-admin-preferences',
  templateUrl: './admin-preferences.component.html',
  styleUrls: ['./admin-preferences.component.css'],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } }, StatusComponent, CountryConfigComponent, RulesConfigComponent],
})

export class AdminPreferencesComponent implements OnInit {

  //Property Declarations
  public countryData: any[] = [];
  public countryConfigTableHeaders: any[] = [
    { 'headerName': 'Country(s)', 'class': 'px-2', 'width': '10%' },
    { 'headerName': 'Country Group', 'class': 'px-2', 'width': '10%' },
    { 'headerName': 'Document(s)', 'class': 'px-2', 'width': '40%' },
    { 'headerName': 'Language', 'class': 'px-2', 'width': '10%' },    
    { 'headerName': 'Actions', 'class': 'px-2', 'width': '5%' },
    // { 'headerName': 'Created By', 'class': 'px-2', 'width': '20%' },
    // { 'headerName': 'Created On', 'class': 'px-2', 'width': '10%' },
  ];
  public rulesConfigTableHeaders: any[] = [
    { 'headerName': 'Name', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Description', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Country(s)', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Condition', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Section(s)', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Conflict Type', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Comments', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Additional Information', 'class': 'px-2', 'width': '15%' },
    { 'headerName': 'Exception(s)', 'class': 'px-2', 'width': '10%' },
    { 'headerName': 'Created By', 'class': 'px-2', 'width': '8%' },
    { 'headerName': 'Created On', 'class': 'px-2', 'width': '7%' },
    { 'headerName': 'Actions', 'class': 'px-2', 'width': '5%' },
    // { 'headerName': 'Document(s)', 'class': 'px-2', 'width': '20%' },    
    // { 'headerName': 'Modify Label on Access', 'class': 'px-2', 'width': '10%' },
    // { 'headerName': 'Allow Reject', 'class': 'px-2', 'width': '10%' },
  ];
  // Fab Dial Declarations
  public speedDialFabButtons = [
    {
      icon: 'language',
      tooltip: 'Country Configuration',
      tooltipPosition : 'left',
      value: 'country',
    },
    {
      icon: 'timeline',//'view_headline',
      tooltip: 'Rule Configuration',
      tooltipPosition : 'left',
      value: 'rules'
    },
  ];

  SpeedDialFabPosition = SpeedDialFabPosition;
  speedDialFabColumnDirection = 'column';
  speedDialFabPosition = SpeedDialFabPosition.Top;
  speedDialFabPositionClassName = 'speed-dial-container-top';

  public ruleConfigDialog : any;
  public countryConfigDialog : any;
  public allConfigDetails : any;

  constructor(private countryCodeService: CountryCodeService, private projectViewService: ProjectViewService, public dialog: MatDialog, private loggedInUserService: LoggedInUserService) {
    this.countryData = this.countryCodeService.getCountryCodeData();
    this.getAllConfigurations();
  }

  ngOnInit() { }

  getAllConfigurations(){
    this.projectViewService.getAllConfigurations({ 'createdBy' : this.loggedInUserService.getNativeWindowRef() }).subscribe(( getAllConfigResp : any )=>{
      this.allConfigDetails = getAllConfigResp.result;
    });
  }

  deleteConfiguration( config : any, configType : string ) {
    this.projectViewService.deleteConfiguration({ '_id' : config._id, 'configType' : configType }).subscribe(( deleteConfigurationResp : any )=>{
      if ( deleteConfigurationResp.result != null && deleteConfigurationResp != undefined && deleteConfigurationResp != {} ) {
        if ( deleteConfigurationResp.result.configType === 'Rule' ) {
          this.removeConfigAfterResp( this.allConfigDetails.ruleConfig, deleteConfigurationResp.result._id );
        }else if( deleteConfigurationResp.result.configType === 'Country' ) {
          this.removeConfigAfterResp( this.allConfigDetails.countryConfig, deleteConfigurationResp.result._id );
        }else { return; }
      }
    });
  }

  removeConfigAfterResp( configArray, id ) {
    configArray.filter((e)=>{
      if ( e._id === id) configArray.splice( configArray.indexOf(e), 1);
    });  
  }

  onPositionChange(position: SpeedDialFabPosition) {
    switch(position) {
      case SpeedDialFabPosition.Bottom:
        this.speedDialFabPositionClassName = 'speed-dial-container-bottom';
        this.speedDialFabColumnDirection = 'column-reverse';
        break;
      default:
        this.speedDialFabPositionClassName = 'speed-dial-container-top';
        this.speedDialFabColumnDirection = 'column';
    }
  }

  onSpeedDialFabClicked(btn: any) {
    if ( btn.value === 'rules' ) {
      this.ruleConfigDialog = this.dialog.open(RulesConfigComponent, {
        disableClose: true,//true,
        width: '1000px',
        data: {}
      });
  
      this.ruleConfigDialog.afterClosed().subscribe(result => {
        if (result === 'Submit') {
          this.getAllConfigurations();
        }
      });
    }else if( btn.value === 'country' ){
      this.countryConfigDialog = this.dialog.open(CountryConfigComponent, {
        disableClose: true,//true,
        width: '1000px',
        data: {}
      });
  
      this.countryConfigDialog.afterClosed().subscribe(result => {
        if (result === 'Submit') {
          this.getAllConfigurations();
        }
      });
    }else {
      return;
    }
  }

}
