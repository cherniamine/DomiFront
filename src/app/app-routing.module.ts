import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Authentification/login/login.component";
import {DepotdomiciliationComponent} from "./Domiciliation/depotdomiciliation/depotdomiciliation.component";
import {SidebarComponent} from "./SideBar/sidebar/sidebar.component";
import {AllTemplateComponent} from "./all-template/all-template.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {DomiciliationDetailsComponent} from "./domiciliation-details/domiciliation-details.component";
import {UpdateDomiComponent} from "./update-domi/update-domi.component";

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"DepotDomiciliation",
    component:DepotdomiciliationComponent
  },
  {
    path:"home",
    component:AllTemplateComponent,
    children:[
      {
        path:"depot",
        component:DepotdomiciliationComponent
      }

    ]
  },
  {
    path:"navbar",
    component:NavbarComponent
  },
  {
    path:"detaildomi",
    component:DomiciliationDetailsComponent
  },
  {
    path:"updatedomi",
    component:UpdateDomiComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
