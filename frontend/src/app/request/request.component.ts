import { Component, OnInit } from '@angular/core';
import { UserService } from '../servers/user.service';
import { Place } from '../models/place';
import { Agency } from '../models/agency';
import { Router } from '@angular/router';
import { ClientService } from '../servers/client.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.agency = JSON.parse(localStorage.getItem('agency'));

    this.userService.getAllPlaces(this.username).subscribe((placesDB: Place[]) => {
      this.allObjects = placesDB;

      for (let i = 0; i < this.allObjects.length; i++) {
        this.checkedCheckbox.push(false);
        this.datesStart.push("")
        this.datesEnd.push("")
        this.checkedPlaces.push(null);
      }
    })
  }

  allObjects: Place[];

  username: string;
  agency: Agency;

  checkedPlaces: Place[] = [];

  checkedCheckbox: boolean[] = [];

  message: string = "";

  datesStart: string[] = [];
  datesEnd: string[] = [];



  back() {
    localStorage.removeItem('agency');
    this.router.navigate(["client"]);
  }

  addPlace(obj, i) {
    if (this.checkedCheckbox[i] == true) {
      this.checkedPlaces[i] = obj;
    } else {
      this.checkedPlaces[i] = null;
      this.datesStart[i] = "";
      this.datesEnd[i] = "";
    }
  }

  renovate(){
    if(this.checkedPlaces.length == 0){
      this.message = "You didn't select rooms for renovation";
      return;
    }
    for(let i = 0; i< this.checkedPlaces.length; i++){
      if(this.checkedPlaces[i] != null){
        if(this.datesStart[i] == "" || this.datesEnd[i] == ""){
          this.message = "You must choose dates for checked objects";
          return;
        }
        let d1 = new Date(this.datesStart[i]);
        let d2 = new Date(this.datesEnd[i]);
        if(d1 > d2){
          this.message = "End date must be after the start date. Choose again dates for element number: " + (i+1);
          return;
        }
      }
    }
    
    for(let i = 0; i< this.checkedPlaces.length; i++){
      if(this.checkedPlaces[i] != null){
        this.clientService.requestRenovation(this.agency.username, this.username, this.checkedPlaces[i].id, this.datesStart[i], this.datesEnd[i]).subscribe(resp => {
          alert(resp['message']);
        })
      }
    }
  }

  closeMessage(){
    this.message = "";
  }
}
