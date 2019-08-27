// Dependency Imports
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css']
})

export class SessionTimeoutModalComponent implements OnInit {

  // Property Declarations
  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor(public dialogRef: MatDialogRef<SessionTimeoutModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  continue() {
    this.dialogRef.close( 'reset' );
  }

  logout() {
    this.dialogRef.close('logout');
  }

}
