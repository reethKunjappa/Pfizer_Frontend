// Dependency Imports
import { Component, OnInit, EventEmitter } from '@angular/core';
import { countries } from "country-flags-svg";
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

// Model Imports
import { CreateProjectData } from '../models/create-project.model';

// Services Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  // Property Declarations
  private countryData : any[] = countries;
  public projectForm : FormGroup;
  public createProjectData : CreateProjectData = new CreateProjectData();
  public countryObj : any;
  private loggedInUser : any = { 'email' : 'a@a.aa', 'name' : 'Shashank Honrao' };
  public createdProjectData : any = {};
  public fileTypes : any[] = [];
  public selectedFileType : string = "";
  public disableUploadAll : boolean = true;

  public uploader : FileUploader = null;
  public hasBaseDropZoneOver:boolean = true;
  // public hasAnotherDropZoneOver:boolean = false;
  fileObject: any;

  constructor(private projectViewService : ProjectViewService) { 
    this.projectForm = new FormGroup({
      projectName: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
    });
    
    this.fileTypes = [
      {value: 'Core'},
      {value: 'Reference'},
      {value: 'Reference-1'},
    ];  
  }

  ngOnInit() {
    
    this.uploader = new FileUploader({
      // url: "http://13.233.129.104:3000/protocol/" + '5c90978f3e50513b5c8d236c',
      url : 'http://localhost:5555' + '/api/labelling/upload?projectId='+'5c909e20ca649e40b4ea8c9d'+'&uploadedBy='+'Nagesh Jha'+'&fileType=docx',
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

  }


  createProject(){
    this.createProjectData.createdBy = this.loggedInUser;
    this.projectViewService.createProject(this.createProjectData).subscribe((data:any)=>{
      console.log("Component Response::",data);
      this.createdProjectData = data;
    });        
  }

  setCountry(item){
    if ( item != "" && item != undefined ) {
      this.createProjectData.country.id = item['iso3'];
      this.createProjectData.country.name = item['name'];
    }
  }

  // Ng2-File-Upload Methods
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e; 
  }
 
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.checkUploadAllStatus();
  }

  setFileType(item,i){
    console.log("setFileType::", item,i);
    // this.uploader.queue[i]['fileType'] = this.selectedFileType;
    this.uploader.queue[i].formData = this.uploader.queue[i]['some'];    
    this.checkUploadAllStatus();
  }

  // Toggling Disable Status of UploadAll button
  checkUploadAllStatus() {
    let count = 0;
    this.uploader.queue.map((e)=>{
      if ( e.hasOwnProperty('fileType') ) {
        count++;
      }
    });

    if ( count == this.uploader.queue.length ) {
      this.disableUploadAll = false;
    }else {
      this.disableUploadAll = true;
    }
  }

}
