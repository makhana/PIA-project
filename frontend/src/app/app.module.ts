import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { KlijentComponent } from './klijent/klijent.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { AdminComponent } from './admin/admin.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HomeComponent } from './home/home.component';
import { PrikazAgencijeComponent } from './prikaz-agencije/prikaz-agencije.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { ChangeObjectComponent } from './change-object/change-object.component';
import { RequestComponent } from './request/request.component';
import { RequestWorkerComponent } from './request-worker/request-worker.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { WorkComponent } from './work/work.component';
import { ReviewComponent } from './review/review.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdateAgencyComponent } from './update-agency/update-agency.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { ShowAdminAgencyComponent } from './show-admin-agency/show-admin-agency.component';
import { UpdateWorkerComponent } from './update-worker/update-worker.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    LoginAdminComponent,
    KlijentComponent,
    AgencijaComponent,
    AdminComponent,
    RegistracijaComponent,
    HomeComponent,
    PrikazAgencijeComponent,
    AddObjectComponent,
    ChangeObjectComponent,
    RequestComponent,
    RequestWorkerComponent,
    AddWorkerComponent,
    WorkComponent,
    ReviewComponent,
    UpdateClientComponent,
    UpdateAgencyComponent,
    AddClientComponent,
    AddAgencyComponent,
    ShowAdminAgencyComponent,
    UpdateWorkerComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
