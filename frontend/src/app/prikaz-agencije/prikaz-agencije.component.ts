import { Component, OnInit } from '@angular/core';
import { Agency } from '../models/agency';
import { Router } from '@angular/router';
import { myComment } from '../models/comment';
import { UserService } from '../servers/user.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-prikaz-agencije',
  templateUrl: './prikaz-agencije.component.html',
  styleUrls: ['./prikaz-agencije.component.css']
})
export class PrikazAgencijeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.allComments = [];
    this.clientsOfComments = [];

    this.agency = JSON.parse(localStorage.getItem('agency'));
    this.loginUser = JSON.parse(localStorage.getItem('loginUser'));

    this.userService.getComments(this.agency.username).subscribe((comments: myComment[]) => {
      this.allComments = comments;

      for(let c of this.allComments){
        this.userService.getClient(c.client).subscribe((client: Client)=> {
          this.clientsOfComments.push(client);
        })
      }
      
    })
  }

  agency: Agency;
  loginUser: number;

  allComments: myComment[];
  clientsOfComments: Client[];

  backHome(){
    sessionStorage.clear();
    this.router.navigate([""]);
  }

  backClient(){
    localStorage.removeItem('agency');
    localStorage.removeItem('loginUser');
    this.router.navigate(["client"]);
  }
}
