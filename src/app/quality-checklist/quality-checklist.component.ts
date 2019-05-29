// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultCheckList } from './default-checklist';

// Services Imports
import { ProjectViewService } from '../services/project-view.service';

@Component({
  selector: 'app-quality-checklist',
  templateUrl: './quality-checklist.component.html',
  styleUrls: ['./quality-checklist.component.css']
})

export class QualityChecklistComponent implements OnInit {

  // Property Declarations
  public projectId : string;  
  public projectDetails : any;
  public documentTableHeaders : any[] = [
    { 'headerName' : 'Check', 'width' : '75%', 'class' : '' },
    { 'headerName' : 'QC Done', 'width' : '25%', 'class' : 'text-left' },
  ];
  public checkListData : any[] = [];
  public documentId : any;
  public defaultCheckList: any[] =  [];

  constructor( private projectViewService : ProjectViewService, private activatedRoute : ActivatedRoute ) { 
    this.defaultCheckList =  DefaultCheckList;
    this.activatedRoute.paramMap.subscribe(( params : any )=> {
      this.projectId = params.get('id');
      this.projectViewService.openProject(this.projectId).subscribe((projectDetails: any) => {
        this.projectDetails = projectDetails;
        this.projectDetails.documents.map((e)=>{
          if ( e.fileType == 'Label' ) { this.documentId = e._id; }
        });  
                
        this.projectViewService.getCheckListData({ 'project_id' : this.projectId, 'file_id' : this.documentId, 'user' : this.projectViewService.loggedInUser }).subscribe(( getCheckListDataResp : any )=> {
          this.checkListDataCheck(getCheckListDataResp.result[0].checks);
          //this.checkListData = getCheckListDataResp.result[0].checks;
        });

      });


    });
  }

  ngOnInit() {}

  checkListDataCheck(response) {
    this.defaultCheckList.map((e) => {
      response.map((r) => {
        if (r.quality_check === e.quality_check) {
          e.status = r.status;
        }
      })
    })
    this.checkListData = this.defaultCheckList;
  }

}
