import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './commons/nav/nav.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { StoresComponent } from './stores/stores.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './services/guards/index';
import { AlertService } from './services/auth/index';
import { AuthenticationService, UserService } from './services/auth/index';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './settings/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    StoresComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    UserComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    HttpModule,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
