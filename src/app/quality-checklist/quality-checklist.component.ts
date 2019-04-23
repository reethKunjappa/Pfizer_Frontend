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
          console.log("E::",e);
          if ( e.fileType == 'Label' ) {
            this.documentId = e._id;
          }
        });  

      //   this.checkListData = [ 
      //     {
      //         "quality_check" : "Is change applicable to approved indication / product in country?",
      //         "status" : false
      //     }, 
      //     {
      //         "quality_check" : "Does updated text align with International and Regional Guidelines and Requirements?",
      //         "status" : false
      //     }, 
      //     {
      //         "quality_check" : "Are there any conflicts in the text and is terminology consistent?",
      //         "status" : false
      //     }, 
      //     {
      //         "quality_check" : "Have any PCO requests been included?",
      //         "status" : false
      //     }, 
      //     {
      //         "quality_check" : "Hidden text  has been removed?",
      //         "status" : false
      //     }, 
      //     {
      //         "quality_check" : "Check consistency across strengths, forms, presentations and other products",
      //         "status" : false
      //     }, 
      //     {
      //         "quality_check" : "Spelling and grammar",
      //         "status" : true
      //     }, 
      //     {
      //         "quality_check" : "Is wording and re-numbering accurate and updates in correct location?",
      //         "status" : true
      //     }, 
      //     {
      //         "quality_check" : "Format, font and layout",
      //         "status" : true
      //     }, 
      //     {
      //         "quality_check" : "Punctuation, font size/type, spacing etc",
      //         "status" : true
      //     }
      // ];
                
        this.projectViewService.getCheckListData({ 'project_id' : 'someID', 'file_id' : '5cb6cd88a364ed2bc0c2d691' }).subscribe(( getCheckListDataResp : any )=> {
          console.log("getCheckListDataResp::",getCheckListDataResp);          
          // Below Lines needs to be changes as the response is array which is not desirable
          this.checkListData = getCheckListDataResp.result[0].checks;
        });

      });


    });
  }

  ngOnInit() {}

}
