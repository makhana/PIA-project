import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  message: string;
  username: string;

  name: string;
  surname: string;
  phone: string;
  email: string;
  spec: string;

  adminAdd: string;

  ngOnInit(): void {
    this.message = "";
    this.name = "";
    this.surname = "";
    this.phone = "";
    this.email = "";
    this.spec = "";

    this.adminAdd = localStorage.getItem('adminAddWorker');
    
    if(this.adminAdd){
      console.log('usao admin')
      this.username = this.adminAdd
    } else {
      this.username = localStorage.getItem('username');
    }
    

  }

  back(){
    if(this.adminAdd){
      localStorage.removeItem('adminAddWorker');
      this.router.navigate(['showAdminAgency']);
    } else {
      this.router.navigate(["agency"]);
    }
  }

  submit(){

    this.userService.addWorker(this.username, this.name, this.surname, this.email, this.phone, this.spec).subscribe(resp => {
      console.log(resp['message']);
      if(this.adminAdd){
        this.router.navigate(['showAdminAgency']);
      } else {
        this.router.navigate(['agency']);
      }
    })
  }

  closeMessage(){
    this.message = "";
  }

}
