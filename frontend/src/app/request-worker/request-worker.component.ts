import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';

@Component({
  selector: 'app-request-worker',
  templateUrl: './request-worker.component.html',
  styleUrls: ['./request-worker.component.css']
})
export class RequestWorkerComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.message = "";
    this.number = 0;
    this.username = localStorage.getItem('username');
  }

  username: string;
  number: number;
  message: string;

  back(){
    this.router.navigate(["agency"]);
  }

  submit(){
    if(this.number == 0){
      this.message = "Type number of workers to request";
      return;
    }
    this.userService.addWorkerRequest(this.username, this.number).subscribe(resp => {
      alert(resp['message']);
      this.ngOnInit();
    })
  }

  closeMessage(){
    this.message = "";
  }


}
