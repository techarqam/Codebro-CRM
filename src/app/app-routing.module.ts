import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/MainMenu/dashboard/dashboard.component';
import { ProfileComponent } from './Components/MainMenu/profile/profile.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { NegAuthGuard } from './Guards/Auth/neg-auth.guard';
import { LoginSplashComponent } from './Components/Auth/login-splash/login-splash.component';
import { ViewClientsComponent } from './Components/Clients/view-clients/view-clients.component';
import { AddClientComponent } from './Components/Clients/add-client/add-client.component';
import { EditClientsComponent } from './Components/Clients/edit-clients/edit-clients.component';
import { ClientDetailsComponent } from './Components/Clients/client-details/client-details.component';
import { ArchivedProjectsComponent } from './Components/Projects/archived-projects/archived-projects.component';
import { ViewProjectsComponent } from './Components/Projects/view-projects/view-projects.component';
import { AddProjectComponent } from './Components/Projects/add-project/add-project.component';
import { EditProjectsComponent } from './Components/Projects/edit-projects/edit-projects.component';
import { ProjectDetailsComponent } from './Components/Projects/project-details/project-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login-splash',
    component: LoginSplashComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  //Clients
  {
    path: 'clients',
    component: ViewClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-client',
    component: AddClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-client',
    component: EditClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client-details/:id',
    component: ClientDetailsComponent,
    canActivate: [AuthGuard]
  },
  //Projects
  {
    path: 'projects',
    component: ViewProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-project',
    component: AddProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-project',
    component: EditProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'archived-projects',
    component: ArchivedProjectsComponent,
    canActivate: [AuthGuard]
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
