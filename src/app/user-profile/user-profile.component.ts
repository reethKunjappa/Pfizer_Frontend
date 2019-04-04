// Dependency Imports
import { Component, OnInit, EventEmitter } from '@angular/core';
import { countries } from "country-flags-svg";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';

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
  public countryData: any[] = countries;
  public projectForm: FormGroup;
  public createProjectData: CreateProjectData = new CreateProjectData();
  public countryObj: any = { id: "", name: "" };
  public created: boolean = false;
  public loggedInUser: any = { 'email': 'a@a.aa', 'name': 'Shashank Honrao', 'userId' : 'SHonrao' };
  public documentTableHeaders = [ 'Document Name', 'Document Type', 'Uploaded By', 'Uploaded On'];

  // public createdProjectData : any = {};
  public fileTypes: any[] = [];
  public selectedFileType: string = "";
  public disableUploadAll: boolean = true;

  public uploader: FileUploader = null;
  public hasBaseDropZoneOver: boolean = true;
  // public hasAnotherDropZoneOver:boolean = false;
  public fileObject: any;

  constructor( private projectViewService: ProjectViewService,  private activatedRoute : ActivatedRoute,  private router : Router) {
    this.activatedRoute.paramMap.subscribe(( params : any )=>{
      console.log("Params::",params.get('id'));
      if ( params.get('id') != "" && params.get('id') != undefined && params.get('id') != null ) {
        this.projectViewService.openProject(params.get('id')).subscribe((projectDetails: any) => {
          this.createProjectData = projectDetails;
          this.countryObj = this.createProjectData.country;
          this.created = true;
        });          
      }
    });

    // if (this.projectViewService.projectId != "") {
    //   this.projectViewService.openProject(this.projectViewService.projectId).subscribe((projectDetails: any) => {
    //     this.createProjectData = projectDetails;
    //     this.countryObj = this.createProjectData.country;
    //     this.created = true;
    //   });
    // }

    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });

    this.fileTypes = [
      { value: 'Label' },
      { value: 'Reference' },
      { value: 'Previous Label' },
      { value: 'HA Guidelines' },
      { value: 'Pfizer Checklist' },
      { value: 'Font Format Spec' },
    ];
  }

  ngOnInit() {
    this.intializeFileUploader();
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

  createProject() {
    this.createProjectData.createdBy = this.loggedInUser;
    this.projectViewService.createProject(this.createProjectData).subscribe((createStatus: any) => {
      if ( createStatus != "" && createStatus != undefined ) {
        // this.intializeFileUploader();
        // // this.createdProjectData = createStatus;
        // this.createProjectData = createStatus.result;
        // this.created = true;          
        this.router.navigate(['/create', createStatus.result._id]);
      }
    });
  }

  setCountry(event, item) {
    console.log("SetCountry Obj::", item);
    console.log("event : ", event.isUserInput,event);
    if (event.isUserInput) {
      if (item != "" && item != undefined) {
        // this.createProjectData.country.id = item['iso3'];
        if (this.createProjectData.country.id != item['flag']) {
          this.createProjectData.country.id = item['flag'];
          this.createProjectData.country.name = item['name'];
        }
      }
    }
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
    this.uploader.queue[i].formData = this.uploader.queue[i]['some'];
    this.uploader.queue[i].url = this.projectViewService.endPointAddress + '/api/labelling/upload?projectId=' + this.createProjectData._id + '&uploadedBy=' + this.loggedInUser.name + '&fileType=' + item.fileType;
    console.log("New Url::", this.uploader);
    this.checkUploadAllStatus();
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

}
