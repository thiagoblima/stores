import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './commons/nav/nav.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { SideBarComponent } from './commons/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './services/auth-service/authentication.service';
import { UserService } from './services/user-service/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    HttpModule,
    AuthenticationService,
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
