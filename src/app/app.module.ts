import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from './firebaseConfig';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './Components/MainMenu/dashboard/dashboard.component';
import { MenuHeaderComponent } from './ExtraComps/menu-header/menu-header.component';
import { BackHeaderComponent } from './ExtraComps/back-header/back-header.component';
import { CommonService } from './Services/Common/common.service';
import { LoaderComponent } from './ExtraComps/loader/loader.component';
import { AuthService } from './Services/Auth/auth.service';
import { LoginComponent } from './Components/Auth/login/login.component';
import { ProfileComponent } from './Components/MainMenu/profile/profile.component';
import { LoginSplashComponent } from './Components/Auth/login-splash/login-splash.component';
import { AddProjectComponent } from './Components/Projects/add-project/add-project.component';
import { ViewProjectsComponent } from './Components/Projects/view-projects/view-projects.component';
import { EditProjectsComponent } from './Components/Projects/edit-projects/edit-projects.component';
import { ProjectDetailsComponent } from './Components/Projects/project-details/project-details.component';
import { AddClientComponent } from './Components/Clients/add-client/add-client.component';
import { ViewClientsComponent } from './Components/Clients/view-clients/view-clients.component';
import { EditClientsComponent } from './Components/Clients/edit-clients/edit-clients.component';
import { ClientDetailsComponent } from './Components/Clients/client-details/client-details.component';
import { ArchivedProjectsComponent } from './Components/Projects/archived-projects/archived-projects.component';
import { ClientsService } from './Services/Clients/clients.service';
import { ProjectService } from './Services/Projects/project.service';
import { ModelsService } from './Models/models';
import { FilesService } from './Services/Files/files.service';
import { FileDetailsComponent } from './Components/Files/file-details/file-details.component';
import { ViewFilesComponent } from './Components/Files/view-files/view-files.component';
import { AddFileComponent } from './Components/Files/add-file/add-file.component';
import { EditFileComponent } from './Components/Files/edit-file/edit-file.component';
import { ProjectFilesComponent } from './Components/Project/project-files/project-files.component';
import { MainTimelineComponent } from './Components/Timeline/main-timeline/main-timeline.component';
import { AddTaskComponent } from './Components/Tasks/add-task/add-task.component';
import { TaskDetailComponent } from './Components/Tasks/task-detail/task-detail.component';
import { MessagingService } from './Services/Messaging/messaging.service';
import { ListUsersComponent } from './Components/Messaging/list-users/list-users.component';
import { ChatBoxComponent } from './Components/Messaging/chat-box/chat-box.component';
import { TasksService } from './Services/Tasks/tasks.service';
import { ViewTasksComponent } from './Components/Tasks/view-tasks/view-tasks.component';
import { EditTaskComponent } from './Components/Tasks/edit-task/edit-task.component';
import { CalendarComponent } from './Components/Calendar/calendar/calendar.component';
import { CalendarService } from './Services/Calendar/calendar.service';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { NotificationsService } from './Services/Notifications/notifications.service';
import { EmailLoginComponent } from './Components/Auth/email-login/email-login.component';
import { UserService } from './Services/Users/user.service';
import { AllUsersComponent } from './Components/Users/all-users/all-users.component';
import { AddUserComponent } from './Components/Users/add-user/add-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginSplashComponent,
    LoginComponent,
    EmailLoginComponent,
    ProfileComponent,
    DashboardComponent,
    MenuHeaderComponent,
    BackHeaderComponent,
    LoaderComponent,
    //Projects
    AddProjectComponent,
    ViewProjectsComponent,
    EditProjectsComponent,
    ProjectDetailsComponent,
    ProjectFilesComponent,
    ArchivedProjectsComponent,
    //Clients
    AddClientComponent,
    ViewClientsComponent,
    EditClientsComponent,
    ClientDetailsComponent,
    //Files
    AddFileComponent,
    EditFileComponent,
    ViewFilesComponent,
    FileDetailsComponent,
    //Timeline
    MainTimelineComponent,
    //Tasks
    ViewTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskDetailComponent,
    //Messaging
    ListUsersComponent,
    ChatBoxComponent,
    // Calendar
    CalendarComponent,
    //Users
    AllUsersComponent,
    AddUserComponent,

  ],
  entryComponents: [
    MenuHeaderComponent,
    BackHeaderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    FormsModule,
    FullCalendarModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CommonService,
    ModelsService,
    ClientsService,
    ProjectService,
    FilesService,
    TasksService,
    MessagingService,
    CalendarService,
    FCM,
    NotificationsService,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
