import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './services/auth.guard';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { UserComponent } from './dashboard/user/user.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import { ProjectComponent } from './dashboard/project/project.component';
import { ProjetbyuserComponent } from './dashboard/projetbyuser/projetbyuser.component';
import { DocsbyprojComponent } from './dashboard/docsbyproj/docsbyproj.component';


const routes:Routes=[
   {path: '', component:LoginComponent},

   {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard],

       children: [
          {path: '', component: LayoutComponent},
          {path: 'userInterface', component: UserComponent},
          {path: 'projetbyuser/:id', component: ProjetbyuserComponent},
          {path: 'docbyproj/:iduser/:idproj', component: DocsbyprojComponent},
          {path: 'projectInterface', component: ProjectComponent},
          {path: 'admin', component: AdminComponent},
       ]
    },


   {path: '**', component: ErrorComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    LayoutComponent,
    UserComponent,
    AdminComponent,
    ProjectComponent,
    ProjetbyuserComponent,
    DocsbyprojComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    AdminService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
