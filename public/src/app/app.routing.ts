import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './services/guards/index';


const appRoutes: Routes = [
   /* { path: 'login', component: LoginComponent }, */
    { path: '', component: HomeComponent, /*canActivate: [AuthGuard]*/ },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);