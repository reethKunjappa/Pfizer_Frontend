// Dependency Imports
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';
import { forEach } from '@angular/router/src/utils/collection';

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
  public loggedInUser: any = { 'email': 'a@a.aa', 'name': 'Shashank Honrao', 'userId': 'SHonrao' };

  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = true;
  // public hasAnotherDropZoneOver:boolean = false;
  public fileObject: any;
  public fileSelectOptionDisable: boolean;

  constructor(public dialogRef: MatDialogRef<UploadDocumentsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private projectViewService: ProjectViewService) {
    console.log("UploadDocumentsModalComponent::", data);
    this.createProjectData = data.projectDetails;

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
    console.log("this.fileTypes : ", this.fileTypes);
  }

  intializeFileUploader() {
    this.uploader = new FileUploader({
      // url : this.projectViewService.endPointAddress + '/api/labelling/upload?projectId='+'5c94e323af9df4039c85518c'+'&uploadedBy='+ this.loggedInUser.name +'&fileType=docx',
      url: "",
      disableMultipart: false,
      // autoUpload : false,
      // removeAfterUpload : true,
      itemAlias: "files",
      method: 'POST'
    });

    // Below line mandatory to show binary in header payloads
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
    // this.uploader.uploadItem = (value : FileItem) => {
    //   console.log("uploadItem::",value);
    // }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (JSON.parse(response).status.code == '0') {
        this.createProjectData.documents.push(JSON.parse(response).result);
      }
    };
  }

  // Ng2-File-Upload Methods
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.checkUploadAllStatus();
  }

  setFileType(item, i) {
    console.log("item::", item);
    console.log("i::", i);
    let count = 0;
    this.uploader.queue[i].formData = this.uploader.queue[i]['some'];
    this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + this.loggedInUser + '&fileType=' + item.fileType;
    console.log("New Url::", this.uploader);
    this.checkUploadAllStatus();

    // this.uploader.queue.forEach((element : any)=>{
    //   if ( element.fileType == 'Label' ) {
    //     count++;
    //   }      
    // });
    // if (count > 0) {

    // }
  }

  disabledSelectOption(array) {

  }

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
    console.log("event in disableFileType: ", event);
    console.log("file in disableFileType: ", file);

    /* this.createProjectData.documents.filter((value) => {
      if (value.fileType == "Label") {
        this.fileTypes.filter((value) => {
          if (value.value == "Label")
            value.disable = true;
        })
      }
      // value.disable = true;
    }) */
    if (!this.fileSelectOptionDisable) {
      this.uploader.queue.map((e) => {
        if (e.hasOwnProperty('fileType')) {
          if (e['fileType'] == "Label") {
            this.fileTypes.filter((value) => {
              if (value.value == "Label")
                value.disable = true;
            });
          } else{
            this.fileTypes.filter((value) => {
              if (value.value == "Label")
                value.disable = false;
            });
          }
        }

      })
    }
    console.log("this.uploader.queue : ", this.uploader.queue);
  }

}
