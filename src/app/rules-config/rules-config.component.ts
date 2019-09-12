// Dependency Imports
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatFormFieldControl, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Model Imports
import { RulesConfigurationsData } from '../models/rules-configurations.model';

// Service Imports
import { CountryCodeService } from '../services/country-code.service';
import { LoggedInUserService } from 'app/services/logged-in-user.service';
import { ProjectViewService } from '../services/project-view.service';

// Component Imports
import { UploadDocumentsModalComponent } from '../upload-documents-modal/upload-documents-modal.component';

@Component({
  selector: 'app-rules-config',
  templateUrl: './rules-config.component.html',
  styleUrls: ['./rules-config.component.css']
})
export class RulesConfigComponent implements OnInit {

  // Property Declarations
  public rulesConfigForm: FormGroup;
  public rulesConfig: RulesConfigurationsData = new RulesConfigurationsData();
  // public rulesConfigData : any;
  public uploadConfigDocDialog: any;
  public countryData: any[] = [];
  public ruleNames: any[] = [
    { name: 'Trademark Check' },
    { name: 'INN Name Check' },
    { name: 'Phrase Replacement' },
    { name: 'Formatting Entity' },
    { name: 'Formatting Phrase' },
    { name: 'EU Numbering' },
    { name: 'Content Check' },
    { name: 'Hyperlink Check' },
    { name: 'Spell Check' },
    { name: 'Grammar Check' },
    { name: 'Proprietary Name' },
    { name: 'Local Phrase Reference' },
    { name: 'Multiple Dosages Check' },
    { name: 'Abbreviation Check' },
    { name: 'Contradiction Check' }
  ];
  public sectionSelectionTypes: any[] = [
    { name: 'Include' },
    { name: 'Exclude' },
  ];
  public countryGroup: any[] = [
    { name: 'Group 1' },
    { name: 'Group 2' },
    { name: 'Group 3' },
    { name: 'Group 4' },
  ];
  public conflictCriterias: any[] = [
    // { 'value': 'ALL', 'label': 'All' },
    { 'value': 'Content', 'label': 'Content' },
    { 'value': 'Font', 'label': 'Font' },
    { 'value': 'Spell and Grammar', 'label': 'Spell and Grammar' },
    { 'value': 'Order', 'label': 'Order' },
    // { 'value': 'Configured rules', 'label': 'Configured Rules' },
    { 'value': 'Regulatory', 'label': 'Regulatory' },
  ];
  public formattingType: any[] = [
    { name: 'Entity' },
    { name: 'Phrase' },
  ];
  public formattingDataList: any[] = [
    { name: 'Drug Name' },
    { name: 'Address' },
    { name: 'Date' },
  ];
  public shouldBeInValue: any[] = [
    { name: 'Bold', disable: false },
    { name: 'Italic', disable: false },
    { name: 'Lower', disable: false },
    { name: 'Upper', disable: false },
  ];
  public documentTableHeaders = [
    { 'headerName': 'Document Name', 'class': '', 'width': '35%' },
    { 'headerName': 'Document Type', 'class': '', 'width': '15%' },
    { 'headerName': 'Uploaded By', 'class': '', 'width': '20%' },
    { 'headerName': 'Uploaded On', 'class': '', 'width': '12%' },
    { 'headerName': 'Actions', 'class': '', 'width': '15%' }
  ];
  public languages: any[] = [
    { name: 'English (UK)' },
    { name: 'English (US)' },
  ];
  public addTagText: any;
  public disableCreate: boolean = false;
  public editMode: boolean = false;

