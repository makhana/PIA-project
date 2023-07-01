import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servers/user.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  client: Client;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;


  message: string;

  selectedImage: any;
  invalidImage: number = 0;



  ngOnInit(): void {
    this.message = "";
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.phone = "";


    this.client = JSON.parse(localStorage.getItem('updateClientAdmin'));
  }

  back(){
    this.router.navigate(["admin"]);
  }

  imageUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const img = new Image();
      img.src = window.URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
          // Image dimensions are valid
          console.log('Image dimensions are valid');
          this.invalidImage = 0;
          this.selectedImage = file;
        } else {
          // Image dimensions are invalid
          this.message = 'Image dimensions are invalid. Image has to be between 100x100px and 300x300px';
          this.invalidImage = 1;
        }
      }
    }
  }

  applyChanges() {
    const regexPattern = new RegExp("[+]{0,1}[0-9]+");
    if (!regexPattern.test(this.phone) && this.phone != "") {
      this.message = "Phone number in the wrong format";
      return;
    }
    
    if (this.first_name == "") {
      this.first_name = this.client.first_name;
    }
    if (this.last_name == "") {
      this.last_name = this.client.last_name;
    }
    if (this.email == "") {
      this.email = this.client.email;
    }
    if (this.phone == "") {
      this.phone = this.client.phone;
    }

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage, this.client.username + '.jpg');

      this.userService.fileUpload(formData).subscribe(response => {
        console.log(response['message']);
        this.userService.updateClientProfile(this.client.username, this.first_name, this.last_name, this.email, this.phone, this.client.username + ".jpg").subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      })
    } else {
      this.userService.updateClientProfile(this.client.username, this.first_name, this.last_name, this.email, this.phone, "").subscribe(resp => {
        console.log(resp['message']);
        this.ngOnInit();
      })
    }
  }

  closeMessage(){
    this.message = "";
  }



}
