import {APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./Authentification/login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { DepotdomiciliationComponent } from './Domiciliation/depotdomiciliation/depotdomiciliation.component';
import { ButtonModule } from 'primeng/button';
import { PersonDetailsComponent } from './DetailPersonne/person-details/person-details.component';
import { SidebarComponent } from './SideBar/sidebar/sidebar.component';
import { AllTemplateComponent } from './all-template/all-template.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DomiciliationDetailsComponent } from './domiciliation-details/domiciliation-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateDomiComponent } from './update-domi/update-domi.component';
import {KeycloakService} from "./services/keycloak/keycloak.service";
import {HttpTokenInterceptor} from "./helper/interceptor/http-token.interceptor";

export function kcFactory(kcService: KeycloakService){
  return ()=>kcService.init();

}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DepotdomiciliationComponent,
    PersonDetailsComponent,
    SidebarComponent,
    AllTemplateComponent,
    NavbarComponent,
    DomiciliationDetailsComponent,
    UpdateDomiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
      ButtonModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule

  ],
  providers: [
    HttpClient,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass:HttpTokenInterceptor,
    //   multi: true
    // },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
