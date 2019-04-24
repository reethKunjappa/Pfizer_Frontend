// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor( private projectViewService : ProjectViewService, private activatedRoute : ActivatedRoute ) { 
    this.activatedRoute.paramMap.subscribe(( params : any )=> {
      this.projectId = params.get('id');
      this.projectViewService.openProject(this.projectId).subscribe((projectDetails: any) => {
        this.projectDetails = projectDetails;
        this.projectDetails.documents.map((e)=>{
          if ( e.fileType == 'Label' ) { this.documentId = e._id; }
        });  
                
        this.projectViewService.getCheckListData({ 'project_id' : this.projectId, 'file_id' : this.documentId }).subscribe(( getCheckListDataResp : any )=> {
          this.checkListData = getCheckListDataResp.result[0].checks;
        });

      });


    });
  }

  ngOnInit() {}

}
