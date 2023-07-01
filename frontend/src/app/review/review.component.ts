import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RenovationRequest } from '../models/renRequest';
import { myComment } from '../models/comment';
import { UserService } from '../servers/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.request = JSON.parse(localStorage.getItem('review'));
    this.username = localStorage.getItem('username');
    this.message = "";
    this.comment = "";
    this.rating = 0;
    this.clientComment = null;


    this.userService.getClientComment(this.username, this.request.agency).subscribe((comm: myComment) => {
      this.clientComment = comm;
    })
  }

  request: RenovationRequest;
  comment: string;
  rating: number;

  message: string;

  username: string;

  clientComment: myComment;

  back() {
    localStorage.removeItem('review');
    this.router.navigate(["client"]);
  }

  submit() {
    if (!this.clientComment) {
      if (this.rating == 0 || this.comment == "") {
        this.message = "You must fill both fields in order to leave a comment";
        return;
      } else {
        this.userService.addComment(this.username, this.request.agency, this.comment, this.rating).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      }
    } else if (this.clientComment) {
      if (this.rating == 0 && this.comment == "") {
        this.message = "You must fill at least one field in order to update a comment";
        return;
      } else {
        //update
        if(this.comment == ""){
          this.comment = this.clientComment.comment;
        }
        if(this.rating == 0){
          this.rating = this.clientComment.rating;
        }
        this.userService.updateComment(this.username, this.request.agency, this.comment, this.rating).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      }
    }
  }

  closeMessage(){
    this.message = "";
  }

  delete(){
    this.userService.deleteComment(this.clientComment.agency, this.clientComment.client).subscribe(resp => {
      console.log(resp['message']);
      this.ngOnInit();
    })
  }

}
