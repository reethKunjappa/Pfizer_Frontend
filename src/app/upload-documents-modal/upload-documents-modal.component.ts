// Dependency Imports
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-upload-documents-modal',
  templateUrl: './upload-documents-modal.component.html',
  styleUrls: ['./upload-documents-modal.component.css']
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
  public fileSelectOptionDisable: boolean;
  public allowMultiple: boolean = true;
  // public multipleAllow : boolean = false;
  public re_upload_documentId: string;
  public disableDropDown: boolean = false;
  public reUploadFileType: string;

  public disableLabelText: boolean = false;

  constructor(public dialogRef: MatDialogRef<UploadDocumentsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private projectViewService: ProjectViewService) {
    this.createProjectData = data.projectDetails;
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

  fileTypeOptions() {
    for (var i = 0; i < this.createProjectData.documents.length; i++) {
      if (this.createProjectData.documents[i].fileType == "Label") {
        this.fileTypes.filter((value) => {
          if (value.value == "Label")
            value.disable = true;
          this.fileSelectOptionDisable = true;
        })
      }
    }
  }

  intializeFileUploader() {
    this.uploader = new FileUploader({
      url: "",
      disableMultipart: false,
      // autoUpload : false,
      // removeAfterUpload : true,
      itemAlias: "files",
      method: 'POST',
      queueLimit: this.allowMultiple ? 5 : 1,
    });
    // Below line mandatory to show binary in header payloads
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      if (!this.allowMultiple) {
        file['fileType'] = this.reUploadFileType;
        file['url'] = this.projectViewService.endPointAddress + '/api/labelling/re-upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.projectViewService.loggedInUser) + '&fileType=' + this.reUploadFileType + '&documentId=' + this.re_upload_documentId;
        this.disableDropDown = true;
      }
    };

    // this.uploader.uploadItem = (value : FileItem) => { }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (JSON.parse(response).status.code == 0) {
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
      }
    };
  }

  // Ng2-File-Upload Methods
  public fileOver(event) {}

  public fileLeave(event) {}

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
    if (!this.allowMultiple) {
      this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/re-upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.projectViewService.loggedInUser) + '&fileType=' + item.fileType + '&documentId=' + this.re_upload_documentId;
    } else {
      this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + JSON.stringify(this.projectViewService.loggedInUser) + '&fileType=' + item.fileType;
    }
    this.checkUploadAllStatus();
  }

  disabledSelectOption(array) { }

  // Toggling Disable Status of UploadAll button
  checkUploadAllStatus() {
    let count = 0;
    this.uploader.queue.map((e) => {
      if (e.hasOwnProperty('fileType')) {
        count++;
      }
    });

    if (count == this.uploader.queue.length) {
      this.disableUploadAll = false;
    } else {
      this.disableUploadAll = true;
    }
  }

  disableFileType(event, file) {
    if (!this.fileSelectOptionDisable) {
      this.uploader.queue.map((e) => {
        if (e.hasOwnProperty('fileType')) {
          if (e['fileType'] == "Label") {
            this.fileTypes.filter((value) => {
              if (value.value == "Label")
                value.disable = true;
                this.disableLabelText = true;
            });
          } else {
            this.fileTypes.filter((value) => {
              if (value.value == "Label")
                value.disable = false;
            });
          }
        }
      })
    }
  }

}
