// Dependency Imports
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export class ReviewCheckData {
  criteria: string[] = [];
  match: string[] = [];
  constructor() { }
}

@Component({
  selector: 'app-review-label-checks-modal',
  templateUrl: './review-label-checks-modal.component.html',
  styleUrls: ['./review-label-checks-modal.component.css']
})
export class ReviewLabelChecksModalComponent implements OnInit {

  // Property Declarations
  public conflictCriterias: any[] = [
    // { 'value': 'ALL', 'label': 'All', checked : false },
    { 'value': 'Content', 'label': 'Content', checked: true },
    { 'value': 'Font', 'label': 'Font', checked: true },
    { 'value': 'Spell and Grammar', 'label': 'Spell and Grammar', checked: true },
    { 'value': 'Order', 'label': 'Order', checked: true },
    { 'value': 'Regulatory', 'label': 'Regulatory', checked: true },
  ];
  public matchCriterias: any[] = [
    { 'value': 'Semantic', 'label': 'Semantic', checked: true },
    { 'value': 'Exact', 'label': 'Exact', checked: false },
  ];
  public allCriteriaCheck: boolean = true;
  public submitData: ReviewCheckData = new ReviewCheckData();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ReviewLabelChecksModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onAllCriteriaChange(event) {
    if (event.checked) {
      this.conflictCriterias.map(e => e.checked = true);
      this.allCriteriaCheck = true;
    } else {
      this.conflictCriterias.map(e => e.checked = false);
      this.allCriteriaCheck = false;
    }
  }

  onCriteriaChange(event, i) {
    this.conflictCriterias[i].checked = event.checked;
    let obj = this.conflictCriterias.every(this.isAllCriteriaChecked);
    if (obj === true && this.conflictCriterias[0].checked === true) this.allCriteriaCheck = true;
    else if (obj === true && this.conflictCriterias[0].checked === false) this.allCriteriaCheck = false;
    else if (obj === false) this.allCriteriaCheck = false;
    else return;
  }

  isAllCriteriaChecked(el, index, arr) {
    if (index === 0) return true;
    else return (el.checked === arr[index - 1].checked);
  }

  onMatchChange(event: any, index: number) {
    if (event.source.checked) {
      this.matchCriterias.map((e) => {
        if (e.value === event.value) e.checked = true;
        else e.checked = false;
      });
    } else {
      return;
    }
  }

  disableSubmit() {
    if (this.conflictCriterias.some(e => e.checked === true) && this.matchCriterias.some(e => e.checked === true)) {
      return false;
    } else {
      return true;
    }
  }

  modalSubmit() {
    this.conflictCriterias.map((x) => {
      if (x.checked === true) { this.submitData.criteria.push(x.value); }
    });
    this.matchCriterias.map((x) => {
      if (x.checked === true) { this.submitData.match.push(x.value); }
    });
    this.dialogRef.close({ 'status': 'Submit', 'data': this.submitData });
  }

  modalCancel() {
    this.dialogRef.close({ 'status': 'Cancel', 'data': undefined });
  }

}
