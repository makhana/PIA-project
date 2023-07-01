import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";
  message: string = "";
  passwordForm: boolean = false;
  email: string = "";
  type: string = "";
  regType: string = "";

  login() {
    if (this.type == 'client') {
      this.userService.loginClient(this.username, this.password).subscribe(user => {
        if (user == null) {
          this.message = "Invalid information";
        } else {
          localStorage.setItem('username', this.username);
          this.router.navigate(["client"]);
        }
      })
    } else if (this.type == 'agency') {
      this.userService.loginAgency(this.username, this.password).subscribe(user => {
        if (user == null) {
          this.message = "Invalid login information";
        } else {
          localStorage.setItem('username', this.username);
          this.router.navigate(["agency"]);
        }
      })
    }
  }

  closeMessage() {
    this.message = "";
  }

  forgotPassword() {
    this.passwordForm = true;
  }

  confirm() {

    // MAKE RANDOM PASSWORD
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*';

    const characters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

    let randomString = '';
    randomString += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]; // Add a lowercase letter
    randomString += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]; // Add an uppercase letter
    randomString += numbers[Math.floor(Math.random() * numbers.length)]; // Add a number
    randomString += specialCharacters[Math.floor(Math.random() * specialCharacters.length)]; // Add a special character

    const remainingLength = Math.floor(Math.random() * (12 - 7 + 1)) + 7 - 4; // Generate random length between 7 and 12 (subtracting the length of the existing characters)

    for (let i = 0; i < remainingLength; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)]; // Add remaining random characters
    }



    this.userService.changeUserPassword(this.email, randomString).subscribe(resp => {
      if(resp){
        console.log(resp['message']);
        this.userService.sendEmail(this.email, "Reset password", randomString).subscribe(resp => {
          console.log(resp['message']);
        })
      } else {
        this.message = "Email provided is not valid";
      }
    })
  }

  back() {
    this.router.navigate([""]);
  }

}
