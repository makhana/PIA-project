import { Component, OnInit } from '@angular/core';
import { UserService } from '../servers/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Registration } from '../models/registrationReq';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.message = "";

    this.userType = "";
    this.username = "";
    this.password = "";
    this.phone = "";
    this.email = "";
    this.name = "";
    this.surname = "";
    this.agencyName = "";
    this.country = "";
    this.town = "";
    this.street = "";
    this.streetNumber = "";
    this.number = 0;
    this.description = "";

    this.selectedImage = null;
    this.invalidImage = 0;

    this.userService.getAllClients().subscribe((clientsDB: string[]) => {
      if (clientsDB) {
        clientsDB.forEach(name => {
          this.allUserNames.push(name['username']);
          this.allUserEmails.push(name['email']);
        })
      }
    })

    this.userService.getAllAgencies().subscribe((agenciesDB: string[]) => {
      if (agenciesDB) {
        agenciesDB.forEach(name => {
          this.allUserNames.push(name['username']);
          this.allUserEmails.push(name['email']);
        })
      }
    })

    this.userService.getAllAdmins().subscribe((adminsDB: string[]) => {
      if (adminsDB) {
        adminsDB.forEach(name => {
          this.allUserNames.push(name['username']);
        })
      }
    })

    this.userService.getDeclinedRegistrations().subscribe((registrationsDB: Registration[]) => {
      if (registrationsDB) {
        registrationsDB.forEach(name => {
          this.allUserNames.push(name['username']);
          this.allUserEmails.push(name['email']);
        })
      }
    })


  }

  userType: string = "";
  message: string = "";

  username: string = "";
  password: string = "";
  phone: string = "";
  email: string = "";

  name: string = "";
  surname: string = "";

  agencyName: string = "";
  country: string = "";
  town: string = "";
  street: string = "";
  streetNumber: string = "";
  number: number = 0;
  description: string = "";

  selectedImage: any;

  allUserNames: string[] = [];
  allUserEmails: string[] = [];

  invalidImage: number = 0;

  submit() {

    if (this.userType == 'client') {
      // CLIENT REGISTRATION

      if (this.allUserNames.includes(this.username)) {
        this.message = "Username must be unique, try again";
        return;
      }
      if (this.allUserEmails.includes(this.email)) {
        this.message = "Change email and try again";
        return;
      }

      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('file', this.selectedImage, this.username + '.jpg');

        this.userService.fileUpload(formData).subscribe(response => {
          console.log(response['message']);
          this.userService.register(this.username, this.password, this.phone, this.email, this.name, this.surname, this.agencyName, "", this.number, this.description, this.userType, 1).subscribe(resp => {
            console.log(resp['message']);
            this.ngOnInit();
          })
        })
      } else {
        this.userService.register(this.username, this.password, this.phone, this.email, this.name, this.surname, this.agencyName, "", this.number, this.description, this.userType, 0).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      }


    } else {
      // AGENCY REGISTRATION
      if (this.allUserNames.includes(this.username)) {
        this.message = "Username must be unique, try again";
        return;
      }

      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('file', this.selectedImage, this.username + '.jpg');

        this.userService.fileUpload(formData).subscribe(response => {
          console.log(response['message']);
          let address = this.country + ", " + this.town + " " + this.street + " " + this.streetNumber;
          this.userService.register(this.username, this.password, this.phone, this.email, this.name, this.surname, this.agencyName, address, this.number, this.description, this.userType, 1).subscribe(resp => {
            console.log(resp['message']);
            this.ngOnInit();
          })
        })
      } else {
        let address = this.country + ", " + this.town + " " + this.street + " " + this.streetNumber;
        this.userService.register(this.username, this.password, this.phone, this.email, this.name, this.surname, this.agencyName, address, this.number, this.description, this.userType, 0).subscribe(resp => {
          console.log(resp['message']);
          this.ngOnInit();
        })
      }
    }
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

  back() {
    this.router.navigate([""]);
  }

  closeMessage() {
    this.message = "";
  }
}
