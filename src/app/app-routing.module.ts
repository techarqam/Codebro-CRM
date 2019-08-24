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
import { ViewFilesComponent } from './Components/Files/view-files/view-files.component';
import { AddFileComponent } from './Components/Files/add-file/add-file.component';
import { EditFileComponent } from './Components/Files/edit-file/edit-file.component';
import { FileDetailsComponent } from './Components/Files/file-details/file-details.component';
import { ProjectFilesComponent } from './Components/Project/project-files/project-files.component';
import { MainTimelineComponent } from './Components/Timeline/main-timeline/main-timeline.component';
import { ViewTasksComponent } from './Conponents/Tasks/view-tasks/view-tasks.component';
import { AddTaskComponent } from './Components/Tasks/add-task/add-task.component';
import { EditTaskComponent } from './Conponents/Tasks/edit-task/edit-task.component';
import { TaskDetailComponent } from './Components/Tasks/task-detail/task-detail.component';
import { ListUsersComponent } from './Components/Messaging/list-users/list-users.component';
import { ChatBoxComponent } from './Components/Messaging/chat-box/chat-box.component';

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
    path: 'project-files/:id',
    component: ProjectFilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'archived-projects',
    component: ArchivedProjectsComponent,
    canActivate: [AuthGuard]
  },
  //Files
  {
    path: 'all-files',
    component: ViewFilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-file',
    component: AddFileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-file',
    component: EditFileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'file-details/:id',
    component: FileDetailsComponent,
    canActivate: [AuthGuard]
  },
  //Timeline
  {
    path: 'timeline',
    component: MainTimelineComponent,
    canActivate: [AuthGuard]
  },
  //Tasks
  {
    path: 'all-tasks',
    component: ViewTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-task',
    component: EditTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task-details/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard]
  },
  //Messaging
  {
    path: 'messaging',
    component: ListUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-box/:id',
    component: ChatBoxComponent,
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
