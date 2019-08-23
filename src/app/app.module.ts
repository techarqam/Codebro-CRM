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



@NgModule({
  declarations: [
    AppComponent,
    LoginSplashComponent,
    LoginComponent,
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
    ArchivedProjectsComponent,
    //Clients
    AddClientComponent,
    ViewClientsComponent,
    EditClientsComponent,
    ClientDetailsComponent
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
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CommonService,
    ModelsService,
    //Clients
    ClientsService,
    //Projects
    ProjectService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
