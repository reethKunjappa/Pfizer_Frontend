// Dependency Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Service Imports
import { ProjectViewService } from '../services/project-view.service';
import { LoggedInUserService } from '../services/logged-in-user.service';

// Model Imports
import { ProjectCommentsData } from '../models/project-comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {

  // Property Declarations
  public projectId : string;
  public projectDetails = {
    'projectName': ''
  };

  public commentsList : any[] = [];
  public commentsListStore : any[] = []; 
  public selectedIndex : number;
  public createProjectComment : ProjectCommentsData = new ProjectCommentsData();
  public allExpandState : boolean = false;
  // public panelOpenState : boolean = false;

  constructor( private activatedRoute : ActivatedRoute, private projectViewService : ProjectViewService, private loggedInUserService : LoggedInUserService ) { 
    this.activatedRoute.paramMap.subscribe(( params : any )=>{
      this.projectId = params.get('id');
      this.getAllComments();
      this.projectViewService.openProject(this.projectId).subscribe((projectDetails: any) => {
        this.projectDetails = projectDetails;              
      });
    });
  }

  ngOnInit() {}

  /* REST CALL FUNCTIONS */
  getAllComments() {
    this.projectViewService.getAllComments({ 'projectId' : this.projectId }).subscribe(( allCommentsResponse : any ) => {
      if ( allCommentsResponse != undefined && allCommentsResponse != "" ) {
        this.commentsList = allCommentsResponse.result;
        // this.commentsListStore = Object.assign([], this.commentsList);
        this.commentsListStore = allCommentsResponse.result.map((item)=>{
          return Object.assign({}, item)
        });
      }
    });
  }

  // Create a Comment API Call
  addComment() {
    this.createProjectComment.commentedBy = this.loggedInUserService.getNativeWindowRef();
    this.createProjectComment.projectId = this.projectId;
    this.projectViewService.createComments(this.createProjectComment).subscribe(( addCommentResponse : any )=>{
      if ( addCommentResponse != undefined && addCommentResponse != "" ) {
        this.commentsList.push(addCommentResponse.result);
        this.commentsListStore.push(addCommentResponse.result);
        this.createProjectComment = new ProjectCommentsData();
        this.allExpandState = true;
      }
    });    
  }

  // Cancelling the new comment
  cancelComment() {
    this.createProjectComment.commentedText = "";
  }

  // Edit Toogle functionality
  editComment( comment, index ) {    
    this.selectedIndex = index;
  }

  // Update a comment API call
  saveComment( comment, index ) {
    comment.commentedBy = this.loggedInUserService.getNativeWindowRef();
    this.projectViewService.updateComment(comment).subscribe(( updateCommentResponse : any ) => {
      if ( updateCommentResponse.status.code === 0 ) {
        this.commentsList[index] = updateCommentResponse.result;
        // this.commentsListStore[index] = updateCommentResponse.result;
        this.selectedIndex = -1;
      }
    });
  }

  // Cancel Updating a comment
  cancelUpdateComment(comment, index) {
    this.commentsList[index] = this.commentsListStore[index];
    this.selectedIndex = -1;    
  }

  // Delete a comment 
  deleteComment(comment, index) {
    this.projectViewService.deleteProjectComment({ 'commentId': comment._id, 'projectId': comment.projectId }).subscribe((deleteProjectCommentResp: any) => {
      if (deleteProjectCommentResp.status.code === 0) {
        this.commentsList.splice(index, 1);
      } else {
        return;
      }
    });
  }

}
