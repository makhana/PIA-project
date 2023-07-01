import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "loginUser", component: LoginUserComponent },
  { path: "loginAdmin", component: LoginAdminComponent },
  { path: "client", component: KlijentComponent },
  { path: "agency", component: AgencijaComponent },
  { path: "admin", component: AdminComponent },
  { path: "registration", component: RegistracijaComponent },
  { path: "showAgency", component: PrikazAgencijeComponent },
  { path: "addObject", component: AddObjectComponent },
  { path: "changeObject", component: ChangeObjectComponent },
  { path: "request", component: RequestComponent },
  { path: "requestWorker", component: RequestWorkerComponent },
  { path: "addWorker", component: AddWorkerComponent },
  { path: "work", component: WorkComponent },
  { path: "review", component: ReviewComponent },
  { path: "updateClient", component: UpdateClientComponent },
  { path: "updateAgency", component: UpdateAgencyComponent },
  { path: "addClient", component: AddClientComponent },
  { path: "addAgency", component: AddAgencyComponent },
  { path: "showAdminAgency", component: ShowAdminAgencyComponent },
  { path: "updateWorker", component: UpdateWorkerComponent },
  { path: "changePassword", component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
