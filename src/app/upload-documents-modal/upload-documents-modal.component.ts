// Dependency Imports
import { Component, OnInit, Inject, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

@Component({
  selector: 'app-upload-documents-modal',
  templateUrl: './upload-documents-modal.component.html',
  styleUrls: ['./upload-documents-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class UploadDocumentsModalComponent implements OnInit {

  // Property Declarations
  public createProjectData: any = {};
  public fileTypes: any[] = [];
  public selectedFileType: string = "";
  public disableUploadAll: boolean = true;

  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = true;
  // public hasAnotherDropZoneOver:boolean = false;
  public fileObject: any;
  public fileSelectOptionDisable: boolean = false;
  public allowMultiple: boolean = true;
  // public multipleAllow : boolean = false;
  public re_upload_documentId: string;
  public disableDropDown: boolean = false;
  public reUploadFileType: string;

  public disableLabelText: boolean = false;
  public selectedFileTypeList = [];
  public uploadingComplete: boolean = false;
  public section: string;
  public configurationData: any = {};

  constructor(public dialogRef: MatDialogRef<UploadDocumentsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private projectViewService: ProjectViewService, private loggedInUserService: LoggedInUserService, public snackBar: MatSnackBar) {
    this.section = data.section;
    if (this.section === 'project') {
      this.createProjectData = data.projectDetails;
    } else if (this.section === 'configuration') {
      this.configurationData = data.configDetails;
    } else { return; }
    this.allowMultiple = data.allowMultiple;
    this.re_upload_documentId = data.documentId ? data.documentId : '';
    this.reUploadFileType = data.fileType ? data.fileType : '';

    this.fileTypes = [
      { value: 'Label', disable: false },
      { value: 'Reference', disable: false },
      { value: 'Previous Label', disable: false },
      { value: 'HA Guidelines', disable: false },
      { value: 'Pfizer Checklist', disable: false },
      { value: 'Font Format Spec', disable: false },
    ];
    this.fileTypeOptions();
  }

  ngOnInit() {
    this.intializeFileUploader();
  }

  /* Below function is to check whether documents array from respective object
     is already having "Label" document. If Yes then disable the "Label" option
     from FileTypes Dropdown.
  */
  fileTypeOptions() {
    if (this.section === 'project') {
      for (var i = 0; i < this.createProjectData.documents.length; i++) {
        if (this.createProjectData.documents[i].fileType == "Label") {
          this.fileTypes.filter((value) => {
            if (value.value == "Label") {
              this.fileSelectOptionDisable = true;
            }
          })
        }
      }
    } else if (this.section === 'configuration') {
      for (var i = 0; i < this.configurationData.documents.length; i++) {
        if (this.configurationData.documents[i].fileType == "Label") {
          this.fileTypes.filter((value) => {
            if (value.value == "Label") {
              this.fileSelectOptionDisable = true;
            }
          })
        }
      }
    } else { return; }
  }

  intializeFileUploader() {
    this.uploader = new FileUploader({
      url: "",
      disableMultipart: false,
      // autoUpload : false,
      // removeAfterUpload : true,
      itemAlias: 'files',
      method: 'POST',
      // queueLimit: this.allowMultiple ? 50 : 1,
      queueLimit: this.setQueueLimit(this.allowMultiple),
    });

    // Below line mandatory to show binary in header payloads
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      file['fileType'] = '';

      if (this.section === 'project') {
        if (!this.allowMultiple) {
          file['fileType'] = this.reUploadFileType;
          file['url'] = this.projectViewService.endPointAddress + '/api/labelling/re-upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + this.reUploadFileType + '&documentId=' + this.re_upload_documentId;
          this.disableDropDown = true;
        } else {
          file['fileType'] = this.reUploadFileType;
          file['url'] = this.projectViewService.endPointAddress + '/api/labelling/upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + this.reUploadFileType + '&documentId=' + this.re_upload_documentId;
          this.disableDropDown = false; //true;
        }
      } else if (this.section === 'configuration') {
        if (!this.allowMultiple) {
          file['fileType'] = this.reUploadFileType;
          file['url'] = this.projectViewService.endPointAddress + '/api/labelling/configFileUpload?projectId=' + this.configurationData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + this.reUploadFileType;
          this.disableDropDown = true;
        } else {
          // For Re-Upload of Configuration Documents - Yet to be implemented
          file['fileType'] = this.reUploadFileType;
          file['url'] = this.projectViewService.endPointAddress + '/api/labelling/configFileUpload?projectId=' + this.configurationData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + this.reUploadFileType;
          this.disableDropDown = false;
        }
      } else {
        return;
      }
    };

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => { }
    // this.uploader.uploadItem = (value : FileItem) => { }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200 && response != "" && response != undefined && response != {} && response != null) {
        if (JSON.parse(response).status.code == 0) {
          this.uploadStatusNotification(JSON.parse(response).status.message, ['alert', 'alert-success']);
          if (this.section === 'project') {
            if (this.allowMultiple) {
              this.createProjectData.documents.push(JSON.parse(response).result);
            } else {
              this.createProjectData.documents.map((e) => {
                if (e._id == this.re_upload_documentId) {
                  let index = this.createProjectData.documents.indexOf(e);
                  this.createProjectData.documents.splice(index, 1, JSON.parse(response).result);
                }
              });
            }
          } else if (this.section === 'configuration') {
            this.configurationData.documents.push(JSON.parse(response).result);
          } else { return; }
        } else {
          this.uploadStatusNotification(JSON.parse(response).status.message, ['alert', 'alert-danger']);
        }
      } else {
        this.uploadStatusNotification('Failed to connect & upload the document.', ['alert', 'alert-danger']);
      }
    };

    // Function triggered when all files in queue gets uploaded successfully.
    this.uploader.onCompleteAll = () => { this.uploadingComplete = true; };
  }

  // Function for setting file uploader queue size to 1 while re-upload and infinite while upload  
  setQueueLimit(allowMultiple) {
    if (!allowMultiple) {
      return 1;
    }
  }

  uploadStatusNotification(message: any, additionClasses: any) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.duration = 1000;
    config.panelClass = additionClasses;
    let action: boolean = false;
    this.snackBar.open(message, action ? 'Close' : undefined, config);
  }

  // Ng2-File-Upload Methods
  public fileOver(event) { }

  public fileLeave(event) { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.checkUploadAllStatus();
  }

  setFileType(item, i) {
    let count = 0;
    this.uploader.queue[i].formData = this.uploader.queue[i]['some'];
    if (this.section === 'project') {
      if (!this.allowMultiple) {
        this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/re-upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + item.fileType + '&documentId=' + this.re_upload_documentId;
      } else {
        this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + item.fileType;
      }
    } else if (this.section === 'configuration') {
      if (!this.allowMultiple) {
        this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/configFileUpload?projectId=' + this.configurationData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + item.fileType;
      } else {
        this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/configFileUpload?projectId=' + this.configurationData._id + '&uploadedBy=' + JSON.stringify(this.loggedInUserService.getNativeWindowRef()) + '&fileType=' + item.fileType;
      }
    } else {
      return;
    }

    this.checkUploadAllStatus();
    if (item.fileType === 'Label' && item.file.name.split('.').pop() != 'docx') {
      this.uploader.queue = this.uploader.queue.splice(i, -1);
      alert('File type is not docx, please select docx file');
    }
  }

  disabledSelectOption(array) { }

  // Toggling Disable Status of UploadAll button
  checkUploadAllStatus() {
    let count = 0;
    this.uploader.queue.map((e) => {
      if (this.checkEmptyNullUndefined(e['fileType'])) {
        count++;
      }
    });

    if (count == this.uploader.queue.length) {
      this.disableUploadAll = false;
    } else {
      this.disableUploadAll = true;
    }
  }

  // Function to disable "Label" fileType from dropdown if it is selected even once.
  disableFileType(event, file) {
    if (!this.fileSelectOptionDisable) {
      this.selectedFileTypeList = [];

      this.uploader.queue.map((e) => {
        if (this.checkEmptyNullUndefined(e['fileType']) && !this.selectedFileTypeList.includes(e['fileType'])) {
          this.selectedFileTypeList.push(e['fileType'])
        }
      })
      if (this.selectedFileTypeList.includes('Label')) {
        this.disableLabelText = true;
      } else {
        this.disableLabelText = false;
      }
    }
  }

  checkEmptyNullUndefined(data) {
    if (data != '' && data != null && data != undefined) { return true; }
    else { return false; }
  }

  closeUploadModal() {
    this.dialogRef.close({ 'action': 'Cancel', 'uploadComplete': this.uploadingComplete });
  }

}
