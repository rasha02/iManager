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
import {ProjectsByUserComponent} from './dashboard/projects-by-user/projects-by-user.component';
import {DocsByUserProjectComponent} from './dashboard/docs-by-user-project/docs-by-user-project.component';
import { UsersByProjectComponent } from './dashboard/users-by-project/users-by-project.component';
import { DocsByProjectComponent } from './dashboard/docs-by-project/docs-by-project.component';
import {ProjectService} from './services/project.service';


const routes:Routes=[
   {path: '', component:LoginComponent},

   {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard],

       children: [
          {path: '', component: LayoutComponent},
          {path: 'admin', component: AdminComponent},
          {path: 'user-interface', component: UserComponent},
          {path: 'projects-by-user/:id', component: ProjectsByUserComponent},
          {path: 'docs-by-user-project/:iduser/:idproj', component: DocsByUserProjectComponent},
          {path: 'project-interface', component: ProjectComponent},
          {path: 'users-by-project/:id', component: UsersByProjectComponent},
          {path: 'docs-by-project/:id', component: DocsByProjectComponent}




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
    ProjectsByUserComponent,
    DocsByUserProjectComponent,
    UsersByProjectComponent,
    DocsByProjectComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    AdminService,
    UserService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
