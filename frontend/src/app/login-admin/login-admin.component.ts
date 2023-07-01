import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.message = "";

  }
  username: string;
  password: string;

  message: string;

  login(){
    this.userService.loginAdmin(this.username, this.password).subscribe(admin => {
      if(admin == null){
        this.message = "Invalid login information";
      } else {
        localStorage.setItem('username', this.username);
        this.router.navigate(["admin"]);
      }
    })
  }

  closeMessage(){
    this.message = "";
  }

}
