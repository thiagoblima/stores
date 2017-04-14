import { Routes, RouterModule } from '@angular/router';

//import { LoginComponent } from './login/index';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, /*canActivate: [AuthGuard]*/ },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);