import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public projectDetails = {};

  public commentObject = {
    'commentedBy': { 'name': 'XYZ' },
    'commentedOn': new Date().toString(),
    'comment': '',
    'id': '1'
  }

  public commentsList = [];

  constructor() { }

  ngOnInit() {
    this.getAllComments();
  }

  resetCommentObject() {
    this.commentObject = {
      'commentedBy': { 'name': 'XYZ' },
      'commentedOn': new Date().toString(),
      'comment': '',
      'id': '1'
    }
  }

  /* REST CALL FUNCTIONS */
  getAllComments() {

  }

  addComment() {

    this.commentsList.push(this.commentObject);
    this.resetCommentObject();
  }

  cancelComment() {
    this.resetCommentObject();
  }

  editComment(comment) {
    this.commentObject = comment;
  }

  removeComment(comment) {

  }
}
