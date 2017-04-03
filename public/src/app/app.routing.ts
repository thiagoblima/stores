import { Routes, RouterModule } from '@angular/router';

//import { LoginComponent } from './login/index';
import { HomeComponent } from './home/home.component';
//import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent /**, canActivate: [AuthGuard]*/ },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);