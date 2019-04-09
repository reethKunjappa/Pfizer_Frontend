// Dependency Imports
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatusComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  modalSubmit() {
    this.dialogRef.close('Submit');
  }

  modalCancel() {
    this.dialogRef.close('Cancel');
  }

}
