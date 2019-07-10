// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

// Service Imports
import { CountryCodeService } from '../services/country-code.service';
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

// Model Imports
// import { AdminPreferencesData } from '../models/admin-preferences.model';
import { AdminRulesData } from '../models/admin-rules-data.model';
import { AdminRulesDetailsData } from '../models/admin-rules-details-data.model';

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
  public countryData: any[] = [];
  public languages: any[] = [
    { name: 'English (UK)' },
    { name: 'English (US)' },
  ];
  public countryLanguageTableHeaders: any[] = [
    { 'headerName': 'Country', 'class': 'px-2', 'width': '20%' },
    { 'headerName': 'Section(s)', 'class': 'px-2', 'width': '30%' },
    { 'headerName': 'Content', 'class': 'px-2', 'width': '15%' },
    { 'headerName': 'Created By', 'class': 'px-2', 'width': '15%' },
    { 'headerName': 'Created On', 'class': 'px-2', 'width': '10%' },
    { 'headerName': 'Actions', 'class': 'px-2', 'width': '10%' }
  ];
  public addTagText: any;

  // Updated Preferences Page Declarations
  public sectionNames: any[] = [];

  public updateRulesArray: AdminRulesData[] = [];
  public ruleDetails;
  public rule1Details: AdminRulesData = new AdminRulesData();
  public rule2Details: AdminRulesData = new AdminRulesData();
  public rule3Details: AdminRulesData = new AdminRulesData();
  public rule4Details: AdminRulesData = new AdminRulesData();
  public rule5Details: AdminRulesData = new AdminRulesData();
  public rule6Details: AdminRulesData = new AdminRulesData();
  public rule7Details: AdminRulesData = new AdminRulesData();

  public createRule1: AdminRulesDetailsData = new AdminRulesDetailsData();
  public createRule2: AdminRulesDetailsData = new AdminRulesDetailsData();
  public createRule3: AdminRulesDetailsData = new AdminRulesDetailsData();
  public createRule4: AdminRulesDetailsData = new AdminRulesDetailsData();
  public createRule5: AdminRulesDetailsData = new AdminRulesDetailsData();
  public createRule6: AdminRulesDetailsData = new AdminRulesDetailsData();
  public createRule7: AdminRulesDetailsData = new AdminRulesDetailsData();

  public rule1Checked: boolean = false;
  public rule2Checked: boolean = false;
  public rule3Checked: boolean = false;
  public rule4Checked: boolean = false;
  public rule5Checked: boolean = false;
  public rule6Checked: boolean = false;
  public rule7Checked: boolean = false;

  constructor(private countryCodeService: CountryCodeService, private projectViewService: ProjectViewService, public dialog: MatDialog, private loggedInUserService: LoggedInUserService) {
    this.countryData = this.countryCodeService.getCountryCodeData();

    this.projectViewService.getPreferenceRules().subscribe((preferenceRules: any) => {
      this.filterRulesResponses(preferenceRules);
    });

  }

  ngOnInit() { }

  setScope(event, ruleName) {
    switch (ruleName) {
      case "Rule 1": {
        this.createRule1.scope = event ? "Document" : "Section";
        if ( event ) this.createRule1.sectionName = [];          
        break;
      }
      case "Rule 2": {
        this.createRule2.scope = event ? "Document" : "Section";
        if ( event ) this.createRule2.sectionName = [];          
        break;
      }
      case "Rule 3": {
        this.createRule3.scope = event ? "Document" : "Section";
        if ( event ) this.createRule3.sectionName = [];          
        break;
      }
      case "Rule 4": {
        this.createRule4.scope = event ? "Document" : "Section";
        if ( event ) this.createRule4.sectionName = [];          
        break;
      }
      case "Rule 5": {
        this.createRule5.scope = event ? "Document" : "Section";
        if ( event ) this.createRule5.sectionName = [];          
        break;
      }
      case "Rule 6": {
        this.createRule6.scope = event ? "Document" : "Section";
        if ( event ) this.createRule6.sectionName = [];          
        break;
      }
      case "Rule 7": {
        this.createRule7.scope = event ? "Document" : "Section";
        if ( event ) this.createRule7.sectionName = [];          
        break;
      }
      default: {
        break;
      }
    }
  }

  // Updated Preferences Page Data
  addRule1() {
    this.createRule1.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule1.scope = this.rule1Checked ? "Document" : "Section";
    this.rule1Details.details.push(this.createRule1);
    this.createRule1 = new AdminRulesDetailsData();
    this.rule1Checked = false;
  }

  addRule2() {
    this.createRule2.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule2.scope = "Document";
    this.rule2Details.details.push(this.createRule2);
    this.createRule2 = new AdminRulesDetailsData();
  }

  addRule3() {
    this.createRule3.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule3.scope = this.rule3Checked ? "Document" : "Section";
    this.rule3Details.details.push(this.createRule3);
    this.createRule3 = new AdminRulesDetailsData();
    this.rule3Checked = false;
  }

  addRule4() {
    this.createRule4.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule4.scope = this.rule4Checked ? "Document" : "Section";
    this.rule4Details.details.push(this.createRule4);
    this.createRule4 = new AdminRulesDetailsData();
    this.rule4Checked = false;
  }

  addRule5() {
    this.createRule5.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule5.scope = this.rule5Checked ? "Document" : "Section";
    this.rule5Details.details.push(this.createRule5);
    this.createRule5 = new AdminRulesDetailsData();
    this.rule5Checked = false;
  }

  addRule6() {
    this.createRule6.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule6.scope = this.rule6Checked ? "Document" : "Section";
    this.rule6Details.details.push(this.createRule6);
    this.createRule6 = new AdminRulesDetailsData();
    this.rule6Checked = false;
  }

  addRule7() {
    this.createRule7.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.createRule7.scope = "Document";
    this.rule7Details.details.push(this.createRule7);
    this.createRule7 = new AdminRulesDetailsData();
  }

  // addCustomUser = (term) => ({ id: term, name: term });

  addPreferenceRules() {
    this.updateRulesArray = [];
    this.updateRulesArray.push(this.rule1Details);
    this.updateRulesArray.push(this.rule2Details);
    this.updateRulesArray.push(this.rule3Details);
    this.updateRulesArray.push(this.rule4Details);
    this.updateRulesArray.push(this.rule5Details);
    this.updateRulesArray.push(this.rule6Details);
    this.updateRulesArray.push(this.rule7Details);
    this.projectViewService.addPreferenceRules(this.updateRulesArray).subscribe(( updatePreferenceRulesResp : any )=>{
      this.filterRulesResponses(updatePreferenceRulesResp);
    });
  }

  deletePreferenceRule(ruleDetails, index) {
    if ( ruleDetails.details[index].hasOwnProperty('_id') ) {
      this.projectViewService.deletePreferenceRule({ "p_id" : ruleDetails._id, "obj_id" : ruleDetails.details[index]._id }).subscribe(( deletePreferenceRuleResp : any )=>{
        this.filterRulesResponses(deletePreferenceRuleResp);
      });
    }else {
      ruleDetails.details.pop(index);
    }
  }

  filterRulesResponses( responseArray : any ) {
    this.ruleDetails = responseArray.result;
    if ( this.ruleDetails.length > 0 ) {
      this.rule1Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 1' });
      this.rule2Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 2' });
      this.rule3Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 3' });
      this.rule4Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 4' });
      this.rule5Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 5' });
      this.rule6Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 6' });
      this.rule7Details = this.ruleDetails.find((x) => { return x.ruleName === 'Rule 7' });        
    }else {
      this.rule1Details.ruleName = "Rule 1";
      this.rule1Details.action = "Remove Check";
      this.rule2Details.ruleName = "Rule 2";
      this.rule2Details.action = "Language";
      this.rule3Details.ruleName = "Rule 3";
      this.rule3Details.action = "Include";
      this.rule4Details.ruleName = "Rule 4";
      this.rule4Details.action = "Exclude";
      this.rule5Details.ruleName = "Rule 5";
      this.rule5Details.action = "Uppercase";
      this.rule6Details.ruleName = "Rule 6";
      this.rule6Details.action = "Lowercase";
      this.rule7Details.ruleName = "Rule 7";
      this.rule7Details.action = "Replace";
    }
  }

  disableRule1( createRuleData : any ) {
    if( createRuleData.sectionName.length > 0 ) createRuleData.scope = "Section";
    if( createRuleData.country.length > 0 && ((createRuleData.scope == 'Document' && createRuleData.sectionName.length < 1 ) || ( createRuleData.scope == 'Section' && createRuleData.sectionName.length > 0 ))) return false;
    else return true;
  }

  disableRule2( createRuleData2 : any ) {
    if( createRuleData2.sectionName.length > 0 ) createRuleData2.scope = "Section";
    if( createRuleData2.country.length > 0 && createRuleData2.content.length > 0 && createRuleData2.content[0] != null  ) return false;
    else return true;
  }

  disableRuleRest( createRuleData : any ) {
    if( createRuleData.sectionName.length > 0 ) createRuleData.scope = "Section";
    if( createRuleData.country.length > 0 && createRuleData.content != "" && ((createRuleData.scope == 'Document' && createRuleData.sectionName.length < 1 ) || ( createRuleData.scope == 'Section' && createRuleData.sectionName.length > 0 ))) return false;
    else return true;
  }

  disableRule7( createRule7 : any ) {
    if( createRule7.sectionName.length > 0 ) createRule7.scope = "Section";
    if( createRule7.country.length > 0 && createRule7.content.length == 2 && createRule7.content[0] != "" && createRule7.content[1] != "" ) return false;
    else return true;
  }

  // editRule1( data : any ) {
  //   // this.createRule1 = data;
  // }

}
