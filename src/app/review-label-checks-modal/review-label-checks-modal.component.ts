// Dependency Imports
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-review-label-checks-modal',
  templateUrl: './review-label-checks-modal.component.html',
  styleUrls: ['./review-label-checks-modal.component.css']
})
export class ReviewLabelChecksModalComponent implements OnInit {

  // Property Declarations
  public conflictCriterias: any[] = [
    // { 'value': 'ALL', 'label': 'All', checked : false },
    { 'value': 'Content', 'label': 'Content', checked : false },
    { 'value': 'Font', 'label': 'Font', checked : false },
    { 'value': 'Spell and Grammar', 'label': 'Spell and Grammar', checked : false },
    { 'value': 'Order', 'label': 'Order', checked : false },
    { 'value': 'Regulatory', 'label': 'Regulatory', checked : true },
  ];
  public matchCriterias: any[] = [
    { 'value': 'Exact', 'label': 'Exact', checked : false },
    { 'value': 'Schematic', 'label': 'Schematic', checked : false },
  ];
  public reviewFormGroup : FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ReviewLabelChecksModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.reviewFormGroup = this.formBuilder.group({
      criteria: this.formBuilder.array([]),
      match: this.formBuilder.array([])
    });
  }

  ngOnInit() {}

  onCriteriaChange(event) {
    const criteria = <FormArray>this.reviewFormGroup.get('criteria') as FormArray;
    if(event.checked) {
      criteria.push(new FormControl(event.source.value));
    } else {
      const i = criteria.controls.findIndex(x => x.value === event.source.value);
      criteria.removeAt(i);
    }
  }

  onMatchChange(event : any, index : number) {
    const match = <FormArray>this.reviewFormGroup.get('match') as FormArray;
    if(event.source.checked) {
      if( event.source.value === 'Schematic' ) {
        const i = match.controls.findIndex( x => x.value === 'Exact' );
        match.removeAt(i);
        match.push(new FormControl(event.source.value));
        this.matchCriterias.map(e => e.checked = false);
        this.matchCriterias[index].checked = true;        
      }else if( event.source.value === 'Exact' ) {
        const i = match.controls.findIndex( x => x.value === 'Schematic' );
        match.removeAt(i);
        match.push(new FormControl(event.source.value));
        this.matchCriterias.map(e => e.checked = false);
        this.matchCriterias[index].checked = true;
      }else {
        match.push(new FormControl(event.source.value));
      }
    } else {
      const i = match.controls.findIndex(x => x.value === event.source.value);
      match.removeAt(i);
    }
  }

  modalSubmit() {
    this.dialogRef.close({ 'status' : 'Submit', 'data' : this.reviewFormGroup.value });
  }

  modalCancel() {
    this.dialogRef.close({ 'status' : 'Cancel', 'data' : undefined });
  }

}