  constructor(private countryCodeService: CountryCodeService, private loggedInUserService: LoggedInUserService, private projectViewService: ProjectViewService, public dialog: MatDialog, public dialogRef: MatDialogRef<RulesConfigComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && this.data != {} && this.data.editMode) {
      this.rulesConfig = this.data.ruleData;
      this.editMode = this.data.editMode;
      if (this.rulesConfig['_id'] != "" && this.rulesConfig['documents'].length < 1) this.disableCreate = true;
    } else {
      this.rulesConfig = new RulesConfigurationsData();
    }
    this.countryData = this.countryCodeService.getCountryCodeData();
    this.rulesConfigForm = new FormGroup({
      ruleNameControl: new FormControl('', Validators.required),
      ruleDescriptionControl: new FormControl('', Validators.required),
      sectionSelectionTypesControl: new FormControl('', Validators.required),
      conflictTypeControl: new FormControl('', Validators.required),
      commentsControl: new FormControl('', Validators.required),
      exceptionsControl: new FormControl('', Validators.required),
    });
    this.rulesConfig.rulesApplication.sections.condition = this.sectionSelectionTypes[0].name;
  }

  ngOnInit() { }

  objCompareFn(c1: Object, c2: Object): boolean {
    return c1 && c2 ? c1['name'] === c2['name'] : c1 === c2;
  }

  stringCompareFn(c1: string, c2: string): boolean {
    return c1 && c2 ? c1 === c2 : c1['name'] === c2['name'];
  }

  ruleName(event: any) {
    let obj1 = {};
    let obj2 = {};
    this.rulesConfig.additionalInformation.additionalInfo = false;
    this.rulesConfig.additionalInformation.addInfo = [];
    if (event === 'Hyperlink Check' || event === 'Abbreviation Check' || event === 'Contradiction Check') {
      this.rulesConfig.rulesApplication.allSections = true;
      this.sectionAllCheck({ checked: this.rulesConfig.rulesApplication.allSections });
    } else if (event === 'Spell Check' || event === 'Grammar Check') {
      this.rulesConfig.rulesApplication.allSections = true;
      this.sectionAllCheck({ checked: this.rulesConfig.rulesApplication.allSections });
      this.rulesConfig.additionalInformation.additionalInfo = true;
      obj1 = { "label": "Language", "value": [] };
      this.rulesConfig.additionalInformation.addInfo.push(obj1);
    } else if (event === 'Phrase Replacement') {
      obj1 = { "label": "Do not use", "value": [] };
      this.rulesConfig.additionalInformation.addInfo.push(obj1);
      obj2 = { "label": "Replace with", "value": [] };
      this.rulesConfig.additionalInformation.addInfo.push(obj2);
      this.rulesConfig.additionalInformation.additionalInfo = true;
    } else if (event === 'Formatting Entity' || event === 'Formatting Phrase') {
      obj1 = { "label": "Value", "value": [] };
      this.rulesConfig.additionalInformation.addInfo.push(obj1);
      obj2 = { "label": "Should be in", "value": [] };
      this.rulesConfig.additionalInformation.addInfo.push(obj2);
      this.rulesConfig.additionalInformation.additionalInfo = true;
    } else if (event === 'Local Phrase Reference') {
      obj1 = { "label": "Local Phrase", "value": [] };
      this.rulesConfig.additionalInformation.addInfo.push(obj1);
      this.rulesConfig.additionalInformation.additionalInfo = true;
    } else if (event === 'Multiple Dosages Check') {
      this.rulesConfig.additionalInformation.additionalInfo = false;
    } else {
      return;
    }
  }

  conditionalDisable(event: any) {
    let value = [];
    value = event.filter((x) => { return x === 'Lower' || x === 'Upper' });
    if (value[0] === 'Lower') {
      this.shouldBeInValue.filter((e) => {
        if (e.name === 'Upper') e.disable = true;
        else e.disable = false;
      });
    } else if (value[0] === 'Upper') {
      this.shouldBeInValue.filter((e) => {
        if (e.name === 'Lower') e.disable = true;
        else e.disable = false;
      });
    } else {
      this.shouldBeInValue.filter((e) => {
        e.disable = false;
      });
    }
  }

  globalCheck(event: any) {
    if (event.checked) this.rulesConfig.rulesApplication.country = [];
  }

  sectionAllCheck(event: any) {
    if (event.checked) {
      this.rulesConfig.rulesApplication.sections.value = [];
      this.rulesConfig.rulesApplication.sections.condition = this.sectionSelectionTypes[0].name;
    }
  }

  mandatoryCheck() {
    if (this.rulesConfig.rulesSetup.ruleName && this.rulesConfig.action.conflictType) {
      if (this.rulesConfig.rulesApplication.allSections && this.rulesConfig.rulesApplication.sections.condition) {
        return false;
      } else if (this.rulesConfig.rulesApplication.sections.condition && this.rulesConfig.rulesApplication.sections.value[0]) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  createRulesConfig() {
    this.rulesConfig.createdBy = this.loggedInUserService.getNativeWindowRef();
    this.projectViewService.createRulesConfig(this.rulesConfig).subscribe((createRulesConfigResp: any) => {
      if (createRulesConfigResp.result != undefined && createRulesConfigResp.result != "") {
        this.rulesConfig = createRulesConfigResp.result;
        this.disableCreate = true;
        if (this.rulesConfig['_id'] != '') this.editMode = true;
      }
    });
  }

  uploadConfigDoc() {
    this.uploadConfigDocDialog = this.dialog.open(UploadDocumentsModalComponent, {
      disableClose: true, //false,
      width: '1000px',
      data: { section: 'configuration', configDetails: this.rulesConfig, allowMultiple: false, documentId: this.rulesConfig['_id'], fileType: 'Reference' }
    });

    this.uploadConfigDocDialog.afterClosed().subscribe((result) => {
      if (result.uploadComplete === true) {
        if (this.rulesConfig['_id'] != "" && this.rulesConfig['documents'].length < 1) this.disableCreate = true;
        else this.disableCreate = false;
      }
    });
  }

  updateRulesConfig() {
    this.rulesConfig['updatedBy'] = this.loggedInUserService.getNativeWindowRef();
    this.projectViewService.updateRulesConfig(this.rulesConfig).subscribe((updateRulesConfigResp: any) => {
      if (updateRulesConfigResp.result != undefined && updateRulesConfigResp.result != "") {
        this.rulesConfig = updateRulesConfigResp.result;
        if (this.rulesConfig['_id'] != '') this.editMode = true;
        if (this.rulesConfig['_id'] != "" && this.rulesConfig['documents'].length < 1) this.disableCreate = true;
        else this.disableCreate = false;
      }
    });
  }

  close() {
    this.dialogRef.close('Submit');
  }

}
