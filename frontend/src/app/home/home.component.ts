import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { UserService } from '../servers/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.searchedAgencies = [];
    this.allAgencies = [];
    this.sortColumn = "";
    this.sortDirection = 1;
    
    this.userService.getAllAgencies().subscribe((agenciesDB: Agency[]) => {
      this.allAgencies = agenciesDB;
      
    })
  }

  allAgencies: Agency[];

  searchedAgencies: Agency[] = [];

  searchParam : string;
  sortColumn: string = "";
  sortDirection: number = 1;

  home(){
    
    this.router.navigate([""]);
  }

  register(){
    this.router.navigate(["registration"]);
  }

  login(){
    this.router.navigate(["loginUser"]);
  }


  search(){
    this.searchedAgencies = [];
    for(let agency of this.allAgencies){
      if(agency.name.toLowerCase().includes(this.searchParam.toLowerCase()) || agency.address.toLowerCase().includes(this.searchParam.toLowerCase())){
        this.searchedAgencies.push(agency);
      }
    }

  }

  clearSearch(){
    this.searchedAgencies = [];
    this.ngOnInit();
  }

  sortData(column: string) {
    // Toggle sort direction if the same column is clicked again
    if (this.sortColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }
  
    // Perform sorting based on the selected column and direction
    if(this.searchedAgencies.length == 0){
      this.allAgencies.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        return valueA.localeCompare(valueB) * this.sortDirection;
      });
    }else {
      this.searchedAgencies.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        return valueA.localeCompare(valueB) * this.sortDirection;
      });
    }
    
  }

  lookUpAgency(agency){
    localStorage.setItem('agency', JSON.stringify(agency));
    localStorage.setItem('loginUser', JSON.stringify(0));
    this.router.navigate(['showAgency']);
   
  }

}
